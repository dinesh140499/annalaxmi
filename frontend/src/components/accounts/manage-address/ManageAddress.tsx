import React, { useState, type ChangeEvent } from "react";
import InputField from "../../reusable/InputField";
import SelectInput from "../../reusable/SelectInput";
import Alert from "../../common/Alert";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, post, patch, del } from "../../../baseUrl";
import {
  IoHomeOutline,
  IoBriefcaseOutline,
  IoLocationOutline,
  IoAddOutline,
  IoTrashOutline,
  IoCreateOutline,
  IoPrintOutline,
  IoCheckmarkCircle,
  IoRadioButtonOff,
} from "react-icons/io5";

export type AddressType = {
  _id?: string;
  firstname: string;
  lastname?: string;
  phone?: string;
  company_name?: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  landmark?: string;
  type: "home" | "office" | "other";
  isDefault?: boolean;
};

function printAddress(addr: AddressType) {
  const html = `<!DOCTYPE html><html><head><title>Address - GrainPulse</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box;}
    body{font-family:'Segoe UI',sans-serif;padding:40px;background:#fff;color:#212121;}
    .label{border:1.5px solid #00603A;border-radius:10px;padding:28px 32px;max-width:380px;}
    .badge{display:inline-block;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#00603A;background:#e0f2eb;padding:3px 10px;border-radius:20px;margin-bottom:14px;}
    .name{font-size:17px;font-weight:700;margin-bottom:6px;}
    .addr{font-size:14px;color:#444;line-height:1.7;}
    .divider{border:none;border-top:1px dashed #ccc;margin:14px 0;}
    .logo{font-size:11px;color:#aaa;text-align:right;}
    @media print{body{padding:20px;}}
  </style></head><body>
  <div class="label">
    <div class="badge">${addr.type || "ADDRESS"}</div>
    <div class="name">${addr.firstname} ${addr.lastname ?? ""}</div>
    <div class="addr">
      ${addr.company_name ? addr.company_name + "<br>" : ""}
      ${addr.street}<br>
      ${addr.city ? addr.city + ", " : ""}${addr.state}, ${addr.country} – ${addr.zip_code}
    </div>
    <hr class="divider"/>
    <div class="logo">GrainPulse Organic</div>
  </div></body></html>`;

  const win = window.open("", "_blank", "width=480,height=360");
  if (!win) return;
  win.document.write(html);
  win.document.close();
  win.focus();
  win.print();
}

const emptyForm = (): Omit<AddressType, "_id"> => ({
  firstname: "",
  lastname: "",
  company_name: "",
  street: "",
  city: "Delhi",
  state: "Delhi",
  country: "India",
  landmark: "",
  zip_code: "",
  type: "home",
  phone: "",
});

interface CardProps {
  address: AddressType;
  selected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onPrint: () => void;
}

const TYPE_ICON: Record<string, React.ReactNode> = {
  home: <IoHomeOutline />,
  office: <IoBriefcaseOutline />,
};

const AddressCard = ({
  address,
  selected,
  onSelect,
  onEdit,
  onDelete,
  onPrint,
}: CardProps) => (
  <div
    onClick={onSelect}
    className={[
      "relative border rounded-2xl p-5 cursor-pointer transition-all duration-200",
      selected
        ? "border-emerald-800 bg-emerald-50/50 shadow-xs"
        : "border-slate-200 bg-white hover:border-emerald-700 hover:shadow-xs",
    ].join(" ")}
  >
    {/* Type + radio */}
    <div className="flex items-center gap-2 mb-3">
      <span className="text-emerald-800 text-lg">
        {selected ? (
          <IoCheckmarkCircle />
        ) : (
          <IoRadioButtonOff className="text-slate-400" />
        )}
      </span>
      <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md">
        {TYPE_ICON[address.type] ?? <IoLocationOutline />}
        {address.type}
      </span>
    </div>

    {/* Details */}
    <p className="text-sm font-bold text-slate-900">
      {address.firstname} {address.lastname}
    </p>
    {address.company_name && (
      <p className="text-xs text-slate-500 mt-0.5">{address.company_name}</p>
    )}
    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
      {address.street}
      <br />
      {address.city ? `${address.city}, ` : ""}{address.state}, {address.country} – {address.zip_code}
    </p>
    {address.phone && (
      <p className="text-xs text-slate-500 mt-1 font-mono">
        📞 {address.phone}
      </p>
    )}

    {/* Actions */}
    <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-100">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
        className="flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer"
      >
        <IoCreateOutline className="text-sm" /> EDIT
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-800 transition-colors cursor-pointer"
      >
        <IoTrashOutline className="text-sm" /> REMOVE
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrint();
        }}
        className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
      >
        <IoPrintOutline className="text-sm" /> PRINT
      </button>
    </div>
  </div>
);

interface FormProps {
  initial?: Omit<AddressType, "_id">;
  isEditing?: boolean;
  onSave: (data: Omit<AddressType, "_id">) => void;
  onCancel: () => void;
  isPending?: boolean;
}

const AddressForm = ({
  initial,
  isEditing,
  onSave,
  onCancel,
  isPending,
}: FormProps) => {
  const [form, setForm] = useState<Omit<AddressType, "_id">>(
    initial ?? emptyForm(),
  );

  const handle = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const lbl = (text: string) => (
    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
      {text}
    </label>
  );

  const inputCls =
    "py-2.5 w-full text-xs sm:text-sm border border-slate-200 rounded-xl focus:border-emerald-700 outline-none px-3.5 transition-colors";

  return (
    <div className="border border-emerald-700/60 rounded-2xl overflow-hidden shadow-xs">
      <div className="bg-emerald-800 px-5 py-3.5">
        <h3 className="text-white font-bold text-xs sm:text-sm uppercase tracking-wide">
          {isEditing ? "Edit Delivery Address" : "Add New Delivery Address"}
        </h3>
      </div>

      <div className="p-5 space-y-4 bg-white">
        {/* Address type */}
        <div>
          {lbl("Address Type")}
          <div className="flex gap-3 mt-1">
            {[
              { val: "home", label: "Home", Icon: IoHomeOutline },
              { val: "office", label: "Office", Icon: IoBriefcaseOutline },
            ].map(({ val, label, Icon }) => (
              <label
                key={val}
                className={[
                  "flex items-center gap-2 px-4 py-2 rounded-xl border cursor-pointer transition-all text-xs font-bold",
                  form.type === val
                    ? "border-emerald-800 bg-emerald-50 text-emerald-900 shadow-2xs"
                    : "border-slate-200 text-slate-500 hover:border-emerald-300",
                ].join(" ")}
              >
                <input
                  type="radio"
                  name="type"
                  value={val}
                  checked={form.type === val}
                  onChange={handle}
                  className="hidden"
                />
                <Icon className="text-sm" /> {label}
              </label>
            ))}
          </div>
        </div>

        {/* Name & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            {lbl("First Name *")}
            <InputField
              inputType="text"
              id="firstname"
              name="firstname"
              value={form.firstname}
              onChange={handle}
              className={inputCls}
              placeholder="e.g. Priya"
            />
          </div>
          <div>
            {lbl("Last Name")}
            <InputField
              inputType="text"
              id="lastname"
              name="lastname"
              value={form.lastname ?? ""}
              onChange={handle}
              className={inputCls}
              placeholder="e.g. Verma"
            />
          </div>
          <div>
            {lbl("Contact Phone")}
            <InputField
              inputType="text"
              id="phone"
              name="phone"
              value={form.phone ?? ""}
              onChange={handle}
              className={inputCls}
              placeholder="9990645231"
            />
          </div>
        </div>

        {/* Street & Landmark */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            {lbl("Street Address *")}
            <InputField
              inputType="text"
              id="street"
              name="street"
              value={form.street}
              onChange={handle}
              className={inputCls}
              placeholder="Flat / House No., Colony / Street"
            />
          </div>
          <div>
            {lbl("Landmark (Optional)")}
            <InputField
              inputType="text"
              id="landmark"
              name="landmark"
              value={form.landmark ?? ""}
              onChange={handle}
              className={inputCls}
              placeholder="Near Metro / Temple"
            />
          </div>
        </div>

        {/* City / State / Country / Zip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            {lbl("City *")}
            <InputField
              inputType="text"
              id="city"
              name="city"
              value={form.city}
              onChange={handle}
              className={inputCls}
              placeholder="Delhi"
            />
          </div>
          <div>
            {lbl("State *")}
            <SelectInput
              arrItem={[
                { optVal: "Delhi", optValName: "Delhi" },
                { optVal: "Maharashtra", optValName: "Maharashtra" },
                { optVal: "Haryana", optValName: "Haryana" },
                { optVal: "Uttar Pradesh", optValName: "Uttar Pradesh" },
                { optVal: "Karnataka", optValName: "Karnataka" },
                { optVal: "Gujarat", optValName: "Gujarat" },
              ]}
              name="state"
              id="state"
              value={form.state}
              onChange={handle}
              className={inputCls}
            />
          </div>
          <div>
            {lbl("Country *")}
            <SelectInput
              arrItem={[
                { optVal: "India", optValName: "India" },
              ]}
              name="country"
              id="country"
              value={form.country}
              onChange={handle}
              className={inputCls}
            />
          </div>
          <div>
            {lbl("Zip Code *")}
            <InputField
              inputType="text"
              id="zip_code"
              name="zip_code"
              value={form.zip_code}
              onChange={handle}
              className={inputCls}
              placeholder="110001"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => onSave(form)}
            disabled={isPending || !form.firstname || !form.street || !form.city || !form.zip_code}
            className="px-6 py-2.5 bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-emerald-900 transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
          >
            {isPending ? "Saving..." : "Save Address"}
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-2.5 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const ManageAddress = () => {
  const queryClient = useQueryClient();

  const { data: rawAddresses, isLoading } = useQuery({
    queryKey: ["address"],
    queryFn: async () => get("default", "user/address"),
    retry: 1,
  });

  const addresses: AddressType[] = Array.isArray(rawAddresses)
    ? rawAddresses
    : Array.isArray(rawAddresses?.addresses)
      ? rawAddresses.addresses
      : [];

  const deleteMutate = useMutation({
    mutationFn: (id: string) => del("default", `user/address/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
      setAlertData({
        message: "Address removed successfully",
        variant: "success",
        show: true,
      });
    },
    onError: (err: any) =>
      setAlertData({
        message: err?.response?.data?.message || "Unable to delete address",
        variant: "error",
        show: true,
      }),
  });

  const addMutation = useMutation({
    mutationFn: async (data: Omit<AddressType, "_id">) =>
      await post("default", "user/address", data, {
        headers: { "Content-Type": "application/json" },
      }),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
      setShowAddForm(false);
      setAlertData({
        message: data?.message || "Address saved successfully",
        variant: "success",
        show: true,
      });
    },
    onError: (err: any) =>
      setAlertData({
        message: err?.response?.data?.message || "Error saving address",
        variant: "error",
        show: true,
      }),
  });

  const editMutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Omit<AddressType, "_id">;
    }) =>
      await patch("default", `user/address/${id}`, data, {
        headers: { "Content-Type": "application/json" },
      }),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
      setEditId(null);
      setAlertData({
        message: data?.message || "Address updated successfully",
        variant: "success",
        show: true,
      });
    },
    onError: (err: any) =>
      setAlertData({
        message: err?.response?.data?.message || "Error updating address",
        variant: "error",
        show: true,
      }),
  });

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [alertData, setAlertData] = useState({
    message: "",
    variant: "" as "success" | "error",
    show: false,
  });

  function handleDelete(id: string) {
    deleteMutate.mutate(id);
  }

  return (
    <div className="mt-2">
      {alertData.show && (
        <Alert
          message={alertData.message}
          variant={alertData.variant}
          onDismiss={() => setAlertData((p) => ({ ...p, show: false }))}
        />
      )}

      {/* Page header */}
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-lg font-bold text-slate-900 font-heading">
            Saved Delivery Addresses
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {addresses.length} saved delivery destination{addresses.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Add button */}
        {!showAddForm && !editId && (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full flex items-center gap-3 border-2 border-dashed border-emerald-700/60 rounded-2xl px-5 py-4 text-emerald-800 font-bold text-xs hover:bg-emerald-50/60 transition-colors group cursor-pointer"
          >
            <span className="w-8 h-8 rounded-full border-2 border-emerald-700 flex items-center justify-center group-hover:bg-emerald-800 group-hover:text-white transition-all shadow-2xs">
              <IoAddOutline className="text-lg" />
            </span>
            <span>+ ADD NEW DELIVERY ADDRESS</span>
          </button>
        )}

        {/* Add form */}
        {showAddForm && (
          <AddressForm
            onSave={(data) => addMutation.mutate(data)}
            onCancel={() => setShowAddForm(false)}
            isPending={addMutation.isPending}
          />
        )}

        {/* Cards list */}
        {addresses.map((addr: AddressType) =>
          editId === addr._id ? (
            <AddressForm
              key={addr._id}
              isEditing
              initial={{
                firstname: addr.firstname,
                lastname: addr.lastname,
                phone: addr.phone,
                company_name: addr.company_name,
                street: addr.street,
                city: addr.city,
                state: addr.state,
                country: addr.country,
                landmark: addr.landmark,
                zip_code: addr.zip_code,
                type: addr.type,
              }}
              onSave={(data) =>
                editMutation.mutate({ id: addr._id!, data })
              }
              onCancel={() => setEditId(null)}
              isPending={editMutation.isPending}
            />
          ) : (
            <AddressCard
              key={addr._id}
              address={addr}
              selected={selectedId === addr._id}
              onSelect={() => setSelectedId(addr._id ?? null)}
              onEdit={() => {
                setEditId(addr._id ?? null);
                setShowAddForm(false);
              }}
              onDelete={() => handleDelete(addr._id ?? "")}
              onPrint={() => printAddress(addr)}
            />
          ),
        )}

        {/* Empty state */}
        {!isLoading && addresses.length === 0 && !showAddForm && (
          <div className="text-center py-12 bg-slate-50/50 rounded-2xl border border-slate-100">
            <IoLocationOutline className="text-5xl mx-auto mb-2 text-slate-300" />
            <p className="text-sm font-bold text-slate-700">
              No saved addresses yet
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Add your delivery address for 1-click organic checkout.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAddress;