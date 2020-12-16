import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import Content from "../content/Content";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <Sidebar />
      <div className="home-layout-right">
        <Navbar />
        <Content />
      </div>
    </div>
  );
}
