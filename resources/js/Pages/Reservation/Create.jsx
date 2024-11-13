import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import { FiPlus, FiMinus } from "react-icons/fi";

export default function Create({ auth, vehicles, users, maxApprovers }) {
  const { data, setData, post, errors } = useForm({
    requester: "",
    vehicle_id: "",
    driver: "",
    start_date: "",
    end_date: "",
    approvers: [{ id: "" }, { id: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleApproverChange = (index, value) => {
    const updatedApprovers = [...data.approvers];
    updatedApprovers[index].id = value;
    setData("approvers", updatedApprovers);
  };

  const addApprover = () => {
    if (data.approvers.length < maxApprovers) {
      setData("approvers", [...data.approvers, { id: "" }]);
    }
  };

  const removeApprover = (index) => {
    const updatedApprovers = [...data.approvers];
    updatedApprovers.splice(index, 1);
    setData("approvers", updatedApprovers);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("reservations.store"));
  };
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Tambah Reservasi" />
      <div className="rounded-sm border border-stroke bg-white px-5 py-6 shadow-default sm:px-7">
        <form onSubmit={onSubmit} className="block space-y-4">
          <div>
            <label htmlFor="requester" className="mb-2 block text-black">
              Nama peminjam
            </label>
            <input
              type="text"
              id="requester"
              name="requester"
              value={data.requester}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full rounded-md border border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary"
            />
            <InputError message={errors.requester} className="mt-1" />
          </div>
          <div>
            <label htmlFor="vehicle_id" className="mb-2 block text-black">
              Kendaraan
            </label>
            <select
              id="vehicle_id"
              name="vehicle_id"
              value={data.vehicle_id}
              onChange={handleChange}
              className="w-full rounded-md border border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary"
            >
              <option value="" disabled>
                Pilih Kendaraan
              </option>
              {vehicles.data.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.name}{" "}
                </option>
              ))}
            </select>
            <InputError message={errors.vehicle_id} className="mt-1" />
          </div>
          <div>
            <label htmlFor="driver" className="mb-2 block text-black">
              Nama driver
            </label>
            <input
              type="text"
              id="driver"
              name="driver"
              value={data.driver}
              onChange={handleChange}
              placeholder="John Cena"
              className="w-full rounded-md border border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary"
            />
            <InputError message={errors.driver} className="mt-1" />
          </div>
          <div>
            <label htmlFor="start_date" className="mb-2 block text-black">
              Tanggal mulai
            </label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              value={data.start_date}
              onChange={handleChange}
              className="w-full rounded-md border border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary"
            />
            <InputError message={errors.start_date} className="mt-1" />
          </div>
          <div>
            <label htmlFor="end_date" className="mb-2 block text-black">
              Tanggal berakhir
            </label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              value={data.end_date}
              onChange={handleChange}
              className="w-full rounded-md border border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary"
            />
            <InputError message={errors.end_date} className="mt-1" />
          </div>
          <div>
            <label className="mb-2 block text-black">Level persetujuan</label>
            {data.approvers.map((approver, index) => (
              <div key={index} className="mb-2 flex items-center">
                <select
                  name={`approver_${index}`}
                  value={approver.id || ""}
                  onChange={(e) => handleApproverChange(index, e.target.value)}
                  className="w-full rounded-md border border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary"
                >
                  <option value="" disabled>
                    Level {index + 1}
                  </option>
                  {users.data.map((user) => (
                    <option
                      key={user.id}
                      value={user.id}
                      disabled={data.approvers.some(
                        (a, i) => a.id == user.id && i !== index
                      )}
                    >
                      {user.name}
                    </option>
                  ))}
                </select>

                <div className="flex justify-center items-center">
                  {index >= 2 && (
                    <button
                      type="button"
                      onClick={() => removeApprover(index)}
                      className="w-8 h-8 ml-2 flex items-center justify-center rounded-full bg-red-500 hover:bg-opacity-90 duration-150 text-white"
                    >
                      <FiMinus />
                    </button>
                  )}

                  {index === data.approvers.length - 1 &&
                    data.approvers.length < maxApprovers && (
                      <button
                        type="button"
                        onClick={addApprover}
                        className="w-8 h-8 ml-2 flex items-center justify-center rounded-full bg-yellow-500 hover:bg-opacity-90 duration-150 text-white"
                      >
                        <FiPlus />
                      </button>
                    )}
                </div>

                <InputError
                  message={errors[`approvers.${index}.id`] || ""}
                  className="mt-1"
                />
              </div>
            ))}

            {data.approvers.length == maxApprovers && (
              <div className="mt-2 text-red-500">
                Telah mencapai batas approver.
              </div>
            )}
          </div>
          <div className="flex gap-2 justify-end">
            <Link
              href={route("reservations.index")}
              className="px-4 py-2 bg-gray-500 hover:bg-opacity-90 duration-150 text-white rounded"
            >
              Kembali
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-primary hover:bg-opacity-90 duration-150 text-white rounded"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
