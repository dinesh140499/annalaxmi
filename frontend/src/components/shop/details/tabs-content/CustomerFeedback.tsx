import { FaStar, FaCheckCircle, FaThumbsUp } from 'react-icons/fa';

interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Dr. Ananya Sharma",
    rating: 5,
    date: "2 days ago",
    comment: "The difference in aroma and taste of unpolished dal is extraordinary! It cooks beautifully without turning mushy and has a rich, earthy flavor. My family loves it.",
    helpful: 18,
  },
  {
    id: 2,
    name: "Vikram Malhotra",
    rating: 5,
    date: "1 week ago",
    comment: "GrainPulse delivers the freshest organic grains I have found in Delhi. Fast delivery, completely chemical-free, and super authentic packaging.",
    helpful: 12,
  },
  {
    id: 3,
    name: "Pooja Verma",
    rating: 5,
    date: "2 weeks ago",
    comment: "Genuine unpolished toor dal with clean natural texture. Highly recommend everyone to switch away from commercial polished supermarket dals.",
    helpful: 9,
  },
];

const CustomerFeedback = () => {
  return (
    <div className="py-8 space-y-6">
      
      {/* Review Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-6 rounded-2xl bg-emerald-50/60 border border-emerald-100">
        <div className="md:col-span-4 text-center md:text-left border-b md:border-b-0 md:border-r border-emerald-200/60 pb-4 md:pb-0 md:pr-6">
          <div className="text-4xl font-extrabold text-emerald-950">5.0</div>
          <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400 text-sm mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">Based on 48 verified customer reviews</p>
        </div>

        <div className="md:col-span-8 space-y-1.5 text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <span className="w-12 font-semibold text-slate-700">5 Stars</span>
            <div className="flex-1 h-2 bg-emerald-200/60 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-700 rounded-full w-[94%]"></div>
            </div>
            <span className="w-8 text-right font-bold text-slate-800">94%</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-12 font-semibold text-slate-700">4 Stars</span>
            <div className="flex-1 h-2 bg-emerald-200/60 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-700 rounded-full w-[6%]"></div>
            </div>
            <span className="w-8 text-right font-bold text-slate-800">6%</span>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4 pt-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="p-5 rounded-2xl bg-white border border-slate-100 shadow-xs hover:border-emerald-200 transition">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">{rev.name}</h4>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <FaCheckCircle className="text-[9px]" /> Verified Purchase
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex text-amber-400 text-xs">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400">• {rev.date}</span>
                </div>
              </div>
              <button 
                type="button"
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-800 transition px-2.5 py-1 rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                <FaThumbsUp className="text-xs" />
                <span>Helpful ({rev.helpful})</span>
              </button>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
              "{rev.comment}"
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default CustomerFeedback;