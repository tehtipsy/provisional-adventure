import Nav from "./nav";

type BasePageProps = {
  children: React.ReactNode;
};

const BasePage: React.FC<BasePageProps> = ({ children }) => {
  return (
    <>
      <Nav />
      {children}
    </>
  );
};

export default BasePage;
