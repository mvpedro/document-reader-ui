export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
