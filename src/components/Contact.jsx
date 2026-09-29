import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import Toast from './ui/Toast';
import TypewriterText from './ui/TypewriterText';

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '7bbc8204-017f-4cf6-b720-5c060298fc76';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio — Nouveau message de ${formData.name}`,
          from_name: 'Portfolio Contact Form',
          botcheck: '',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setToast({ message: 'Message envoyé avec succès !', type: 'success' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setToast({ message: 'Erreur lors de l\'envoi. Veuillez réessayer.', type: 'error' });
      }
    } catch {
      setToast({ message: 'Erreur réseau. Veuillez réessayer plus tard.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-transparent relative">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          <div className="lg:col-span-12 text-center mb-8">
            <h2 className="text-[#4093DB] text-4xl font-['Caveat',cursive] leading-none mb-3 -rotate-2 w-max mx-auto">
              <TypewriterText text="Me contacter" speed={100} />
            </h2>
            <h3 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-none mb-4">
              <TypewriterText text="Construisons quelque chose" speed={50} />
              <br />
              <TypewriterText text="d'extraordinaire." delay={1000} speed={50} />
            </h3>
          </div>

          <div className="lg:col-span-8 lg:col-start-3">
            <form
              onSubmit={handleSubmit}
              className="bg-transparent backdrop-blur-sm border-[2.5px] border-white/10 p-8 md:p-12 shadow-sm overflow-hidden"
              style={{
                borderRadius: '34px 22px 38px 24px / 26px 36px 24px 38px',
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold uppercase tracking-widest text-zinc-400 ml-1">Nom complet</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Votre nom"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-500 outline-none focus:border-[#4093DB] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold uppercase tracking-widest text-zinc-400 ml-1">Adresse e-mail</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nom@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-500 outline-none focus:border-[#4093DB] transition-all"
                  />
                </div>
              </div>

              <input
                type="checkbox"
                name="botcheck"
                style={{ display: 'none' }}
                tabIndex="-1"
                autoComplete="off"
              />

              <div className="space-y-2 mb-8">
                <label className="text-[11px] font-extrabold uppercase tracking-widest text-zinc-400 ml-1">Message</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Décrivez votre projet..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-500 outline-none focus:border-[#4093DB] transition-all resize-none"
                />
              </div>

              <div className="mt-6 flex items-center gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-max px-10 py-3 bg-transparent border border-white/10 text-white rounded-lg font-bold text-xs uppercase tracking-widest transition-all hover:bg-[#4093DB] hover:border-[#4093DB] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      Envoi en cours...
                      <Loader2 size={16} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      Envoyer le message
                      <Send size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
