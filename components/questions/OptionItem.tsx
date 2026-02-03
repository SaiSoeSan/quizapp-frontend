import { QuestionOption } from "@/types/question";

interface OptionItemProps {
  option: QuestionOption;
  index: number;
}

const OptionItem = ({ option, index }: OptionItemProps) => {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg border ${
        option.isCorrect
          ? "border-green-300 bg-green-50"
          : "border-gray-200 bg-gray-50"
      }`}
    >
      <span className="flex-shrink-0 w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center text-xs text-gray-600">
        {String.fromCharCode(65 + index)}
      </span>
      <span
        className={`flex-1 text-sm ${
          option.isCorrect ? "text-green-700 font-medium" : "text-gray-700"
        }`}
      >
        {option.optionText}
      </span>
      {option.isCorrect && (
        <svg
          className="w-5 h-5 text-green-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </div>
  );
};

export default OptionItem;
