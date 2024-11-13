import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, Link } from "@inertiajs/react";
import { useState } from "react";
import { useForm } from "@inertiajs/react";

export default function Show({ auth, reservation: { data: reservation } }) {
  const { data, setData, post, put, processing } = useForm({
    distance: "",
    fuel_usage: "",
    reservation_id: reservation.id,
  });

  const [showModal, setShowModal] = useState(false);

  const handleReturnStatusChange = (e) => {
    if (e.target.value === "true" && !reservation.is_returned) {
      if (
        confirm(
          "Apakah Anda yakin kendaraan sudah dikembalikan? Perubahan ini tidak dapat dibatalkan."
        )
      ) {
        setShowModal(true);
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("vehicle_usages.store"), {
      onSuccess: () => {
        setShowModal(false);
        router.put(route("reservations.update", reservation.id), {
          is_returned: true,
        });
      },
      onError: (errors) => {
        console.error("Error storing vehicle usage:", errors);
        alert("Terjadi kesalahan saat menyimpan data penggunaan kendaraan.");
      },
    });
  };
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Detail reservasi" />
      <div className="rounded-sm border border-stroke bg-white px-5 py-6 shadow-default sm:px-7">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-black font-bold">Peminjam:</h3>
          <span className="text-black">{reservation.requester}</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-black font-bold">Kendaraan:</h3>
          <span className="text-black">{reservation.vehicle.name}</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-black font-bold">Driver:</h3>
          <span className="text-black">{reservation.driver}</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-black font-bold">Tanggal:</h3>
          <span className="text-black">
            {reservation.start_date} - {reservation.end_date}
          </span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-black font-bold">Status peminjaman:</h3>
          <span
            className={`${
              reservation.status === "approved"
                ? "bg-success"
                : reservation.status === "pending"
                ? "bg-warning"
                : "bg-danger"
            } rounded-full bg-opacity-80 py-1 px-3 text-xs font-medium uppercase text-white`}
          >
            {reservation.status}
          </span>
        </div>
        {reservation.status == "approved" && (
          <div className="flex items-center gap-2">
            <h3 className="text-black font-bold">Status pengembalian:</h3>
            {reservation.is_returned ? (
              <span className="text-black">Sudah dikembalikan</span>
            ) : (
              <select
                value="false"
                onChange={handleReturnStatusChange}
                className="text-black border border-gray-300 rounded px-2 py-1"
              >
                <option value="false">Belum dikembalikan</option>
                <option value="true">Sudah dikembalikan</option>
              </select>
            )}
          </div>
        )}

        <div className="flex justify-end">
          <button className="mt-4 px-4 py-2 bg-gray-500 hover:bg-opacity-90 duration-150 text-white rounded">
            <Link href={route("reservations.index")}>Kembali</Link>
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-lg font-bold mb-4 text-black">
              Isi Data Penggunaan Kendaraan
            </h2>
            <form onSubmit={onSubmit} className="block space-y-4">
              <div>
                <label htmlFor="distance" className="block mb-2 text-black">
                  Jarak tempuh (km):
                </label>
                <input
                  type="number"
                  id="distance"
                  name="distance"
                  value={data.distance}
                  onChange={(e) => setData("distance", e.target.value)}
                  placeholder="124.8"
                  className="w-full rounded-md border border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary"
                />
              </div>
              <div>
                <label htmlFor="fuel_usage" className="block mb-2 text-black">
                  BBM yang digunakan (liter):
                </label>
                <input
                  type="number"
                  id="fuel_usage"
                  name="fuel_usage"
                  value={data.fuel_usage}
                  onChange={(e) => setData("fuel_usage", e.target.value)}
                  placeholder="7.3"
                  className="w-full rounded-md border border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary"
                />
              </div>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Batal
                </button>
                <button
                  disabled={processing}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AuthenticatedLayout>
  );
}
