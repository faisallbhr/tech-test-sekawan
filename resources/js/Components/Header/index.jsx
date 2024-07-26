import { useContext } from "react";
import { AuthContext } from "@/Layouts/AuthenticatedLayout";

export default function Index({ sidebarOpen, setSidebarOpen }) {
  const user = useContext(AuthContext);
  return (
    <header className="sticky top-0 w-full bg-white drop-shadow-sm">
      <div className="flex flex-grow items-center justify-end lg:justify-end px-4 py-4 shadow md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* HAMBURGER START */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="block rounded-sm border border-stroke bg-white p-1.5 shadow-sm lg:hidden"
          >
            <span className="relative block h-[1.375rem] w-[1.375rem] cursor-pointer">
              <span className="absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out ${
                    !sidebarOpen && "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out ${
                    !sidebarOpen && "delay-400 !w-full"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out ${
                    !sidebarOpen && "!w-full delay-500"
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out ${
                    !sidebarOpen && "!h-0 !delay-[0]"
                  }`}
                ></span>
                <span
                  className={`delay-500 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out ${
                    !sidebarOpen && "!h-0 !delay-200"
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* HAMBURGER END */}
        </div>
        <div></div>
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black">
            {user.name}
          </span>
          <span className="block text-xs">{user.email}</span>
        </span>
      </div>
    </header>
  );
}
