import "./Dashboard.css";
import Users from "./Users";
import Products from "./Products";
import Thead from "./Thead";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2 style={{ textAlign: "center" }} className="title">
        Dashboard
      </h2>

      <div className="LoginEnabled">
        <button>Activate Login</button>

        <table>
          <Thead />
        </table>

        <br />
      </div>

      {/* User data */}
      <Users />
      <br />
      {/* products data */}
      <Products />
    </div>
  );
};

export default Dashboard;
