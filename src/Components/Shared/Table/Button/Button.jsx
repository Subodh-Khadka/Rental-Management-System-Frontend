export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  isLoading = false,
  loadingText = "Loading",
  ...props
}) {
  let baseClasses = "rounded font-medium transition-colors duration-300";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-500",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
    black: "bg-stone-800 text-white hover:bg-stone-600",
    icon: "bg-transparent text-blue-500 hover:text-blue-700",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-md",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="loader mr-2"></span>
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}
