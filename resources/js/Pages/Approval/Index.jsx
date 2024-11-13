import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";

export default function Index({ auth, approvals }) {
  const handleStatusChange = (approvalId, newStatus) => {
    router.put(route("approvals.update", approvalId), { status: newStatus });
  };
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Persetujuan" />
      <div className="rounded-sm border border-stroke bg-white px-5 py-6 shadow-default sm:px-7">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left">
                <th className="min-w-[40px] py-4 px-4 font-medium text-black">
                  #
                </th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black">
                  Peminjam
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black text-center">
                  Kendaraan
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black text-center">
                  Driver
                </th>
                <th className="min-w-[140px] py-4 px-4 font-medium text-black text-center">
                  Tanggal
                </th>
                <th className="py-4 px-4 font-medium text-black text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {approvals.data.map((approval, index) => (
                <tr key={approval.id}>
                  <td className="border-b border-[#eee] py-5 px-4 text-black">
                    {(approvals.meta.current_page - 1) *
                      approvals.meta.per_page +
                      index +
                      1}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4">
                    <h5 className="font-medium text-black">
                      {approval.reservation.requester}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 text-black text-center">
                    {approval.reservation.vehicle.name}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 text-black text-center">
                    {approval.reservation.driver}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 text-black text-center text-sm">
                    {approval.reservation.start_date} -{" "}
                    {approval.reservation.end_date}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 text-center">
                    {approval.status === "pending" ? (
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() =>
                            handleStatusChange(approval.id, "rejected")
                          }
                          className="rounded-full bg-opacity-10 hover:bg-opacity-80 hover:text-white duration-150 py-1 px-3 text-xs font-medium uppercase bg-danger text-danger"
                        >
                          REJECT
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(approval.id, "approved")
                          }
                          className="rounded-full bg-opacity-10 hover:bg-opacity-80 hover:text-white duration-150 py-1 px-3 text-xs font-medium uppercase bg-success text-success"
                        >
                          APPROVE
                        </button>
                      </div>
                    ) : (
                      <div
                        className={`rounded-full bg-opacity-10 py-1 px-3 text-xs font-medium uppercase ${
                          approval.status === "approved"
                            ? "bg-success text-success"
                            : "bg-danger text-danger"
                        }`}
                      >
                        {approval.status}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 md:mt-8 flex justify-center md:justify-end">
          <Pagination links={approvals.meta.links} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
