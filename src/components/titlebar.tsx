import { Link } from "react-router-dom";

export default function Titlebar() {
  return (
    <nav className="app-region-drag h-5 items-center px-2 flex flex-shrink-0 text-xs font-thin border-b border-dark-400 dark:bg-dark-700">
      <menu className="flex flex-grow gap-2 uppercase">
        <li className="brand-text-sm">CS:CO</li>
        <Item title="Lineups" route="lineups" />
        <Item title="Console" route="console" />
      </menu>
    </nav>
  );
}

function Item({
  title,
  route,
  className,
}: {
  title: string;
  route?: string;
  className?: string;
}) {
  return (
    <li className={className}>
      <Link to={route ?? "/"}>{title}</Link>
    </li>
  );
}
