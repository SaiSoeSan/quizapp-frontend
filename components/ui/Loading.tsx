interface LoadingProps {
  title: string;
}
const LoadingSpinner = ({ title }: LoadingProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-12 text-center">
      <div className="animate-spin w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full mx-auto mb-4"></div>
      <p className="text-gray-500">{title}</p>
    </div>
  );
};

export default LoadingSpinner;
