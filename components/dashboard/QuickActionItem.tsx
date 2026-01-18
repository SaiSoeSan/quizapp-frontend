import Link from "next/link";
import { QuickAction } from "@/types/dashboard";

interface QuickActionItemProps {
  action: QuickAction;
}
const QuickActionItem = ({ action }: QuickActionItemProps) => {
  return (
    <Link
      href={action.href}
      className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <div
        className={`w-10 h-10 bg-${action.color}-100 rounded-lg flex items-center justify-center mr-3`}
      >
        <span className={`text-${action.color}-600`}>{action.icon}</span>
      </div>
      <span className="text-gray-700">{action.label}</span>
    </Link>
  );
};

export default QuickActionItem;
