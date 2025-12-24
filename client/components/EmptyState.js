export default function EmptyState({ text = "No data available." }) {
  return (
    <div className="flex items-center justify-center py-10 text-gray-500 text-center">
      <p>{text}</p>
    </div>
  );
}
