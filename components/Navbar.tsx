import { ThemeSwitcher } from "./ThemeSwitcher";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-3">
      <h1 className="text-lg font-bold text-neutral-800 dark:text-neutral-100">
        This is Navbar
      </h1>
      <div>
        <ThemeSwitcher />
      </div>
    </nav>
  );
}
