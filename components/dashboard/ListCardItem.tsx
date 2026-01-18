import { ListCardItemData } from "@/types/dashboard";

interface ListCardItemProps {
  showAvatar?: boolean;
  showBadge?: boolean;
  data: ListCardItemData;
}

const ListCardItem = ({
  data,
  showAvatar = false,
  showBadge = false,
}: ListCardItemProps) => {
  return (
    <div key={data.id} className="flex items-center">
      {showAvatar && (
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
          <span className="text-gray-600 font-medium">
            {data.title.charAt(0)}
          </span>
        </div>
      )}
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-800">{data.title}</p>
        <p className="text-xs text-gray-500">{data.subtitle}</p>
      </div>
      {showBadge && (
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            data.badgeText === "teacher"
              ? "bg-blue-100 text-blue-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {data.badgeText}
        </span>
      )}
    </div>
  );
};

export default ListCardItem;
