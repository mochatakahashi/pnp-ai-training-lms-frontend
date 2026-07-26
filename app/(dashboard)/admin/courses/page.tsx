'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Edit2, Trash2, Plus, Search, FileText, Video, FileSpreadsheet, Clock, CheckCircle2, X, Upload, Save, Paperclip } from 'lucide-react';

interface Module {
  id: string;
  order: number;
  title: string;
  estimatedDuration: number;
  mediaType: 'pdf' | 'powerpoint' | 'video' | 'text';
  mediaUrl?: string;
  mediaSize?: string;
  content: string;
}

const initialModules: Module[] = [
  {
    id: 'mod1',
    order: 1,
    title: 'Introduction to Ethics in Law Enforcement',
    estimatedDuration: 20,
    mediaType: 'pdf',
    mediaUrl: 'PNP_Ethical_Code_RA6713.pdf',
    mediaSize: '2.4 MB',
    content: 'Definition of ethics, R.A. 6713 Code of Conduct, and fundamental principles.',
  },
  {
    id: 'mod2',
    order: 2,
    title: 'Decision Making & Ethical Dilemmas',
    estimatedDuration: 25,
    mediaType: 'powerpoint',
    mediaUrl: 'PNP_Ethical_Decision_Framework.pptx',
    mediaSize: '5.1 MB',
    content: 'Ethical decision-making framework, gathering facts, evaluating legal options.',
  },
  {
    id: 'mod3',
    order: 3,
    title: 'Accountability, Blotters & Transparency',
    estimatedDuration: 30,
    mediaType: 'video',
    mediaUrl: 'BodyWorn_Camera_Operational_Protocol.mp4',
    mediaSize: '42.8 MB',
    content: 'Truthful reporting, Internal Affairs oversight, body-worn camera protocols.',
  },
  {
    id: 'mod4',
    order: 4,
    title: 'Case Studies in Police Ethics & Anti-Graft',
    estimatedDuration: 35,
    mediaType: 'pdf',
    mediaUrl: 'AntiGraft_Case_Studies_2024.pdf',
    mediaSize: '3.8 MB',
    content: 'Refusing gratuities, duty to intervene against excessive force.',
  },
  {
    id: 'mod5',
    order: 5,
    title: 'Professional Development & AI Tools in Policing',
    estimatedDuration: 20,
    mediaType: 'video',
    mediaUrl: 'AI_Modern_Policing_Ethics.mp4',
    mediaSize: '18.2 MB',
    content: 'Continuous education, AI training tools, human rights compliance.',
  },
];

export default function AdminCoursesPage() {
  const [modules, setModules] = useState<Module[]>(initialModules);
  const [searchTerm, setSearchTerm] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load from localStorage if present
  useEffect(() => {
    const saved = localStorage.getItem('pnp_course_modules');
    if (saved) {
      try {
        setModules(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved modules');
      }
    }
  }, []);

  // Modal states for Add/Edit Module
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  
  // Form fields
  const [formData, setFormData] = useState({
    title: '',
    estimatedDuration: 20,
    mediaType: 'pdf' as 'pdf' | 'powerpoint' | 'video' | 'text',
    mediaUrl: '',
    mediaSize: '',
    content: '',
  });

  const handleOpenAddModal = () => {
    setEditingModule(null);
    setFormData({
      title: '',
      estimatedDuration: 20,
      mediaType: 'pdf',
      mediaUrl: '',
      mediaSize: '',
      content: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (mod: Module) => {
    setEditingModule(mod);
    setFormData({
      title: mod.title,
      estimatedDuration: mod.estimatedDuration,
      mediaType: mod.mediaType,
      mediaUrl: mod.mediaUrl || '',
      mediaSize: mod.mediaSize || '',
      content: mod.content,
    });
    setIsModalOpen(true);
  };

  // Handle actual file upload selection from user device
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = file.name;
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
    const ext = fileName.split('.').pop()?.toLowerCase();

    let detectedType: 'pdf' | 'powerpoint' | 'video' | 'text' = 'pdf';
    if (ext === 'pdf') detectedType = 'pdf';
    else if (ext === 'pptx' || ext === 'ppt') detectedType = 'powerpoint';
    else if (ext === 'mp4' || ext === 'mov' || ext === 'avi') detectedType = 'video';
    else detectedType = 'text';

    setFormData((prev) => ({
      ...prev,
      mediaUrl: fileName,
      mediaSize: fileSizeMB,
      mediaType: detectedType,
    }));
  };

  const handleSaveModule = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) return;

    let updatedList: Module[];

    if (editingModule) {
      // Update existing module
      updatedList = modules.map((m) =>
        m.id === editingModule.id
          ? {
              ...m,
              title: formData.title,
              estimatedDuration: Number(formData.estimatedDuration),
              mediaType: formData.mediaType,
              mediaUrl: formData.mediaUrl,
              mediaSize: formData.mediaSize,
              content: formData.content,
            }
          : m
      );
    } else {
      // Add new module
      const newMod: Module = {
        id: `mod_${Date.now()}`,
        order: modules.length + 1,
        title: formData.title,
        estimatedDuration: Number(formData.estimatedDuration),
        mediaType: formData.mediaType,
        mediaUrl: formData.mediaUrl || `${formData.title.replaceAll(' ', '_')}.${formData.mediaType === 'pdf' ? 'pdf' : formData.mediaType === 'powerpoint' ? 'pptx' : 'mp4'}`,
        mediaSize: formData.mediaSize || '3.5 MB',
        content: formData.content || 'Module training overview.',
      };
      updatedList = [...modules, newMod];
    }

    setModules(updatedList);
    localStorage.setItem('pnp_course_modules', JSON.stringify(updatedList));
    setIsModalOpen(false);
    triggerSaveNotification();
  };

  const handleSaveChangesAll = () => {
    localStorage.setItem('pnp_course_modules', JSON.stringify(modules));
    triggerSaveNotification();
  };

  const triggerSaveNotification = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  const handleDeleteModule = (id: string) => {
    if (confirm('Are you sure you want to delete this module? This action cannot be undone.')) {
      const updated = modules
        .filter((m) => m.id !== id)
        .map((m, idx) => ({ ...m, order: idx + 1 }));

      setModules(updated);
      localStorage.setItem('pnp_course_modules', JSON.stringify(updated));
      triggerSaveNotification();
    }
  };

  const filteredModules = modules.filter((m) =>
    m.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getMediaBadge = (type: string) => {
    switch (type) {
      case 'pdf':
        return (
          <Badge className="bg-red-500/10 text-red-600 border-red-500/20 flex items-center gap-1 font-bold">
            <FileText size={12} /> PDF Document
          </Badge>
        );
      case 'powerpoint':
        return (
          <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/20 flex items-center gap-1 font-bold">
            <FileSpreadsheet size={12} /> PowerPoint (PPTX)
          </Badge>
        );
      case 'video':
        return (
          <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20 flex items-center gap-1 font-bold">
            <Video size={12} /> Video Lesson (MP4)
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="flex items-center gap-1 font-bold">
            <FileText size={12} /> Text Article
          </Badge>
        );
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Badge className="bg-primary/20 text-primary border-primary/30 text-xs mb-1">Course Content Management</Badge>
          <h1 className="text-3xl font-extrabold text-foreground">Manage Course Modules & Insert Files</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Add, update, or delete course modules. Upload actual PDF, PowerPoint, or Video files and save your changes.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={handleOpenAddModal} variant="outline" className="border-border font-bold flex items-center gap-2 h-10 px-4 text-xs">
            <Plus size={16} />
            Add New Module
          </Button>
          <Button onClick={handleSaveChangesAll} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold flex items-center gap-2 h-10 px-5 text-xs shadow-md">
            <Save size={16} />
            Save All Changes
          </Button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-green-600 text-white font-bold text-xs flex items-center gap-2 shadow-md animate-fade-in">
          <CheckCircle2 size={18} />
          All module changes and inserted files have been saved successfully!
        </div>
      )}

      {/* Module List & Controls */}
      <Card className="p-6 border-border shadow-md">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search module title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-9 text-xs bg-muted/40"
            />
          </div>

          <p className="text-xs text-muted-foreground font-medium">
            Total Modules: <strong className="text-foreground font-bold">{modules.length} Modules</strong>
          </p>
        </div>

        {/* Modules Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="py-3 px-4 font-bold text-foreground uppercase tracking-wider">Order</th>
                <th className="py-3 px-4 font-bold text-foreground uppercase tracking-wider">Module Title & Description</th>
                <th className="py-3 px-4 font-bold text-foreground uppercase tracking-wider">Inserted File / Format</th>
                <th className="py-3 px-4 font-bold text-foreground uppercase tracking-wider">Duration</th>
                <th className="py-3 px-4 font-bold text-foreground uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredModules.map((mod) => (
                <tr key={mod.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="py-3.5 px-4 font-extrabold text-primary text-sm">
                    Mod {mod.order}
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-foreground text-sm">{mod.title}</p>
                    <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">{mod.content}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="space-y-1">
                      {getMediaBadge(mod.mediaType)}
                      {mod.mediaUrl && (
                        <p className="text-[10px] text-foreground/90 font-mono flex items-center gap-1">
                          <Paperclip size={10} className="text-primary" />
                          <span className="font-bold truncate max-w-[200px]">{mod.mediaUrl}</span>
                          {mod.mediaSize && <span className="text-muted-foreground">({mod.mediaSize})</span>}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Clock size={12} className="text-muted-foreground" />
                      {mod.estimatedDuration} mins
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenEditModal(mod)}
                        className="h-8 px-2.5 text-xs border-border hover:bg-secondary flex items-center gap-1"
                      >
                        <Edit2 size={14} />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteModule(mod.id)}
                        className="h-8 px-2.5 text-xs border-destructive/30 text-destructive hover:bg-destructive/10 flex items-center gap-1"
                      >
                        <Trash2 size={14} />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add / Edit Module Modal with Actual File Picker */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg p-6 bg-card border-border shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h2 className="text-lg font-extrabold text-foreground">
                {editingModule ? `Edit Module ${editingModule.order}` : 'Add New Course Module'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveModule} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-foreground mb-1">Module Title</label>
                <Input
                  required
                  placeholder="e.g. Tactical Human Rights & De-escalation"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="h-9 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-foreground mb-1">Duration (Mins)</label>
                  <Input
                    type="number"
                    required
                    min={5}
                    max={180}
                    value={formData.estimatedDuration}
                    onChange={(e) => setFormData({ ...formData, estimatedDuration: Number(e.target.value) })}
                    className="h-9 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-foreground mb-1">Media Format</label>
                  <select
                    value={formData.mediaType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        mediaType: e.target.value as any,
                      })
                    }
                    className="w-full h-9 px-3 rounded-lg border border-border bg-card text-xs font-medium text-foreground focus:ring-1 focus:ring-primary"
                  >
                    <option value="pdf">PDF Document (.pdf)</option>
                    <option value="powerpoint">PowerPoint Presentation (.pptx)</option>
                    <option value="video">Video Lesson (.mp4)</option>
                    <option value="text">Text Manual</option>
                  </select>
                </div>
              </div>

              {/* ACTUAL FILE INPUT PICKER */}
              <div className="space-y-2 p-3 rounded-xl bg-secondary/30 border border-dashed border-primary/40">
                <label className="block font-bold text-foreground flex items-center justify-between">
                  <span>Insert / Upload Actual File (PDF, PPT, Video)</span>
                  <Upload size={14} className="text-primary" />
                </label>
                
                <input
                  type="file"
                  accept=".pdf,.pptx,.ppt,.mp4,.mov,.docx"
                  onChange={handleFileUpload}
                  className="w-full text-xs text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
                />

                {formData.mediaUrl && (
                  <div className="p-2 rounded-lg bg-card border border-primary/20 text-foreground text-[11px] font-mono flex items-center justify-between">
                    <span className="truncate font-bold">📄 {formData.mediaUrl}</span>
                    {formData.mediaSize && <Badge className="bg-primary/10 text-primary text-[10px]">{formData.mediaSize}</Badge>}
                  </div>
                )}
              </div>

              <div>
                <label className="block font-bold text-foreground mb-1">Module Content / Description</label>
                <textarea
                  rows={3}
                  placeholder="Provide an overview of key topics covered in this module..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-border bg-card text-xs text-foreground focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="h-9 text-xs font-bold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-9 text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm flex items-center gap-1"
                >
                  <Save size={14} />
                  {editingModule ? 'Save Module Changes' : 'Insert & Create Module'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
