import Navbar from "@/components/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="md:ml-[220px] mt-[60px] lg:mr-[300px] dark:text-white ">
        {children}
      </div>
    </>
  );
}
