import React from 'react';
import { 
  Shield, Target, Zap, Globe, Users, Award, 
  Factory, Cpu, HardHat, Truck, Layers, Box, 
  CheckCircle, Star, Sparkles, Wrench, Package, 
  Flame, Anchor, Compass
} from 'lucide-react';

export const ICON_MAP = {
  Shield, Target, Zap, Globe, Users, Award, 
  Factory, Cpu, HardHat, Truck, Layers, Box, 
  CheckCircle, Star, Sparkles, Wrench, Package, 
  Flame, Anchor, Compass
};

export const AVAILABLE_ICONS = Object.keys(ICON_MAP);

export const DynamicIcon = ({ name, size = 20, className = '' }) => {
  const IconComponent = ICON_MAP[name] || Shield;
  return <IconComponent size={size} className={className} />;
};

const IconPicker = ({ selected, onChange, label = 'Select Icon' }) => {
  return (
    <div>
      {label && (
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
          {label}
        </label>
      )}
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 p-3 bg-slate-950/70 border border-slate-800 rounded-xl max-h-48 overflow-y-auto">
        {AVAILABLE_ICONS.map((iconName) => {
          const IconComp = ICON_MAP[iconName];
          const isSelected = selected === iconName;
          return (
            <button
              key={iconName}
              type="button"
              onClick={() => onChange(iconName)}
              title={iconName}
              className={`flex flex-col items-center justify-center p-2.5 rounded-lg border transition-all ${
                isSelected 
                  ? 'bg-red-600/20 border-red-500 text-red-400 shadow-md shadow-red-950/40 scale-105' 
                  : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-850'
              }`}
            >
              <IconComp size={18} />
              <span className="text-[9px] mt-1 truncate max-w-full font-mono">{iconName}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default IconPicker;
