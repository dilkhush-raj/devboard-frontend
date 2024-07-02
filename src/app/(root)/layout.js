import Navbar from "@/components/Navbar";

export default function Layout({children}) {
  return (
    <>
      <Navbar />
      <div className="mt-[60px] min-h-screen dark:text-white md:ml-[220px] lg:mr-[300px]">
        {children}
      </div>
    </>
  );
}
