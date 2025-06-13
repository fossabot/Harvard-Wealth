import { Link, useLocation } from "wouter";
import { User, X } from "lucide-react";
import { 
  PlatformIcon, 
  DataIcon, 
  ProcessIcon, 
  AgentIcon, 
  ExpertIcon, 
  ModelIcon,
  WealthIcon 
} from "@/components/icons/PlatformIcon";
import invisiblePlatformLogo from "@/assets/invisible-platform-logo.svg";

const navigationItems = [
  { path: "/platform", label: "Platform", icon: PlatformIcon },
  { path: "/wealth-management", label: "Harvard Demo", icon: WealthIcon, highlight: true },
  { path: "/data-environment", label: "Data Environment", icon: DataIcon },
  { path: "/process-builder", label: "Process Builder", icon: ProcessIcon },
  { path: "/agentic-engine", label: "Agentic Engine", icon: AgentIcon },
  { path: "/expert-marketplace", label: "Expert Marketplace", icon: ExpertIcon },
  { path: "/model-evaluations", label: "Model Evaluations", icon: ModelIcon },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [location] = useLocation();

  const isActive = (path: string) => {
    if (path === "/platform" && (location === "/" || location === "/platform")) {
      return true;
    }
    return location === path;
  };

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <aside className={`fixed lg:hidden inset-y-0 left-0 z-50 w-72 bg-sidebar text-sidebar-foreground transform transition-transform duration-300 ease-in-out ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <div className="flex items-center">
            <img 
              src={invisiblePlatformLogo} 
              alt="Invisible Platform Logo" 
              className="h-8"
            />
          </div>
          {/* Mobile Close Button */}
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 sidebar-scroll overflow-y-auto">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link href={item.path} 
                    onClick={handleLinkClick}
                    className={`flex items-center px-3 py-2.5 rounded-lg nav-item-hover ${
                      isActive(item.path) 
                        ? 'active-nav' 
                        : 'text-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        {/* Sidebar Footer */}
        <div className="px-4 py-4 border-t border-gray-800">
          <div className="flex items-center space-x-3 px-3 py-2">
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">John Doe</p>
              <p className="text-xs text-gray-400 truncate">admin@invisible.ai</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
