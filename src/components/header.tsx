import React from "react";

export default function Header(props: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={
        props.className +
        " py-0.5 flex-shrink-0 text-xl flex border-b border-dark-300 dark:bg-dark uppercase"
      }
    >
      {props.children}
    </header>
  );
}
