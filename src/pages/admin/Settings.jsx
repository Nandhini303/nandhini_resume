import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import { TextField, Toggle } from '../../components/admin/ui/FormInputs';
import SaveActionPanel from '../../components/admin/ui/SaveActionPanel';
import SectionCard from '../../components/admin/ui/SectionCard';
import ImageUpload from '../../components/admin/ui/ImageUpload';
import { useSiteSettings } from '../../components/admin/hooks/useSiteSettings';
import { usePreviewSync } from '../../components/admin/preview/usePreviewSync';

// Footer fields are FLAT — this is exactly the shape the public footer reads.
const generalSchema = z.object({
  welcome: z.object({
    enabled: z.boolean(),
    name: z.string().min(1, 'Name is required'),
    quote: z.string().min(1, 'Quote is required'),
    inviteTitle: z.string().min(1, 'Invite title is required'),
    inviteSubtitle: z.string().min(1, 'Invite subtitle is required'),
  }),
  footer: z.object({
    name: z.string().min(1, 'Name is required'),
    tagline: z.string(),
    github: z.string().url('Must be a valid URL').or(z.literal('')),
    linkedin: z.string().url('Must be a valid URL').or(z.literal('')),
    email: z.string().email('Must be a valid email').or(z.literal('')),
    copyright: z.string(),
    designYear: z.string(),
  }),
  navbar: z.object({
    ctaLabel: z.string().min(1, 'Label is required'),
    ctaHref: z.string().min(1, 'Link is required'),
  }),
  sections: z.object({
    projects: z.object({
      label: z.string(),
      title: z.string().min(1, 'Title is required'),
      subtitle: z.string(),
    }),
    blog: z.object({
      label: z.string(),
      title: z.string().min(1, 'Title is required'),
    }),
  }),
  branding: z.object({
    logoUrl: z.string().optional(),
    faviconUrl: z.string().optional(),
  }),
});

const emptyDefaults = {
  welcome: { enabled: true, name: '', quote: '', inviteTitle: '', inviteSubtitle: '' },
  footer: { name: '', tagline: '', github: '', linkedin: '', email: '', copyright: '', designYear: '' },
  navbar: { ctaLabel: 'Résumé', ctaHref: '/resume.pdf' },
  sections: {
    projects: { label: '', title: '', subtitle: '' },
    blog: { label: '', title: '' },
  },
  branding: { logoUrl: '', faviconUrl: '' },
};

export default function Settings() {
  const { fetchSettings: fetchWelcome, saveSettings: saveWelcome } = useSiteSettings('welcome');
  const { fetchSettings: fetchFooter, saveSettings: saveFooter } = useSiteSettings('footer');
  const { fetchSettings: fetchSections, saveSettings: saveSections } = useSiteSettings('sections');
  const { fetchSettings: fetchNavbar, saveSettings: saveNavbar } = useSiteSettings('navbar');
  const { fetchSettings: fetchBranding, saveSettings: saveBranding } = useSiteSettings('branding');
  const [isSaving, setIsSaving] = useState(false);
  const [initLoading, setInitLoading] = useState(true);

  const form = useForm({
    resolver: zodResolver(generalSchema),
    defaultValues: emptyDefaults,
  });

  usePreviewSync(form, (v) => ({
    settings: {
      welcome: { ...v.welcome, quotes: v.welcome?.quote ? [v.welcome.quote] : [] },
      footer: v.footer,
      navbar: v.navbar,
      sections: v.sections,
      branding: v.branding,
    },
  }));

  useEffect(() => {
    Promise.all([fetchWelcome(), fetchFooter(), fetchSections(), fetchNavbar(), fetchBranding()]).then(([welcomeData, footerData, sectionsData, navbarData, brandingData]) => {
      const mappedWelcome = welcomeData
        ? {
            enabled: welcomeData.enabled ?? true,
            name: welcomeData.name || '',
            quote: welcomeData.quote || (welcomeData.quotes && welcomeData.quotes[0]) || '',
            inviteTitle: welcomeData.inviteTitle || '',
            inviteSubtitle: welcomeData.inviteSubtitle || '',
          }
        : emptyDefaults.welcome;

      // Accept both the flat shape and the older nested `links` shape
      const mappedFooter = footerData
        ? {
            name: footerData.name || '',
            tagline: footerData.tagline || '',
            github: footerData.github || footerData.links?.github || '',
            linkedin: footerData.linkedin || footerData.links?.linkedin || '',
            email: footerData.email || '',
            copyright: footerData.copyright || '',
            designYear: footerData.designYear || '',
          }
        : emptyDefaults.footer;

      form.reset({
        welcome: mappedWelcome,
        footer: mappedFooter,
        navbar: { ...emptyDefaults.navbar, ...navbarData },
        sections: {
          projects: { ...emptyDefaults.sections.projects, ...sectionsData?.projects },
          blog: { ...emptyDefaults.sections.blog, ...sectionsData?.blog },
        },
        branding: { ...emptyDefaults.branding, ...brandingData },
      });
      setInitLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (values) => {
    setIsSaving(true);
    const welcomePayload = {
      ...values.welcome,
      quotes: [values.welcome.quote],
    };
    const results = await Promise.all([
      saveWelcome(welcomePayload),
      saveFooter(values.footer),
      saveSections(values.sections),
      saveNavbar(values.navbar),
      saveBranding(values.branding),
    ]);
    if (results.every(Boolean)) {
      form.reset(values);
    }
    setIsSaving(false);
  };

  if (initLoading) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={24} /></div>;
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl space-y-8 pb-32">
      <div>
        <h1 className="font-bold text-2xl text-slate-800">General Settings</h1>
        <p className="text-slate-500 mt-1 text-sm">Configure the welcome screen, section headers and footer.</p>
      </div>

      <SectionCard title="Branding">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageUpload
            label="Site Logo"
            folder="branding"
            url={form.watch('branding.logoUrl')}
            onUpload={(url) => form.setValue('branding.logoUrl', url, { shouldDirty: true })}
          />
          <ImageUpload
            label="Site Favicon"
            folder="branding"
            url={form.watch('branding.faviconUrl')}
            onUpload={(url) => form.setValue('branding.faviconUrl', url, { shouldDirty: true })}
          />
        </div>
      </SectionCard>

      <SectionCard title="Welcome Screen">
        <div className="space-y-6">
          <Toggle
            label="Enable Welcome Screen"
            description="Show a brief animated intro before revealing the portfolio."
            checked={form.watch('welcome.enabled')}
            onChange={(val) => form.setValue('welcome.enabled', val, { shouldDirty: true })}
          />
          <div className="h-px bg-slate-100" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextField
              label="Branding Name"
              placeholder="e.g. Nandhini C · IT Student"
              {...form.register('welcome.name')}
              error={form.formState.errors.welcome?.name?.message}
            />
            <TextField
              label="Welcome Screen Quote"
              placeholder="e.g. Turning ideas into working software."
              {...form.register('welcome.quote')}
              error={form.formState.errors.welcome?.quote?.message}
            />
            <TextField
              label="Invitation Title"
              placeholder="e.g. Welcome to my space."
              {...form.register('welcome.inviteTitle')}
              error={form.formState.errors.welcome?.inviteTitle?.message}
            />
            <TextField
              label="Invitation Subtitle"
              placeholder="e.g. Let's explore software development and connect."
              {...form.register('welcome.inviteSubtitle')}
              error={form.formState.errors.welcome?.inviteSubtitle?.message}
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Navbar" description="Navigation links follow the page sections automatically; the call-to-action button is editable.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField label="CTA Button Label" placeholder="Résumé" {...form.register('navbar.ctaLabel')} error={form.formState.errors.navbar?.ctaLabel?.message} />
          <TextField label="CTA Button Link" placeholder="/resume.pdf" {...form.register('navbar.ctaHref')} error={form.formState.errors.navbar?.ctaHref?.message} />
        </div>
      </SectionCard>

      <SectionCard title="Section Headers">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-slate-700">Projects section</h3>
            <TextField label="Eyebrow label" placeholder="04 — Selected Work" {...form.register('sections.projects.label')} error={form.formState.errors.sections?.projects?.label?.message} />
            <TextField label="Title" placeholder="Publications & Projects" {...form.register('sections.projects.title')} error={form.formState.errors.sections?.projects?.title?.message} />
            <TextField label="Subtitle" placeholder="Showcasing research papers and development bootcamps." {...form.register('sections.projects.subtitle')} error={form.formState.errors.sections?.projects?.subtitle?.message} />
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-slate-700">Blog section</h3>
            <TextField label="Eyebrow label" placeholder="05 — Writing" {...form.register('sections.blog.label')} error={form.formState.errors.sections?.blog?.label?.message} />
            <TextField label="Title" placeholder="Notes on the process" {...form.register('sections.blog.title')} error={form.formState.errors.sections?.blog?.title?.message} />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Footer">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField label="Display Name" placeholder="Nandhini C" {...form.register('footer.name')} error={form.formState.errors.footer?.name?.message} />
          <TextField label="Tagline" placeholder="IT Student — Python · Full-Stack Development · AI Foundations…" {...form.register('footer.tagline')} error={form.formState.errors.footer?.tagline?.message} />
          <TextField label="Copyright Text" placeholder="Built with React · Supabase." {...form.register('footer.copyright')} error={form.formState.errors.footer?.copyright?.message} />
          <TextField label="Design Year" placeholder="2026" {...form.register('footer.designYear')} error={form.formState.errors.footer?.designYear?.message} />
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-4">
          <h3 className="font-semibold text-sm text-slate-700">Social Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextField label="GitHub URL" {...form.register('footer.github')} error={form.formState.errors.footer?.github?.message} />
            <TextField label="LinkedIn URL" {...form.register('footer.linkedin')} error={form.formState.errors.footer?.linkedin?.message} />
            <TextField label="Contact Email" {...form.register('footer.email')} error={form.formState.errors.footer?.email?.message} />
          </div>
        </div>
      </SectionCard>

      <SaveActionPanel
        isDirty={form.formState.isDirty}
        isSaving={isSaving}
        onDiscard={() => form.reset()}
        onSave={form.handleSubmit(onSubmit)}
      />
    </form>
  );
}
