import { Outlet } from "react-router-dom";
const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto p-4 md:grid md:grid-cols-2 gap-10 mt-12 items-center">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
