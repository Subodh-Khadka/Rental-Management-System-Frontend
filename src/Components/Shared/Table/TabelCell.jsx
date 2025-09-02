export default function TableCell({ children, className = "" }) {
  return (
    <td
      className={`border border-gray-300 px-4 py-2 gap-2 align-items-center ${className}`}
    >
      {children}
    </td>
  );
}
