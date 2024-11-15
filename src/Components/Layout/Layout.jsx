import Sidebar from '../Sidebar/Sidebar';

function Layout({ children }) {
  return (
    <div className="container">
      <Sidebar/>
      <div className="main">{children}</div>
    </div>
  );
}

export default Layout;
