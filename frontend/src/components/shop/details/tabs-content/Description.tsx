import { FaCheckCircle, FaLeaf, FaSeedling, FaSun } from 'react-icons/fa';

const Description = () => {
  return (
    <div className="py-8 space-y-6 text-slate-700">
      <div className="max-w-4xl space-y-4">
        <h3 className="text-xl font-bold text-slate-900">
          The Purest Farm-Fresh Organic Toor Dal
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          GrainPulse Organic Toor Dal is cultivated in nutrient-rich black soil by certified regenerative farmers in Madhya Pradesh. Unlike commercial dal that is artificially polished using oil, water, or leather polishers (which strips away vital dietary fiber and vitamins), our dal remains completely unpolished and intact.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          It cooks naturally faster, delivers a deep earthy aroma, and provides an extraordinary source of plant protein for growing children and active adults.
        </p>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-3">
          <FaLeaf className="text-emerald-700 text-xl shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-emerald-950">Zero Chemical Polish</h4>
            <p className="text-xs text-slate-600 mt-1">Retains 100% natural bran and nutrient-dense outer coat.</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 flex items-start gap-3">
          <FaSun className="text-amber-600 text-xl shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-amber-950">Sun-Dried Harvesting</h4>
            <p className="text-xs text-slate-600 mt-1">Naturally sun-dried to eliminate moisture without artificial heating.</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100 flex items-start gap-3">
          <FaSeedling className="text-teal-700 text-xl shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-teal-950">Desi Native Heirloom</h4>
            <p className="text-xs text-slate-600 mt-1">Non-GMO heritage seeds for maximum nutritional density.</p>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <h4 className="text-sm font-bold text-slate-900 mb-3">Key Nutritional Benefits:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-emerald-600 shrink-0" />
            <span>Over 22g of bioavailable plant protein per 100g serving</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-emerald-600 shrink-0" />
            <span>High dietary fiber promoting gut microbiome health</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-emerald-600 shrink-0" />
            <span>Rich in essential Folate, Iron, Magnesium, and Potassium</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-emerald-600 shrink-0" />
            <span>Low glycemic index suitable for balanced daily meals</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;