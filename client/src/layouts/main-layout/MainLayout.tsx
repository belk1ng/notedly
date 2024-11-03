import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <header>Header content</header>
      <aside>Sidebar content</aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
