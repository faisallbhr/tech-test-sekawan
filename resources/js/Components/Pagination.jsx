import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
  return (
    <nav className="text-center border-collapse space-x-1 md:space-x-0">
      {links.map((link) =>
        link.url ? (
          <Link
            preserveScroll
            href={link.url}
            key={link.label}
            className={
              "inline-block py-2 px-3 border border-gray-300 text-gray-800 text-xs font-medium rounded-sm " +
              (link.active ? "bg-primary text-white " : " ") +
              (!link.url
                ? "!text-gray-500 cursor-not-allowed "
                : "hover:bg-primary hover:text-white") +
              (link.label !== "&laquo; Previous" &&
              link.label !== "Next &raquo;"
                ? " hidden md:inline-block"
                : "")
            }
            dangerouslySetInnerHTML={{ __html: link.label }}
          ></Link>
        ) : (
          <span
            key={link.label}
            className={
              "inline-block py-2 px-3 border border-gray-300 text-gray-500 text-xs font-medium rounded-sm cursor-not-allowed"
            }
            dangerouslySetInnerHTML={{ __html: link.label }}
          ></span>
        )
      )}
    </nav>
  );
}
