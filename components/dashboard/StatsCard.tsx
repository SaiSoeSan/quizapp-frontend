import Link from "next/link";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  href: string;
  linkText: string;
  color: "blue" | "green" | "purple" | "orange" | "red" | "pink";
}

const colorClasses = {
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600",
  },
  orange: {
    bg: "bg-orange-100",
    text: "text-orange-600",
  },
  red: {
    bg: "bg-red-100",
    text: "text-red-600",
  },
  pink: {
    bg: "bg-pink-100",
    text: "text-pink-600",
  },
};

const StatsCard = ({
  title,
  value,
  icon,
  href,
  linkText,
  color,
}: StatsCardProps) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow ${colorClasses[color].bg}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
        <div
          className={`w-12 h-12 ${colorClasses[color].bg} rounded-lg flex items-center justify-center`}
        >
          <span className={colorClasses[color].text}>{icon}</span>
        </div>
      </div>
      <div className="mt-4">
        <Link href={href} className="text-blue-600 text-sm hover:underline">
          {linkText}
        </Link>
      </div>
    </div>
  );
};

export default StatsCard;
