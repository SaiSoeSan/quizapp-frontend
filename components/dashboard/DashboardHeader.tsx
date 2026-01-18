interface DashboardHeaderProps {
  title: string;
  description: string;
  userName?: string;
}

const DashboardHeader = ({
  title,
  description,
  userName,
}: DashboardHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      <p className="text-gray-600 mt-1">{description}</p>
      {userName && (
        <p className="text-gray-500 mt-1">Welcome back, {userName}!</p>
      )}
    </div>
  );
};

export default DashboardHeader;
