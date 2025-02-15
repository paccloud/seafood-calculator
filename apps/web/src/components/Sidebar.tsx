import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Sidebar component for navigation
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 */
interface SidebarProps extends React.HTMLAttributes<HTMLElement> {}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, ...props }, ref) => {
    return (
      <aside
        className={cn(
          "flex flex-col w-64 border-r bg-secondary text-secondary-foreground",
          className
        )}
        ref={ref}
        {...props}
      >
        <div className="p-4">
          <h4 className="mb-4 font-semibold uppercase">
            Navigation
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:underline">
                Calculator
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                History
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Settings
              </a>
            </li>
          </ul>
        </div>
      </aside>
    )
  }
)
Sidebar.displayName = "Sidebar"

export { Sidebar }