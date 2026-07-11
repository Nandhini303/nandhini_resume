import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import { TextField, TextArea, EyeToggle } from '../../../components/admin/ui/FormInputs';
import SaveActionPanel from '../../../components/admin/ui/SaveActionPanel';
import SectionCard from '../../../components/admin/ui/SectionCard';
import { useSiteSettings } from '../../../components/admin/hooks/useSiteSettings';
import { usePreviewSync } from '../../../components/admin/preview/usePreviewSync';

const contactSchema = z.object({
  sectionLabel: z.string().optional(),
  sectionTitle: z.string().optional(),
  subtitle: z.string().optional(),
  email: z.string().optional(),
  location: z.string().optional(),
  phone: z.string().optional(),
  hiddenFields: z.array(z.string()).default([]),
}).superRefine((data, ctx) => {
  const isVisible = (field) => !data.hiddenFields.includes(field);

  if (isVisible('sectionHeaders')) {
    if (!data.sectionLabel || data.sectionLabel.trim() === '') {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['sectionLabel'], message: 'Label is required' });
    }
    if (!data.sectionTitle || data.sectionTitle.trim() === '') {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['sectionTitle'], message: 'Title is required' });
    }
  }
  if (isVisible('subtitle') && (!data.subtitle || data.subtitle.trim() === '')) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['subtitle'], message: 'Subtitle is required' });
  }
  if (isVisible('email')) {
    if (!data.email || data.email.trim() === '') {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['email'], message: 'Email is required' });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['email'], message: 'Invalid email address' });
    }
  }
  if (isVisible('location') && (!data.location || data.location.trim() === '')) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['location'], message: 'Location is required' });
  }
});

export default function ContactSettings() {
  const { fetchSettings, saveSettings, loading: initLoading } = useSiteSettings('contact');
  const [isSaving, setIsSaving] = useState(false);
  const [initialData, setInitialData] = useState(null);

  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      sectionLabel: '', sectionTitle: '', subtitle: '',
      email: '', phone: '', location: '',
      hiddenFields: []
    }
  });

  usePreviewSync(form, (v) => ({ settings: { contact: v } }), '#contact');

  const toggleVisibility = (fieldName) => {
    const currentHidden = form.getValues('hiddenFields') || [];
    if (currentHidden.includes(fieldName)) {
      form.setValue('hiddenFields', currentHidden.filter(f => f !== fieldName), { shouldDirty: true });
    } else {
      form.setValue('hiddenFields', [...currentHidden, fieldName], { shouldDirty: true });
    }
  };

  const isVisible = (fieldName) => {
    return !(form.watch('hiddenFields') || []).includes(fieldName);
  };

  useEffect(() => {
    form.register('hiddenFields');
    fetchSettings().then(data => {
      if (data) {
        setInitialData(data);
        form.reset(data);
      }
    });
  }, []);

  const onInvalid = (errors) => {
    console.error("Form validation errors:", errors);
    const getFirstError = (obj) => {
      if (!obj) return null;
      if (obj.message) return obj.message;
      for (const val of Object.values(obj)) {
        const msg = getFirstError(val);
        if (msg) return msg;
      }
      return null;
    };
    const msg = getFirstError(errors);
    toast.error(msg || "Please check the highlighted fields.");
  };

  const onSubmit = async (values) => {
    setIsSaving(true);
    const finalData = { ...initialData, ...values };
    const success = await saveSettings(finalData);
    if (success) {
      form.reset(finalData);
    }
    setIsSaving(false);
  };

  if (initLoading) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={24} /></div>;
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="max-w-4xl space-y-8 pb-32">
      <div>
        <h1 className="font-bold text-2xl text-slate-800">Contact Settings</h1>
        <p className="text-slate-500 mt-1 text-sm">Configure your contact details and form headers.</p>
      </div>

      <SectionCard title="Section Headers" action={<EyeToggle visible={isVisible('sectionHeaders')} onToggle={() => toggleVisibility('sectionHeaders')} label="section headers" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField label="Section Label" {...form.register('sectionLabel')} error={form.formState.errors.sectionLabel?.message} />
          <TextField label="Section Title" {...form.register('sectionTitle')} error={form.formState.errors.sectionTitle?.message} />
          <TextArea label="Subtitle" rows={2} className="md:col-span-2" {...form.register('subtitle')} error={form.formState.errors.subtitle?.message} />
        </div>
      </SectionCard>

      <SectionCard title="Contact Details" action={<EyeToggle visible={isVisible('contactDetails')} onToggle={() => toggleVisibility('contactDetails')} label="contact details" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField label="Email Address" type="email" {...form.register('email')} error={form.formState.errors.email?.message} />
          <TextField label="Phone Number" {...form.register('phone')} error={form.formState.errors.phone?.message} />
          <TextField label="Location" className="md:col-span-2" {...form.register('location')} error={form.formState.errors.location?.message} />
        </div>
      </SectionCard>

      <SaveActionPanel 
        isDirty={form.formState.isDirty} 
        isSaving={isSaving} 
        onDiscard={() => form.reset()} 
        onSave={form.handleSubmit(onSubmit, onInvalid)} 
      />
    </form>
  );
}
