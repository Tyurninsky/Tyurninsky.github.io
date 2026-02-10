export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      {children}
    </div>
  );
}
