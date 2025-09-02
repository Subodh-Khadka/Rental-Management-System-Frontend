export default function TableHeaderCell({ children, className = "" }) {
  return (
    <th className={`border border-gray-300 px-4 py-2 bg-gray-200 ${className}`}>
      {children}
    </th>
  );
}
