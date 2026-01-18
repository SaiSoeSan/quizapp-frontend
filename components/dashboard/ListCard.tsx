import Link from "next/link";
import ListCardItem from "./ListCardItem";
import { ListCardItemData } from "@/types/dashboard";

export interface ListCardProps {
  title: string;
  items: ListCardItemData[];
  viewAllHref?: string;
  viewAllText?: string;
  showAvatar?: boolean;
  showBadge?: boolean;
}

const ListCard = ({
  title,
  items,
  viewAllHref,
  viewAllText,
  showAvatar = false,
  showBadge = false,
}: ListCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <ListCardItem
            key={item.id}
            data={item}
            showAvatar={showAvatar}
            showBadge={showBadge}
          />
        ))}
      </div>
      <Link
        href={viewAllHref || "#"}
        className="block mt-4 text-center text-sm text-red-600 hover:underline"
      >
        {viewAllText}
      </Link>
    </div>
  );
};

export default ListCard;
