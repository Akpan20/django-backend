export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-100 text-gray-600 text-sm py-4 text-center mt-10">
      &copy; {year} Sample Hotel. All rights reserved.
    </footer>
  );
}
