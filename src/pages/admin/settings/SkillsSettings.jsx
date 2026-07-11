import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Plus, GripVertical, Trash2 } from 'lucide-react';
import { TextField, EyeToggle } from '../../../components/admin/ui/FormInputs';
import SaveActionPanel from '../../../components/admin/ui/SaveActionPanel';
import SectionCard from '../../../components/admin/ui/SectionCard';
import { useSiteSettings } from '../../../components/admin/hooks/useSiteSettings';
import { usePreviewSync } from '../../../components/admin/preview/usePreviewSync';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const skillsSchema = z.object({
  sectionLabel: z.string().optional(),
  sectionTitle: z.string().optional(),
  categories: z.array(z.object({
    title: z.string().optional(),
    icon: z.string().optional(),
    items: z.string().optional()
  })),
  ticker: z.string().optional(),
  hiddenFields: z.array(z.string()).default([]),
  certifications: z.array(z.string()).optional(),
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
  if (isVisible('categories')) {
    data.categories.forEach((cat, idx) => {
      if (!cat.title || cat.title.trim() === '') {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['categories', idx, 'title'], message: 'Category title is required' });
      }
      if (!cat.icon || cat.icon.trim() === '') {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['categories', idx, 'icon'], message: 'Icon name is required' });
      }
      if (!cat.items || cat.items.trim() === '') {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['categories', idx, 'items'], message: 'At least one skill is required' });
      }
    });
  }
  if (isVisible('ticker') && (!data.ticker || data.ticker.trim() === '')) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['ticker'], message: 'Ticker items are required' });
  }
});

function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex gap-4 items-start bg-slate-50 p-4 rounded-xl border border-slate-200">
      <div {...attributes} {...listeners} className="mt-3 cursor-grab text-slate-400 hover:text-slate-700">
        <GripVertical size={20} />
      </div>
      <div className="flex-1">
        {props.children}
      </div>
    </div>
  );
}

export default function SkillsSettings() {
  const { fetchSettings, saveSettings, loading: initLoading } = useSiteSettings('skills');
  const [isSaving, setIsSaving] = useState(false);
  const [initialData, setInitialData] = useState(null);

  const form = useForm({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      sectionLabel: '', sectionTitle: '',
      categories: [],
      ticker: '',
      hiddenFields: []
    }
  });

  // Skills form edits arrays as comma-separated strings; convert back so the
  // public Skills section renders the live draft correctly.
  const toList = (val) =>
    Array.isArray(val)
      ? val
      : String(val || '').split(',').map((i) => i.trim()).filter(Boolean);
  usePreviewSync(form, (v) => ({
    settings: {
      skills: {
        ...v,
        categories: (v.categories || []).map((c) => ({ ...c, items: toList(c.items) })),
        ticker: toList(v.ticker),
      },
    },
  }), '#skills');

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

  const { fields: catFields, append: appendCat, remove: removeCat, move: moveCat } = useFieldArray({
    control: form.control,
    name: "categories"
  });

  useEffect(() => {
    form.register('hiddenFields');
    fetchSettings().then(data => {
      if (data) {
        setInitialData(data);
        form.reset({
          ...data,
          categories: data.categories?.map(c => ({ ...c, items: c.items.join(', ') })) || [],
          ticker: data.ticker?.join(', ') || ''
        });
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
    // Parse comma separated strings back to arrays
    const formattedData = {
      ...initialData,
      ...values,
      categories: values.categories.map(c => ({
        ...c,
        items: c.items.split(',').map(i => i.trim()).filter(Boolean)
      })),
      ticker: values.ticker.split(',').map(i => i.trim()).filter(Boolean)
    };
    
    const success = await saveSettings(formattedData);
    if (success) {
      form.reset(values);
    }
    setIsSaving(false);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = catFields.findIndex((i) => i.id === active.id);
      const newIndex = catFields.findIndex((i) => i.id === over.id);
      moveCat(oldIndex, newIndex);
    }
  };

  if (initLoading) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={24} /></div>;
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="max-w-4xl space-y-8 pb-32">
      <div>
        <h1 className="font-bold text-2xl text-slate-800">Skills Settings</h1>
        <p className="text-slate-500 mt-1 text-sm">Manage your technical toolkit and skill categories.</p>
      </div>

      <SectionCard title="Section Headers" action={<EyeToggle visible={isVisible('sectionHeaders')} onToggle={() => toggleVisibility('sectionHeaders')} label="skills headers" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField label="Section Label" {...form.register('sectionLabel')} error={form.formState.errors.sectionLabel?.message} />
          <TextField label="Section Title" {...form.register('sectionTitle')} error={form.formState.errors.sectionTitle?.message} />
        </div>
      </SectionCard>

      <SectionCard title="Skill Categories" action={<div className="flex items-center gap-2">
            <EyeToggle visible={isVisible('categories')} onToggle={() => toggleVisibility('categories')} label="skills categories" />
            <button type="button" onClick={() => appendCat({ title: '', icon: '', items: '' })} className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <Plus size={16} /> Add Category
            </button>
          </div>}>
        
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={catFields.map(f => f.id)} strategy={verticalListSortingStrategy}>
            <div className="grid grid-cols-1 gap-3">
              {catFields.map((field, index) => (
                <SortableItem key={field.id} id={field.id}>
                  <div className="flex gap-4 items-start">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                      <TextField 
                        label="Category Title"
                        placeholder="e.g. Languages" 
                        {...form.register(`categories.${index}.title`)} 
                        error={form.formState.errors.categories?.[index]?.title?.message} 
                      />
                      <TextField 
                        label="Lucide Icon Name"
                        placeholder="e.g. Database" 
                        {...form.register(`categories.${index}.icon`)} 
                        error={form.formState.errors.categories?.[index]?.icon?.message} 
                      />
                      <TextField 
                        label="Skills (Comma separated)"
                        className="md:col-span-2"
                        placeholder="SQL, Python, R" 
                        {...form.register(`categories.${index}.items`)} 
                        error={form.formState.errors.categories?.[index]?.items?.message} 
                      />
                    </div>
                    <button type="button" onClick={() => removeCat(index)} className="mt-8 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </SortableItem>
              ))}
              {catFields.length === 0 && <p className="text-sm text-slate-500 text-center py-4">No categories added.</p>}
            </div>
          </SortableContext>
        </DndContext>
      </SectionCard>

      <SectionCard title="Ticker Items" action={<EyeToggle visible={isVisible('ticker')} onToggle={() => toggleVisibility('ticker')} label="skills ticker" />}>
        <TextField 
          label="Skills Ticker (Comma separated)" 
          placeholder="SQL, Python, React, Next.js"
          {...form.register('ticker')} 
          error={form.formState.errors.ticker?.message} 
        />
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
