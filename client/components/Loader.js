export default function Loader({ text = "Loading..." }) {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="text-gray-600 text-sm">{text}</div>
    </div>
  );
}
