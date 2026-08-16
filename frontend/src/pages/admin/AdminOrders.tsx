import { useState } from 'react';
import { 
  FaShippingFast, 
  FaSearch, 
  FaBoxOpen, 
  FaReceipt, 
  FaTimes, 
  FaMapMarkerAlt, 
  FaClock 
} from 'react-icons/fa';
import Alert from '../../components/common/Alert';

interface OrderItem {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  items: { name: string; qty: number; price: number }[];
  totalAmount: number;
  paymentMethod: string;
  status: 'Processing' | 'Dispatched' | 'Delivered' | 'Cancelled';
  date: string;
}

const initialOrders: OrderItem[] = [
  {
    id: 'ord-101',
    orderNumber: 'GP-90182',
    customerName: 'Rahul Verma',
    phone: '+91 9876543210',
    address: 'Flat 402, Green Meadows, MG Road',
    city: 'Bengaluru, KA - 560001',
    items: [
      { name: 'Organic Toor / Arhar Dal (1 Kg)', qty: 2, price: 165 },
      { name: 'Cold-Pressed Mustard Oil (1 L)', qty: 1, price: 175 },
    ],
    totalAmount: 505,
    paymentMethod: 'UPI / Online',
    status: 'Processing',
    date: 'Today, 02:15 PM',
  },
  {
    id: 'ord-102',
    orderNumber: 'GP-90181',
    customerName: 'Priya Sundaram',
    phone: '+91 9811223344',
    address: 'House No 12, Heritage Colony, Anna Nagar',
    city: 'Chennai, TN - 600040',
    items: [
      { name: 'Himalayan Red Rice (1 Kg)', qty: 3, price: 210 },
      { name: 'Salem Pure Turmeric Powder (250g)', qty: 2, price: 120 },
    ],
    totalAmount: 870,
    paymentMethod: 'Cash on Delivery',
    status: 'Dispatched',
    date: 'Today, 11:30 AM',
  },
  {
    id: 'ord-103',
    orderNumber: 'GP-90180',
    customerName: 'Amit Saxena',
    phone: '+91 9988776655',
    address: 'B-14, Shivalik Enclave, Sector 21',
    city: 'Chandigarh, PB - 160022',
    items: [
      { name: 'Kashmiri Mamra Almonds (500g)', qty: 1, price: 650 },
    ],
    totalAmount: 650,
    paymentMethod: 'UPI / Online',
    status: 'Delivered',
    date: 'Yesterday, 04:45 PM',
  },
  {
    id: 'ord-104',
    orderNumber: 'GP-90179',
    customerName: 'Kavita Joshi',
    phone: '+91 9765432109',
    address: 'Plot 88, Vasant Vihar Phase 2',
    city: 'New Delhi, DL - 110057',
    items: [
      { name: 'Organic Toor / Arhar Dal (1 Kg)', qty: 1, price: 165 },
      { name: 'Salem Pure Turmeric Powder (250g)', qty: 1, price: 120 },
    ],
    totalAmount: 285,
    paymentMethod: 'Cash on Delivery',
    status: 'Delivered',
    date: '15 Aug 2026',
  },
];

const AdminOrders = () => {
  const [orders, setOrders] = useState<OrderItem[]>(initialOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);

  const [alertData, setAlertData] = useState<{
    message: string;
    variant: 'success' | 'error';
    show: boolean;
  }>({
    message: '',
    variant: 'success',
    show: false,
  });

  const handleStatusChange = (orderId: string, newStatus: OrderItem['status']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
    setAlertData({
      message: `Order status updated to "${newStatus}"!`,
      variant: 'success',
      show: true,
    });
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const filteredOrders = orders.filter((ord) => {
    const matchSearch =
      ord.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.phone.includes(searchQuery);
    const matchStatus = statusFilter === 'All' || ord.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const processingCount = orders.filter((o) => o.status === 'Processing').length;
  const dispatchedCount = orders.filter((o) => o.status === 'Dispatched').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <FaShippingFast className="text-amber-400" />
            <span>Fulfillment Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Customer Orders & Dispatches
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track farm-direct orders, update fulfillment lifecycle, and inspect delivery destinations.
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold block">Total Live Orders</span>
            <span className="text-2xl sm:text-3xl font-black text-white">{orders.length}</span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-slate-800 flex items-center justify-center text-emerald-400 text-xl">
            <FaReceipt />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold block">Pending / In Dispatch</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-400">{processingCount + dispatchedCount}</span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-xl">
            <FaClock />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold block">Gross Order Value</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-400">₹{totalRevenue.toLocaleString()}</span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xl">
            <FaBoxOpen />
          </div>
        </div>
      </div>

      {/* Search & Status Filters */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order #, Customer, or Phone..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 outline-none focus:border-emerald-500 transition"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 overflow-x-auto">
          {['All', 'Processing', 'Dispatched', 'Delivered', 'Cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">Order ID & Date</th>
                <th className="py-3.5 px-4">Customer & Destination</th>
                <th className="py-3.5 px-4">Basket Summary</th>
                <th className="py-3.5 px-4">Total & Payment</th>
                <th className="py-3.5 px-4">Fulfillment Status</th>
                <th className="py-3.5 px-4 text-right pr-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-850/60 transition">
                  
                  {/* Order ID */}
                  <td className="py-4 px-4 sm:px-6">
                    <span className="font-mono font-bold text-white block text-sm">{ord.orderNumber}</span>
                    <span className="text-[11px] text-slate-400">{ord.date}</span>
                  </td>

                  {/* Customer */}
                  <td className="py-4 px-4">
                    <span className="font-bold text-white block">{ord.customerName}</span>
                    <span className="text-[11px] text-slate-400 block">{ord.phone}</span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5 truncate max-w-xs">
                      <FaMapMarkerAlt className="text-emerald-400 shrink-0" />
                      <span>{ord.city}</span>
                    </span>
                  </td>

                  {/* Basket */}
                  <td className="py-4 px-4">
                    <div className="space-y-0.5">
                      {ord.items.map((item, idx) => (
                        <div key={idx} className="text-[11px] text-slate-300">
                          {item.qty}x {item.name}
                        </div>
                      ))}
                    </div>
                  </td>

                  {/* Total & Payment */}
                  <td className="py-4 px-4">
                    <span className="font-black text-white block">₹{ord.totalAmount}</span>
                    <span className="text-[10px] text-slate-400 font-semibold">{ord.paymentMethod}</span>
                  </td>

                  {/* Status Dropdown */}
                  <td className="py-4 px-4">
                    <select
                      value={ord.status}
                      onChange={(e) => handleStatusChange(ord.id, e.target.value as any)}
                      className={`text-xs font-bold rounded-lg px-2.5 py-1.5 border outline-none cursor-pointer ${
                        ord.status === 'Delivered'
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                          : ord.status === 'Dispatched'
                          ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                          : ord.status === 'Processing'
                          ? 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                          : 'bg-red-500/10 text-red-300 border-red-500/30'
                      }`}
                    >
                      <option value="Processing" className="bg-slate-900 text-white">Processing</option>
                      <option value="Dispatched" className="bg-slate-900 text-white">Dispatched</option>
                      <option value="Delivered" className="bg-slate-900 text-white">Delivered</option>
                      <option value="Cancelled" className="bg-slate-900 text-white">Cancelled</option>
                    </select>
                  </td>

                  {/* View Details */}
                  <td className="py-4 px-4 text-right pr-6">
                    <button
                      onClick={() => setSelectedOrder(ord)}
                      className="bg-slate-800 hover:bg-slate-700 text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-700 transition cursor-pointer"
                    >
                      Invoice
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice / Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                  <FaReceipt />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Order Details & Invoice</h3>
                  <p className="text-xs text-slate-400 font-mono">Invoice #{selectedOrder.orderNumber}</p>
                </div>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-white">
                <FaTimes className="text-lg" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Customer:</span>
                  <span className="font-bold text-white">{selectedOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Phone:</span>
                  <span className="font-mono text-slate-300">{selectedOrder.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Shipping Address:</span>
                  <span className="text-right text-slate-300 max-w-xs">{selectedOrder.address}, {selectedOrder.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Payment:</span>
                  <span className="font-bold text-amber-400">{selectedOrder.paymentMethod}</span>
                </div>
              </div>

              <div className="border border-slate-800 rounded-2xl overflow-hidden">
                <div className="bg-slate-950 p-3 text-[11px] font-bold text-slate-400 border-b border-slate-800">
                  Purchased Harvest Items
                </div>
                <div className="divide-y divide-slate-850 p-3 space-y-2">
                  {selectedOrder.items.map((it, i) => (
                    <div key={i} className="flex justify-between text-slate-300 pt-1">
                      <span>{it.qty}x {it.name}</span>
                      <span className="font-bold text-white">₹{it.price * it.qty}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-white font-extrabold text-sm pt-3 border-t border-slate-800">
                    <span>Total Amount:</span>
                    <span className="text-emerald-400">₹{selectedOrder.totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-800 pt-4">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition cursor-pointer"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Alert */}
      {alertData.show && (
        <Alert
          message={alertData.message}
          variant={alertData.variant}
          onDismiss={() => setAlertData((p) => ({ ...p, show: false }))}
        />
      )}

    </div>
  );
};

export default AdminOrders;
