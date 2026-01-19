import Link from "next/link";

type ButtonVariant = "danger" | "success" | "secondary" | "primary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

interface ButtonAsButton extends ButtonBaseProps {
  as?: "button";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  href?: never;
}

interface ButtonAsLink extends ButtonBaseProps {
  as: "link";
  href: string;
  type?: never;
  onClick?: never;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  danger: "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400",
  success: "bg-green-600 text-white hover:bg-green-700 disabled:bg-green-400",
  secondary: "bg-[#6c757d] text-white hover:bg-[#5a6268] disabled:bg-[#a0a5aa]",
  primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400",
  outline:
    "bg-transparent border-2 border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  disabled = false,
  loading = false,
  icon,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors cursor-pointer";
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = (
    <>
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {icon && !loading && <span className="mr-2">{icon}</span>}
      {children}
    </>
  );

  if (props.as === "link") {
    return (
      <Link href={props.href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={props.type || "button"}
      onClick={props.onClick}
      disabled={disabled || loading}
      className={classes}
    >
      {content}
    </button>
  );
}
