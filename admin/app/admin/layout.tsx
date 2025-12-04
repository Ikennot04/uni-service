import type { Metadata } from "next";
import { LuChartColumnBig } from "react-icons/lu";

// Icons
import { MdOutlineArrowForwardIos } from "react-icons/md";

export const metadata: Metadata = {
  title: "Uni Service Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <MdOutlineArrowForwardIos className="font-semibold" />
          </label>
          <div className="px-4 font-semibold">Uni Service</div>
        </nav>

        {/* Page content here */}
        <div className="p-4">{children}</div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li className="mb-2">
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Dashboard"
              >
                {/* Dashboard Icon */}
                <LuChartColumnBig className="text-[1.35rem]" />
                <span className="is-drawer-close:hidden">Dashboard</span>
              </button>
            </li>


            
          </ul>
        </div>
      </div>
    </div>
  );
}
