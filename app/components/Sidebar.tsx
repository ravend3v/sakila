import { Transition } from "@headlessui/react";
import DropdownMenu from "./Dropdown";
import Link from "next/link";

const metadata = {
  title: 'Näyttelijät'
}
interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: Props) {
  return (
    <Transition
      show={isOpen}
      enter="transition-opacity duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed top-0 right-0 h-full w-64 bg-sakila-30 z-10 shadow-lg">
        <div className="p-3">
          <h3 className="text-gray-800 font-bold text-xl mb-3">Menu</h3>
          <ul className="mt-2">
            <li>
              <DropdownMenu />
            </li>
            <button>
              <Link href="/actors" className="block px-4 py-2 text-sakila-20 hover:bg-gray-200">Näyttelijät</Link>
            </button>
          </ul>
        </div>
        <button
          className="absolute top-3 right-3 text-sakila-20 hover:text-gray-600"
          onClick={onClose}
        >
          <svg
            className="h-6 w-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 8.586l4.95-4.95 1.414 1.414L11.414 10l4.95 4.95-1.414 1.414L10 11.414l-4.95 4.95-1.414-1.414L8.586 10 3.636 5.05l1.414-1.414L10 8.586z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </Transition>
  );
}