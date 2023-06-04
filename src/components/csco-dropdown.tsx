import React from "react";

export default function CSCODropdown(props: {
  anchor: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative mt-1" data-te-dropdown-ref>
      <button
        className="hidden-arrow mr-4 flex items-center text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
        // href="#"
        id="dropdownMenuButton1"
        // role="button"
        data-te-dropdown-toggle-ref
        aria-expanded="false"
      >
        {props.anchor}
      </button>
      <ul
        className="border border-dark-300 shadow-lg dark:bg-dark-300 absolute left-auto right-0 z-[1000] float-left m-0 mt-2 hidden min-w-max list-none overflow-hidden rounded border-none bg-light bg-clip-padding text-left text-base [&[data-te-dropdown-show]]:block"
        aria-labelledby="dropdownMenuButton1"
        data-te-dropdown-menu-ref
      >
        {/* <li>
          <a
            className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
            href="#"
            data-te-dropdown-item-ref
          >
            Action
          </a>
        </li> */}
        {React.Children.toArray(props.children).map((element, index) => {
          return (
            <li key={index} className="">
              {element}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
