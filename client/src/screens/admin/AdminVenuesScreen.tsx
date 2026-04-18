import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { colors } from '../../theme/colors';
import { api, type Venue } from '../../lib/api';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '12px 14px', backgroundColor: colors.inputBg, border: `1px solid ${colors.border}`,
  borderRadius: 10, color: colors.text, fontSize: 14, outline: 'none', boxSizing: 'border-box',
};

type FormData = { name: string; type: string; location: string; slots: number; imageUrl: string };

const emptyForm: FormData = { name: '', type: '5v5 Outdoor', location: '', slots: 4, imageUrl: '' };

export default function AdminVenuesScreen() {
  const [, navigate] = useLocation();
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [formError, setFormError] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchVenues = () => {
    api.admin.venues.list()
      .then(res => setVenues(res.venues))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchVenues(); }, []);

  const toggleActive = async (id: string) => {
    const venue = venues.find(v => v.id === id);
    if (!venue) return;
    try {
      const res = await api.admin.venues.update(id, { active: !venue.active });
      setVenues(prev => prev.map(v => v.id === id ? res.venue : v));
    } catch (err) { console.error(err); }
  };

  const openAdd = () => { setEditId(null); setForm(emptyForm); setFormError(''); setShowForm(true); };
  const openEdit = (v: Venue) => { setEditId(v.id); setForm({ name: v.name, type: v.type, location: v.location, slots: v.slots, imageUrl: v.imageUrl || '' }); setFormError(''); setShowForm(true); };

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) return 'Only JPG, PNG, and WebP images are allowed';
    if (file.size > MAX_FILE_SIZE) return `Image too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Max 5MB.`;
    return null;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const err = validateFile(file);
    if (err) { setFormError(err); return; }
    setUploading(true);
    setFormError('');
    try {
      const res = await api.admin.venues.uploadImage(file);
      setForm(f => ({ ...f, imageUrl: res.url }));
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Upload failed');
    } finally { setUploading(false); }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.type || !form.location) { setFormError('All fields are required'); return; }
    setFormError(''); setFormSubmitting(true);
    try {
      if (editId) {
        const res = await api.admin.venues.update(editId, form);
        setVenues(prev => prev.map(v => v.id === editId ? res.venue : v));
      } else {
        const res = await api.admin.venues.create(form);
        setVenues(prev => [...prev, res.venue]);
      }
      setShowForm(false);
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Failed');
    } finally { setFormSubmitting(false); }
  };

  return (
    <div style={{ backgroundColor: colors.bg, minHeight: 844, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ backgroundColor: colors.bgCard, padding: '60px 24px 16px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => navigate('/admin')} style={{ background: 'none', border: 'none', color: colors.primary, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>← Back</button>
        <span style={{ fontSize: 17, fontWeight: 700, color: colors.text }}>Manage Venues</span>
        <button onClick={openAdd} style={{ backgroundColor: colors.primary, border: 'none', borderRadius: 999, padding: '6px 14px', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>+ Add</button>
      </div>

      {showForm && (
        <div onClick={() => setShowForm(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div onClick={e => e.stopPropagation()} style={{ backgroundColor: colors.bgCard, width: '100%', maxWidth: 480, maxHeight: '90vh', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, overflowY: 'auto' }}>
            <div style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: colors.border, margin: '0 auto 16px' }} />
            <div style={{ fontSize: 18, fontWeight: 700, color: colors.text, marginBottom: 16 }}>{editId ? 'Edit Venue' : 'Add Venue'}</div>
            {formError && <div style={{ backgroundColor: `${colors.error}22`, border: `1px solid ${colors.error}44`, borderRadius: 10, padding: 10, marginBottom: 12, color: colors.error, fontSize: 12 }}>{formError}</div>}
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: colors.textMuted, fontWeight: 600, marginBottom: 4 }}>Name</div>
              <input style={inputStyle} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Venue name" />
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: colors.textMuted, fontWeight: 600, marginBottom: 4 }}>Type</div>
              <select style={inputStyle} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                {['5v5 Outdoor', '5v5 Futsal', '7v7 Indoor', '11v11 Grass'].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: colors.textMuted, fontWeight: 600, marginBottom: 4 }}>Location</div>
              <input style={inputStyle} value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="Area, City" />
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: colors.textMuted, fontWeight: 600, marginBottom: 4 }}>Slots</div>
              <input type="number" min={1} max={20} style={inputStyle} value={form.slots} onChange={e => setForm(f => ({ ...f, slots: parseInt(e.target.value) || 1 }))} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: colors.textMuted, fontWeight: 600, marginBottom: 4 }}>Venue Image</div>
              <div style={{ fontSize: 11, color: colors.textDim, marginBottom: 6 }}>Recommended: 1200×600px, JPG/PNG/WebP, max 5MB</div>
              {form.imageUrl ? (
                <div style={{ position: 'relative', marginBottom: 8 }}>
                  <img src={form.imageUrl} alt="Venue" style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 10 }} />
                  <button onClick={() => setForm(f => ({ ...f, imageUrl: '' }))} style={{ position: 'absolute', top: 6, right: 6, width: 28, height: 28, borderRadius: 14, backgroundColor: colors.error, border: 'none', color: '#fff', cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                </div>
              ) : null}
              <label style={{ display: 'block', padding: '12px 0', backgroundColor: colors.inputBg, border: `1px dashed ${colors.border}`, borderRadius: 10, textAlign: 'center', color: colors.textMuted, fontSize: 13, cursor: uploading ? 'not-allowed' : 'pointer', opacity: uploading ? 0.6 : 1 }}>
                {uploading ? 'Uploading...' : '📷 Choose Image (JPG, PNG, WebP ≤ 5MB)'}
                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageUpload} style={{ display: 'none' }} disabled={uploading} />
              </label>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={handleSubmit} disabled={formSubmitting} style={{ flex: 1, padding: '14px 0', backgroundColor: colors.primary, border: 'none', borderRadius: 999, color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer', opacity: formSubmitting ? 0.7 : 1 }}>{formSubmitting ? 'Saving...' : editId ? 'Update' : 'Create'}</button>
              <button onClick={() => setShowForm(false)} style={{ flex: 1, padding: '14px 0', backgroundColor: 'transparent', border: `1px solid ${colors.border}`, borderRadius: 999, color: colors.textMuted, fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ flex: 1, overflowY: 'auto', padding: 24, paddingBottom: 20 }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
          {[{ label: 'Total', value: venues.length }, { label: 'Active', value: venues.filter(v => v.active).length }, { label: 'Total Slots', value: venues.reduce((s, v) => s + v.slots, 0) }].map(s => (
            <div key={s.label} style={{ flex: 1, backgroundColor: colors.bgCard, borderRadius: 12, padding: 16, textAlign: 'center', border: `1px solid ${colors.border}` }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: colors.primary }}>{s.value}</div>
              <div style={{ fontSize: 10, color: colors.textMuted }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {loading ? <div style={{ textAlign: 'center', color: colors.textMuted, padding: 20 }}>Loading...</div> : venues.map(venue => (
            <div key={venue.id} style={{ backgroundColor: colors.bgCard, borderRadius: 16, overflow: 'hidden', border: `1px solid ${colors.border}` }}>
              <div style={{ height: 120, backgroundColor: colors.bgCardAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                {venue.imageUrl ? <img src={venue.imageUrl} alt={venue.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800, color: '#fff' }}>{venue.name[0]}</div>}
                <div style={{ position: 'absolute', top: 10, left: 10, backgroundColor: `${venue.active ? colors.primary : colors.error}22`, border: `1px solid ${venue.active ? colors.primary : colors.error}44`, borderRadius: 999, padding: '3px 10px' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: venue.active ? colors.primary : colors.error }}>{venue.active ? 'Active' : 'Inactive'}</span>
                </div>
              </div>
              <div style={{ padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: colors.text }}>{venue.name}</span>
                  <button onClick={() => toggleActive(venue.id)} style={{ backgroundColor: `${colors.error}22`, border: `1px solid ${colors.error}44`, borderRadius: 999, padding: '4px 12px', color: colors.error, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>{venue.active ? 'Disable' : 'Enable'}</button>
                </div>
                <div style={{ fontSize: 12, color: colors.textMuted, marginBottom: 16 }}>{venue.type} · 📍 {venue.location}</div>

                <div style={{ display: 'flex', backgroundColor: colors.inputBg, borderRadius: 10, padding: 10, marginBottom: 16 }}>
                  {[{ label: 'Slots', value: venue.slots }, { label: 'Type', value: venue.type.split(' ')[0] }, { label: 'Location', value: venue.location }].map(s => (
                    <div key={s.label} style={{ flex: 1, textAlign: 'center' }}>
                      <div style={{ fontSize: 18, fontWeight: 800, color: colors.primary }}>{s.value}</div>
                      <div style={{ fontSize: 10, color: colors.textMuted }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={() => openEdit(venue)} style={{ flex: 1, padding: '10px 0', backgroundColor: colors.inputBg, border: `1px solid ${colors.border}`, borderRadius: 999, color: colors.text, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>✏️ Edit Details</button>
                  <button onClick={() => openEdit(venue)} style={{ flex: 1, padding: '10px 0', backgroundColor: `${colors.primary}22`, border: `1px solid ${colors.primary}44`, borderRadius: 999, color: colors.primary, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>🕐 Manage Slots</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}
