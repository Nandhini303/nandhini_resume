import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Plus, GripVertical, Trash2 } from 'lucide-react';
import { TextField, EyeToggle } from '../../../components/admin/ui/FormInputs';
import ImageUpload from '../../../components/admin/ui/ImageUpload';
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

const certSchema = z.object({
  certifications: z.array(z.object({
    name: z.string().min(1, 'Required'),
    issuer: z.string().min(1, 'Required'),
    issueDate: z.string().min(1, 'Required'),
    credentialId: z.string(),
    credentialUrl: z.string(),
    image: z.string()
  })),
  hiddenFields: z.array(z.string()).default([]),
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
    <div ref={setNodeRef} style={style} className="flex gap-4 items-start bg-slate-50 p-6 rounded-xl border border-slate-200">
      <div {...attributes} {...listeners} className="mt-3 cursor-grab text-slate-400 hover:text-slate-700">
        <GripVertical size={20} />
      </div>
      <div className="flex-1">
        {props.children}
      </div>
    </div>
  );
}

export default function CertificationsSettings() {
  const { fetchSettings, saveSettings, loading: initLoading } = useSiteSettings('certifications');
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm({
    resolver: zodResolver(certSchema),
    defaultValues: {
      certifications: [],
      hiddenFields: []
    }
  });

  usePreviewSync(form, (v) => ({ settings: { certifications: v } }), '#skills');

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

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "certifications"
  });

  useEffect(() => {
    form.register('hiddenFields');
    fetchSettings().then(data => {
      if (data) {
        if (Array.isArray(data)) {
          form.reset({ certifications: data, hiddenFields: [] });
        } else {
          form.reset({ certifications: data.certifications || [], hiddenFields: data.hiddenFields || [] });
        }
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
    const success = await saveSettings(values);
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
      const oldIndex = fields.findIndex((i) => i.id === active.id);
      const newIndex = fields.findIndex((i) => i.id === over.id);
      move(oldIndex, newIndex);
    }
  };

  if (initLoading) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={24} /></div>;
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="max-w-4xl space-y-8 pb-32">
      <div>
        <h1 className="font-bold text-2xl text-slate-800">Certifications Settings</h1>
        <p className="text-slate-500 mt-1 text-sm">Manage your professional certifications and courses.</p>
      </div>

      <SectionCard title="Certifications List" action={<div className="flex items-center gap-2">
            <EyeToggle visible={isVisible('certifications')} onToggle={() => toggleVisibility('certifications')} label="certifications section" />
            <button type="button" onClick={() => append({ name: '', issuer: '', issueDate: '', credentialId: '', credentialUrl: '', image: '' })} className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <Plus size={16} /> Add Certification
            </button>
          </div>}>
        
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
            <div className="grid grid-cols-1 gap-4">
              {fields.map((field, index) => (
                <SortableItem key={field.id} id={field.id}>
                  <div className="flex gap-4 items-start">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <TextField 
                        label="Certification Title"
                        placeholder="e.g. Certified Data Analyst" 
                        {...form.register(`certifications.${index}.name`)} 
                        error={form.formState.errors.certifications?.[index]?.name?.message} 
                      />
                      <TextField 
                        label="Issuer"
                        placeholder="e.g. Google" 
                        {...form.register(`certifications.${index}.issuer`)} 
                        error={form.formState.errors.certifications?.[index]?.issuer?.message} 
                      />
                      <TextField 
                        label="Issue Date / Period"
                        placeholder="e.g. Jan 2026" 
                        {...form.register(`certifications.${index}.issueDate`)} 
                        error={form.formState.errors.certifications?.[index]?.issueDate?.message} 
                      />
                      <TextField 
                        label="Credential ID"
                        placeholder="e.g. GOOG-123456" 
                        {...form.register(`certifications.${index}.credentialId`)} 
                        error={form.formState.errors.certifications?.[index]?.credentialId?.message} 
                      />
                      <TextField 
                        label="Credential URL"
                        className="md:col-span-2"
                        placeholder="https://..." 
                        {...form.register(`certifications.${index}.credentialUrl`)} 
                        error={form.formState.errors.certifications?.[index]?.credentialUrl?.message} 
                      />
                      <div className="md:col-span-2">
                        <ImageUpload
                          label="Certificate Attachment (Image or Doc)"
                          folder="certifications"
                          accept="image/*,application/pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.rtf,.odt,.pages"
                          url={form.watch(`certifications.${index}.image`)}
                          onUpload={(url) => form.setValue(`certifications.${index}.image`, url, { shouldDirty: true })}
                        />
                      </div>
                    </div>
                    <button type="button" onClick={() => remove(index)} className="mt-8 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </SortableItem>
              ))}
              {fields.length === 0 && <p className="text-sm text-slate-500 text-center py-4">No certifications added.</p>}
            </div>
          </SortableContext>
        </DndContext>
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
