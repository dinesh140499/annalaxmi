import React, { useEffect, useState, type ChangeEvent } from "react";
import InputField from "../../reusable/InputField";
import SelectInput from "../../reusable/SelectInput";
import Alert from "../../common/Alert";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, post, put, del } from "../../../baseUrl"; // ✅ FIX 1: import `put`
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
  lastname: string;
  phone: string;
  company_name: string;
  street: string;
  country: string;
  states: string;
  zip_code: string;
  landmark: string;
  type: "home" | "office" | "other";
};


function printAddress(addr: AddressType) {
  const html = `<!DOCTYPE html><html><head><title>Address</title>
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
      ${addr.states}, ${addr.country} – ${addr.zip_code}
    </div>
    <hr class="divider"/>
    <div class="logo">Anna Laxmi</div>
  </div></body></html>`;
  // ✅ FIX 3: Was `${addr.country}, ${addr.country}` — corrected to `${addr.states}, ${addr.country}`

  const win = window.open("", "_blank", "width=480,height=360");
  if (!win) return;
  win.document.write(html);
  win.document.close();
  win.focus();
  win.print();
}

// ─── Empty form ───────────────────────────────────────────────────────────────

const emptyForm = (): Omit<AddressType, "_id"> => ({
  firstname: "",
  lastname: "",
  company_name: "",
  street: "",
  country: "",
  states: "",
  landmark: "",
  zip_code: "",
  type: "home",
  phone: "",
});

// ─── Address Card ─────────────────────────────────────────────────────────────

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
      "relative border rounded-xl p-4 cursor-pointer transition-all duration-200",
      selected
        ? "border-[#00603A] bg-[#f0f7f2] shadow-sm"
        : "border-[#e0e0e0] bg-white hover:border-[#00603A] hover:shadow-sm",
    ].join(" ")}
  >
    {/* Type + radio */}
    <div className="flex items-center gap-2 mb-3">
      <span className="text-[#00603A] text-lg">
        {selected ? (
          <IoCheckmarkCircle />
        ) : (
          <IoRadioButtonOff className="text-[#999]" />
        )}
      </span>
      <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-[#555]">
        {TYPE_ICON[address.type] ?? <IoLocationOutline />}
        {address.type}
      </span>
    </div>

    {/* Details */}
    <p className="text-[14px] font-semibold text-[#212121]">
      {address.firstname} {address.lastname}
    </p>
    {address.company_name && (
      <p className="text-[12px] text-[#888] mt-0.5">{address.company_name}</p>
    )}
    <p className="text-[13px] text-[#555] mt-1 leading-relaxed">
      {address.street}
      <br />
      {address.states}, {address.country} – {address.zip_code}
    </p>

    {/* Actions */}
    <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[#efefef]">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
        className="flex items-center gap-1 text-[12px] font-semibold text-[#00603A] hover:text-[#004d2e] transition-colors"
      >
        <IoCreateOutline className="text-base" /> EDIT
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="flex items-center gap-1 text-[12px] font-semibold text-[#c0392b] hover:text-[#922b21] transition-colors"
      >
        <IoTrashOutline className="text-base" /> REMOVE
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrint();
        }}
        className="flex items-center gap-1 text-[12px] font-semibold text-[#555] hover:text-[#212121] transition-colors"
      >
        <IoPrintOutline className="text-base" /> PRINT
      </button>
    </div>
  </div>
);

// ─── Add / Edit Form ──────────────────────────────────────────────────────────

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
    <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#888] mb-1">
      {text}
    </label>
  );

  const inputCls =
    "py-2 w-full text-sm border border-[#d9d9d9] rounded focus:border-[#00603A] outline-none px-3 transition-colors capitalize";

  return (
    <div className="border border-[#00603A] rounded-xl overflow-hidden">
      <div className="bg-[#00603A] px-5 py-3">
        <h3 className="text-white font-semibold text-[14px] uppercase tracking-wide">
          {isEditing ? "Edit Address" : "Add New Address"}
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
                  "flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all text-[13px] font-semibold",
                  form.type === val
                    ? "border-[#00603A] bg-[#f0f7f2] text-[#00603A]"
                    : "border-[#d9d9d9] text-[#888] hover:border-[#00603A]",
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
                <Icon className="text-base" /> {label}
              </label>
            ))}
          </div>
        </div>

        {/* Name row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            {lbl("First Name")}
            <InputField
              inputType="text"
              id="firstname"
              name="firstname"
              value={form.firstname}
              onChange={handle}
              className={inputCls}
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
            />
          </div>
          <div>
            {lbl("Company Name")}
            <InputField
              inputType="text"
              id="company_name"
              name="company_name"
              value={form.company_name}
              onChange={handle}
              className={inputCls}
            />
          </div>
        </div>

        {/* Street */}
        <div>
          {lbl("Street Address")}
          <InputField
            inputType="text"
            id="street"
            name="street"
            value={form.street}
            onChange={handle}
            className={inputCls}
          />
        </div>

        {/* Country / State / Zip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            {lbl("Country / Region")}
            <SelectInput
              arrItem={[
                { optVal: "India", optValName: "India" },
                { optVal: "US", optValName: "US" },
              ]}
              name="country"
              id="country"
              value={form.country}
              onChange={handle}
              className={inputCls}
            />
          </div>
          <div>
            {lbl("State")}
            <SelectInput
              arrItem={[
                { optVal: "Delhi", optValName: "Delhi" },
                { optVal: "Mumbai", optValName: "Mumbai" },
                { optVal: "Haryana", optValName: "Haryana" },
                { optVal: "Gujarat", optValName: "Gujarat" },
              ]}
              name="states"
              id="states"
              value={form.states}
              onChange={handle}
              className={inputCls}
            />
          </div>
          <div>
            {lbl("Zip Code")}
            <InputField
              inputType="text"
              id="zip_code"
              name="zip_code"
              value={form.zip_code}
              onChange={handle}
              className={inputCls}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-1">
          <button
            onClick={() => onSave(form)}
            disabled={isPending}
            className="px-6 py-2 bg-[#00603A] text-white text-[13px] font-bold uppercase tracking-wide rounded-lg hover:bg-[#004d2e] transition-colors shadow-sm disabled:opacity-50"
          >
            {isPending ? "Saving..." : "Save Address"}
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-2 border border-[#d9d9d9] text-[#555] text-[13px] font-semibold uppercase tracking-wide rounded-lg hover:border-[#999] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const ManageAddress = () => {
  // ✅ FIX 4: `useQueryClient()` now correctly called inside the component
  const queryClient = useQueryClient();

  const { data: rawAddresses, isLoading } = useQuery({
    queryKey: ["address"],
    queryFn: async () => get("default", "/user/address"),
  });

  // ✅ FIX: API may return { addresses: [] } or [] — normalise to always be an array
  const reduxAddresses: AddressType[] = Array.isArray(rawAddresses)
    ? rawAddresses
    : Array.isArray(rawAddresses?.addresses)
      ? rawAddresses.addresses
      : [];

  const deleteMutate = useMutation({
    mutationFn: (id: string) => del("default", `/user/address/${id}`),
    onSuccess: () => {
      // ✅ FIX 5: Invalidate query so list refreshes after delete
      queryClient.invalidateQueries({ queryKey: ["address"] });
      setAlertData({
        message: "Address deleted successfully",
        variant: "success",
        show: true,
      });
    },
    onError: (err: any) =>
      setAlertData({
        message: err?.response?.data?.message || "Something went wrong",
        variant: "error",
        show: true,
      }),
  });

  // ✅ FIX 6: Separate add vs edit mutations so edits use PUT with the address ID
  const addMutation = useMutation({
    mutationFn: async (data: Omit<AddressType, "_id">) =>
      await post("default", "/user/address", data, {
        headers: { "Content-Type": "application/json" },
      }),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
      setShowAddForm(false);
      setAlertData({
        message: data?.message || "Address added successfully",
        variant: "success",
        show: true,
      });
    },
    onError: (err: any) =>
      setAlertData({
        message: err?.response?.data?.message || "Something went wrong",
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
      await put("default", `/user/address/${id}`, data, {
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
        message: err?.response?.data?.message || "Something went wrong",
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

  useEffect(() => {
    console.log(reduxAddresses);
  }, [reduxAddresses]);

  function handleDelete(id: string) {
    deleteMutate.mutate(id);
  }

  return (
    <div className="mt-5 font-sans">
      {alertData.show && (
        <Alert
          message={alertData.message}
          variant={alertData.variant}
          onDismiss={() => setAlertData((p) => ({ ...p, show: false }))}
        />
      )}

      {/* Page header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[18px] font-bold text-[#212121]">
            Manage Addresses
          </h2>
          <p className="text-[12px] text-[#888] mt-0.5">
            {reduxAddresses?.length || 0} saved address
            {(reduxAddresses?.length || 0) !== 1 ? "es" : ""}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {/* Add button */}
        {!showAddForm && !editId && (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full flex items-center gap-3 border-2 border-dashed border-[#00603A] rounded-xl px-4 py-3.5 text-[#00603A] font-semibold text-[13px] hover:bg-[#f0f7f2] transition-colors group"
          >
            <span className="w-7 h-7 rounded-full border-2 border-[#00603A] flex items-center justify-center group-hover:bg-[#00603A] group-hover:text-white transition-all">
              <IoAddOutline className="text-base" />
            </span>
            ADD A NEW ADDRESS
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

        {/* Cards from user.addresses */}
        {reduxAddresses?.map((addr: any) =>
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
                country: addr.country,
                states: addr.states,
                landmark: addr.landmark,
                zip_code: addr.zip_code,
                type: addr.type,
              }}
              onSave={(data) =>
                // ✅ FIX 6 (cont.): Edit uses PUT via editMutation
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
        {!isLoading &&
          (!reduxAddresses || reduxAddresses.length === 0) &&
          !showAddForm && (
            <div className="text-center py-12">
              <IoLocationOutline className="text-5xl mx-auto mb-3 text-[#ddd]" />
              <p className="text-[14px] font-medium text-[#bbb]">
                No saved addresses yet
              </p>
              <p className="text-[12px] mt-1 text-[#ccc]">
                Add an address to get started
              </p>
            </div>
          )}
      </div>
    </div>
  );
};

export default ManageAddress;