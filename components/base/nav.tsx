import Link from "next/link";
import { useContext, useState } from "react";

import { GlobalContext } from "@/contexts/globalContext";

type PageLink = {
  href: string;
  label: string;
  onClick?: () => void;
  requireLogin?: boolean;
};

const Nav: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { user, setUser } = useContext(GlobalContext);

  const pageLinks: PageLink[] = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/game",
      label: "Game room",
      requireLogin: true,
    },
    {
      href: "/manage-character",
      label: "Manage character",
      requireLogin: true,
    },
    {
      href: "/",
      label: "Log out",
      requireLogin: true,
      onClick: () => setUser(""),
    },
  ];

  const handleClick = (pageLink: PageLink) => {
    if (pageLink.onClick) {
      pageLink.onClick();
    }
    setOpen(false);
  };

  return (
    <nav className="bg-white border-gray-200 border-b dark:bg-gray-900 dark:border-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            App
          </span>
        </Link>
        <button
          onClick={() => setOpen(!open)}
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path>
          </svg>
        </button>
        <div
          className={`${open ? "" : "hidden"} w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0">
            {pageLinks.map(
              (pageLink, index) =>
                (!pageLink.requireLogin || user) && (
                  <li key={`pagelinks-${index}`}>
                    <Link
                      href={pageLink.href}
                      onClick={() => handleClick(pageLink)}
                      className="block py-2 pl-3 pr-4 text-gray-900 border-t md:border-0 hover:text-blue-700 md:p-0 dark:text-white "
                    >
                      {pageLink.label}
                    </Link>
                  </li>
                )
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
