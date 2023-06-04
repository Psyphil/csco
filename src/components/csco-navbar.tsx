import React from "react";

export default function CSCONavbar(props: {
  children?: React.ReactNode;
  className?: string;
  onToggled?: (open: boolean) => void;
  noCollapse?: true;
}) {
  const navRef = React.useRef<HTMLElement>(null);
  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onToggled) {
      props.onToggled(
        event.currentTarget.hasAttribute("data-te-collapse-collapsed")
      );
    }
  };
  const leftChildren: React.ReactNode[] = [];
  const rightChildren: React.ReactNode[] = [];
  if (props.children) {
    // const isSticky = (element:React.ReactNode) => {
    // return element.
    // }

    React.Children.forEach<any>(props.children, (child) => {
      if (Object.hasOwn(child, "props") && child.props["data-sticky"]) {
        rightChildren.push(child);
      } else {
        leftChildren.push(child);
      }
    });
  }

  const sizeClassNames = {
    nav: props.noCollapse ? "justify-center" : "md:justify-center",
    container: props.noCollapse ? "" : "max-md:w-full",
    button: props.noCollapse ? "hidden" : "md:hidden",
    leftChildren: props.noCollapse
      ? "gap-1 flex-row justify-center mt-0 !flex basis-auto"
      : "max-md:absolute max-md:rounded-b max-md:dark:bg-dark md:gap-1 md:flex-row md:justify-center md:mt-0 md:!flex md:basis-auto",
    rightChildren: props.noCollapse ? "" : "max-md:absolute max-md:right-0",
  };

  return (
    <nav
      className={`relative flex w-full flex-nowrap items-center justify-between shadow-lg border-dark-300 dark:bg-dark ${sizeClassNames.nav}`}
      data-te-navbar-ref
      ref={navRef}
    >
      <div
        className={`flex flex-wrap items-center justify-between px-3 relative ${sizeClassNames.container}`}
      >
        <button
          className={`block border-0 bg-transparent px-2 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 ${sizeClassNames.button}`}
          type="button"
          data-te-collapse-init
          data-te-target="#navbarSupportedContent3"
          aria-controls="navbarSupportedContent3"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={handleToggle}
        >
          <span className="[&>svg]:w-7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-7 w-7"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
        {leftChildren.length > 0 && (
          <div
            className={`!visible top-full left-0 right-0 z-10 hidden flex-grow items-center grid text-xs p-2 gap-2 ${sizeClassNames.leftChildren}`}
            id="navbarSupportedContent3"
            data-te-collapse-item
          >
            {leftChildren}
          </div>
        )}
      </div>
      {rightChildren.length > 0 && (
        <div
          className={`relative flex items-center text-xs p-2 gap-2 ${sizeClassNames.rightChildren}`}
        >
          {rightChildren}
        </div>
      )}
    </nav>
  );
}
