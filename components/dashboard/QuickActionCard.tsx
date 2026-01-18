import { QuickAction } from "@/types/dashboard";
import Link from "next/link";
import QuickActionItem from "./QuickActionItem";

interface QuickActionCardProps {
  title: string;
  actions?: QuickAction[];
}

const QuickActionCard = ({ title, actions }: QuickActionCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
      <div className="space-y-3">
        {actions?.map((action) => (
          <QuickActionItem key={action.href} action={action} />
        ))}
      </div>
    </div>
  );
};

export default QuickActionCard;
