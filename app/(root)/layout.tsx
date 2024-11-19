import Navbar from "@/components/Navbar";
import { FC } from "react";

const Layout: FC = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="font-work-sans">
      <Navbar />
      {children}
    </main>
  );
};

export default Layout;
