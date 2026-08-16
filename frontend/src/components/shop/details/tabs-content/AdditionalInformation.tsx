import { Link } from "react-router-dom";
import { FaShieldAlt, FaLeaf } from "react-icons/fa";

interface NutritionItem {
  attribute: string;
  value: string;
}

const nutritionData: NutritionItem[] = [
  { attribute: "Energy / Calories", value: "343 kcal (per 100g)" },
  { attribute: "Total Protein", value: "22.3 g" },
  { attribute: "Dietary Fiber", value: "15.0 g" },
  { attribute: "Total Carbohydrates", value: "62.8 g" },
  { attribute: "Total Fat", value: "1.5 g (Zero Cholesterol)" },
  { attribute: "Iron & Calcium", value: "5.1 mg / 73 mg" },
  { attribute: "Farming Practice", value: "100% Organic & Pesticide-Free" },
  { attribute: "Processing Method", value: "Unpolished, Natural Sun-Dried" },
  { attribute: "Country of Origin", value: "India (Madhya Pradesh Farms)" },
  { attribute: "Shelf Life & Storage", value: "12 Months in airtight cool container" },
];

const tags = ["Organic Pulses", "Unpolished Dal", "Toor Dal", "High Protein", "Farm Fresh", "Non-GMO"];

const AdditionalInformation = () => {
  return (
    <div className="py-8 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Table (7 cols) */}
        <div className="lg:col-span-7">
          <h3 className="text-base font-bold text-slate-900 mb-4 font-heading">
            Nutritional Facts & Specifications
          </h3>
          <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-xs">
            <div className="divide-y divide-slate-100">
              {nutritionData.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center px-4 py-3 text-xs sm:text-sm hover:bg-slate-50 transition">
                  <span className="font-semibold text-slate-700">{item.attribute}</span>
                  <span className="text-slate-500 font-medium text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Certifications & Tags (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-emerald-50/70 border border-emerald-100 p-5 rounded-2xl">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm mb-2">
              <FaShieldAlt className="text-emerald-700" />
              <span>GrainPulse Purity Certification</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every shipment is verified for 0% chemical residues, 0% mineral oil coating, and zero synthetic polishing agents.
            </p>
            <div className="flex items-center gap-3 mt-4 pt-3 border-t border-emerald-200/60 text-xs font-semibold text-emerald-800">
              <span className="flex items-center gap-1"><FaLeaf /> 100% Organic Verified</span>
              <span>•</span>
              <span>Non-GMO Harvest</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
              Related Product Tags
            </h4>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <Link
                  key={i}
                  to="/categories"
                  className="text-xs px-3 py-1 bg-slate-100 hover:bg-emerald-800 hover:text-white rounded-lg text-slate-600 transition"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdditionalInformation;
