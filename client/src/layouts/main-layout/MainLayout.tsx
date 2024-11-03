import { Outlet } from "react-router-dom";
import { Typography } from "@/components";

const MainLayout = () => {
  return (
    <div>
      <header>
        <Typography variant={"heading-1"}>Header content</Typography>
      </header>
      <aside>
        <Typography variant={"heading-2"}>Header content</Typography>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
