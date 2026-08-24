import React from 'react';
import { Layout, Phone, Mail, MapPin, Sparkles, Clock, ShieldCheck, Wrench, FileText, Globe } from 'lucide-react';

const ContactHeroEditor = ({
  heroData = {},
  cardsData = {},
  valueData = {},
  onUpdateHero,
  onUpdateCards,
  onUpdateValue
}) => {
  const hero = {
    badge: "CONNECT WITH OUR INDUSTRIAL SPECIALISTS",
    heading: "Let's Engineer Your Solution Together",
    headingAccent: "Solution Together",
    subheading: "Whether you need custom slit tapes, high-performance 3M™ abrasives, or a competitive volume quote, our application engineers are ready to assist you.",
    ...heroData
  };

  const cards = {
    phone: {
      tag: "DIRECT HOTLINE",
      value: "+91 98259 54315",
      desc: "Mon – Sat: 9:00 AM – 7:00 PM IST",
      action: "Call Directly",
      link: "tel:+919825954315",
      ...(cardsData?.phone || {})
    },
    email: {
      tag: "OFFICIAL EMAIL",
      value: "nb2corporation@gmail.com",
      desc: "Fast response within 4–12 business hours",
      action: "Send Email",
      link: "mailto:nb2corporation@gmail.com",
      ...(cardsData?.email || {})
    },
    location: {
      tag: "CENTRAL FACILITY",
      value: "Ahmedabad, Gujarat",
      desc: "Headquarters & Conversion Facility",
      action: "Get Directions",
      link: "https://maps.google.com/?q=Ahmedabad,Gujarat,India",
      ...(cardsData?.location || {})
    }
  };

  const valueSection = {
    badge: "EXCELLENCE WITH EXPERIENCE",
    heading: "Partner with Certified 3M™ Industrial Leaders",
    headingAccent: "3M™ Industrial Leaders",
    subheading: "Since 2006, N.B. Corporation has empowered over 1,000+ manufacturing facilities across India with state-of-the-art adhesive and abrasive solutions.",
    hoursWeekdays: "9:00 AM – 7:00 PM (IST)",
    hoursSunday: "Closed (Emergency support via Email)",
    perks: [
      {
        title: "Technical Application Consulting",
        desc: "On-site technical evaluation to ensure the ideal tape & abrasive grade for your exact substrates."
      },
      {
        title: "100% Genuine 3M™ Certified",
        desc: "Authorized distributor backing with official batch warranties and technical datasheets."
      },
      {
        title: "Fast RFQ & Sample Dispatches",
        desc: "Rapid quote turnarounds and trial samples dispatched directly to your manufacturing plant."
      }
    ],
    ...valueData
  };

  const handleHeroChange = (field, val) => {
    onUpdateHero({ ...hero, [field]: val });
  };

  const handleCardChange = (cardKey, field, val) => {
    onUpdateCards({
      ...cards,
      [cardKey]: {
        ...cards[cardKey],
        [field]: val
      }
    });
  };

  const handleValueChange = (field, val) => {
    onUpdateValue({ ...valueSection, [field]: val });
  };

  const handlePerkChange = (index, field, val) => {
    const newPerks = [...(valueSection.perks || [])];
    newPerks[index] = { ...newPerks[index], [field]: val };
    onUpdateValue({ ...valueSection, perks: newPerks });
  };

  return (
    <div className="space-y-8">
      {/* ── SECTION 1: Top Hero Banner ── */}
      <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-500/20 text-red-500 flex items-center justify-center">
            <Layout size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Contact Hero Banner</h3>
            <p className="text-xs text-slate-400">Header badge, title, accent text, and introductory statement.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Top Pill Badge
            </label>
            <input
              type="text"
              value={hero.badge}
              onChange={(e) => handleHeroChange('badge', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Main Heading Title
            </label>
            <input
              type="text"
              value={hero.heading}
              onChange={(e) => handleHeroChange('heading', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2.5 text-xs text-white font-bold outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Red Accent Word
            </label>
            <input
              type="text"
              value={hero.headingAccent}
              onChange={(e) => handleHeroChange('headingAccent', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2.5 text-xs text-red-400 font-bold outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Banner Subtitle Description
          </label>
          <textarea
            rows={2}
            value={hero.subheading}
            onChange={(e) => handleHeroChange('subheading', e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl p-3 text-xs text-white outline-none resize-none"
          />
        </div>
      </div>

      {/* ── SECTION 2: 3 Quick Contact Info Cards ── */}
      <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
            <Phone size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">3 Quick Contact Information Cards</h3>
            <p className="text-xs text-slate-400">Configure phone hotline, official email, and facility location details.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Phone Card */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-red-400 text-xs font-mono font-bold">
              <Phone size={14} />
              <span>CARD 1: PHONE HOTLINE</span>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Tag Label</label>
              <input
                type="text"
                value={cards.phone.tag}
                onChange={(e) => handleCardChange('phone', 'tag', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Phone Number</label>
              <input
                type="text"
                value={cards.phone.value}
                onChange={(e) => handleCardChange('phone', 'value', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Availability / Hours</label>
              <input
                type="text"
                value={cards.phone.desc}
                onChange={(e) => handleCardChange('phone', 'desc', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Tel URL Link</label>
              <input
                type="text"
                value={cards.phone.link}
                onChange={(e) => handleCardChange('phone', 'link', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-400 font-mono outline-none"
              />
            </div>
          </div>

          {/* Email Card */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-blue-400 text-xs font-mono font-bold">
              <Mail size={14} />
              <span>CARD 2: OFFICIAL EMAIL</span>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Tag Label</label>
              <input
                type="text"
                value={cards.email.tag}
                onChange={(e) => handleCardChange('email', 'tag', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Email Address</label>
              <input
                type="email"
                value={cards.email.value}
                onChange={(e) => handleCardChange('email', 'value', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Response Time Note</label>
              <input
                type="text"
                value={cards.email.desc}
                onChange={(e) => handleCardChange('email', 'desc', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Mailto Link</label>
              <input
                type="text"
                value={cards.email.link}
                onChange={(e) => handleCardChange('email', 'link', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-400 font-mono outline-none"
              />
            </div>
          </div>

          {/* Location Card */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold">
              <MapPin size={14} />
              <span>CARD 3: CENTRAL FACILITY</span>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Tag Label</label>
              <input
                type="text"
                value={cards.location.tag}
                onChange={(e) => handleCardChange('location', 'tag', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">City & State</label>
              <input
                type="text"
                value={cards.location.value}
                onChange={(e) => handleCardChange('location', 'value', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Facility Description</label>
              <input
                type="text"
                value={cards.location.desc}
                onChange={(e) => handleCardChange('location', 'desc', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Google Maps URL</label>
              <input
                type="text"
                value={cards.location.link}
                onChange={(e) => handleCardChange('location', 'link', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-400 font-mono outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 3: Value Highlights & Operational Hours ── */}
      <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Value Proposition & Working Hours</h3>
            <p className="text-xs text-slate-400">Content displayed alongside the quick inquiry submission form.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Heading</label>
            <input
              type="text"
              value={valueSection.heading}
              onChange={(e) => handleValueChange('heading', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-bold outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Accent Highlight</label>
            <input
              type="text"
              value={valueSection.headingAccent}
              onChange={(e) => handleValueChange('headingAccent', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-red-400 font-bold outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Description Subtitle</label>
          <textarea
            rows={2}
            value={valueSection.subheading}
            onChange={(e) => handleValueChange('subheading', e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white outline-none resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Monday – Saturday Operational Hours</label>
            <input
              type="text"
              value={valueSection.hoursWeekdays}
              onChange={(e) => handleValueChange('hoursWeekdays', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Sunday Status</label>
            <input
              type="text"
              value={valueSection.hoursSunday}
              onChange={(e) => handleValueChange('hoursSunday', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
            />
          </div>
        </div>

        {/* 3 Perks */}
        <div className="space-y-3 pt-2">
          <label className="block text-xs font-semibold text-slate-400">3 Key Service Perks</label>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {(valueSection.perks || []).map((perk, idx) => (
              <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <span className="text-[10px] font-mono font-bold text-red-400 uppercase">Perk #{idx + 1}</span>
                <input
                  type="text"
                  value={perk.title}
                  onChange={(e) => handlePerkChange(idx, 'title', e.target.value)}
                  placeholder="Perk Title"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold outline-none"
                />
                <textarea
                  rows={2}
                  value={perk.desc}
                  onChange={(e) => handlePerkChange(idx, 'desc', e.target.value)}
                  placeholder="Perk Description"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-300 outline-none resize-none"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactHeroEditor;
