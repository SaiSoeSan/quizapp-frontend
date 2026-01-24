import Link from "next/link";

interface DashboardHeaderProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  backLink?: {
    href: string;
    text: string;
  };
}

const DashboardHeader = ({
  title,
  description,
  children,
  backLink,
}: DashboardHeaderProps) => {
  return (
    <div className="mb-8">
      {backLink && (
        <Link
          href={backLink.href}
          className="inline-flex items-center text-sm text-gray-600 hover:text-red-600 mb-4"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {backLink.text}
        </Link>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
        {children && <div className="mt-4 sm:mt-0">{children}</div>}
      </div>
    </div>
  );
};

export default DashboardHeader;
