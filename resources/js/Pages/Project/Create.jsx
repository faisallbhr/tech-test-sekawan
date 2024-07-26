import InputError from "@/Components/InputError";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth }) {
  const { data, setData, post, errors } = useForm({
    name: "",
    budget: "",
    down_payment: "",
    due_date: "",
    status: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("projects.index"));
  };
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="New Project" />
      <div className="rounded-sm border border-stroke bg-white px-5 py-6 shadow-default sm:px-7">
        <form onSubmit={onSubmit} className="block space-y-4">
          <div>
            <label htmlFor="name" className="mb-2 block text-black">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Bussiness App"
              className="w-full rounded-md border border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary"
            />
            <InputError message={errors.name} className="mt-1" />
          </div>
          <div>
            <label htmlFor="budget" className="mb-2 block text-black">
              Budget
            </label>
            <input
              type="number"
              id="budget"
              name="budget"
              value={data.budget}
              onChange={handleChange}
              placeholder="10000000"
              className="w-full rounded-md border border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary"
            />
            <InputError message={errors.budget} className="mt-1" />
          </div>
          <div>
            <label htmlFor="down_payment" className="mb-2 block text-black">
              Down Payment
            </label>
            <input
              type="number"
              id="down_payment"
              name="down_payment"
              value={data.down_payment}
              onChange={handleChange}
              placeholder="5000000"
              className="w-full rounded-md border border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary"
            />
            <InputError message={errors.down_payment} className="mt-1" />
          </div>
          <div>
            <label htmlFor="due_date" className="mb-2 block text-black">
              Due Date
            </label>
            <input
              type="date"
              id="due_date"
              name="due_date"
              value={data.due_date}
              onChange={handleChange}
              className="w-full rounded-md border border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary"
            />
            <InputError message={errors.due_date} className="mt-1" />
          </div>
          <div>
            <label htmlFor="status" className="mb-2 block text-black">
              Status
            </label>
            <select
              name="status"
              id="status"
              value={data.status}
              onChange={handleChange}
              className="w-full rounded-md border border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In-Progress</option>
              <option value="done">Done</option>
            </select>
            <InputError message={errors.status} className="mt-1" />
          </div>
          <div>
            <label htmlFor="note" className="mb-2 block text-black">
              Note
            </label>
            <textarea
              id="note"
              name="note"
              value={data.note}
              onChange={handleChange}
              rows={4}
              placeholder="Important Note"
              className="w-full rounded-md border border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary"
            ></textarea>
            <InputError message={errors.note} className="mt-1" />
          </div>
          <div className="flex gap-2">
            <Link
              href={route("projects.index")}
              className="px-4 py-2 bg-gray-500 hover:bg-opacity-90 duration-150 text-white rounded"
            >
              Back
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-primary hover:bg-opacity-90 duration-150 text-white rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
