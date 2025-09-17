import { Link, NavLink } from "react-router-dom";
import styles from "../Layout/Navigation.module.css";
import {
  FaHome,
  FaDoorClosed,
  FaUsers,
  FaDollarSign,
  FaExchangeAlt,
  FaCalendarAlt,
  FaBars,
} from "react-icons/fa";
import { RiContractFill } from "react-icons/ri";
import { VscNotebookTemplate } from "react-icons/vsc";
import rentalLogo from "../../../public/rental-logo.png";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white text-black flex flex-col p-4">
      <section className="flex items-center mb-6">
        <img
          src={rentalLogo}
          className="w-8 h-10 mr-2"
          alt="rental-system-logo"
        />
        <h2 className="text-lg font-bold">Rental System</h2>
      </section>

      <p className="text-stone-400 px-3 text-[11px] mb-3">MAIN MENU</p>
      <nav className="flex flex-col space-y-3">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.active : ""}`
          }
        >
          <FaHome className="inline mr-2" /> Dashboard
        </NavLink>

        <NavLink
          to="/rooms"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.active : ""}`
          }
        >
          <FaDoorClosed className="inline mr-2" /> Rooms
        </NavLink>

        <NavLink
          to="/tenants"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.active : ""}`
          }
        >
          <FaUsers className="inline mr-2" /> Tenants
        </NavLink>

        <NavLink
          to="/Payments"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.active : ""}`
          }
        >
          <FaDollarSign className="inline mr-2" /> Payments
        </NavLink>

        <NavLink
          to="/generateMonthlyCharges"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.active : ""}`
          }
        >
          <FaCalendarAlt className="inline mr-2" /> Generate M-Charges
        </NavLink>

        <NavLink
          to="/monthlyCharges"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.active : ""}`
          }
        >
          <FaCalendarAlt className="inline mr-2" /> Monthly Charge
        </NavLink>

        <NavLink
          to="/rentalContracts"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.active : ""}`
          }
        >
          <RiContractFill /> Rental Contracts
        </NavLink>

        <NavLink
          to="/chargeTemplates"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.active : ""}`
          }
        >
          <VscNotebookTemplate style={{ strokeWidth: 1 }} />
          Charge Templates
        </NavLink>

        <NavLink
          to="/a"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.active : ""}`
          }
        >
          <FaExchangeAlt className="inline mr-2" /> Transactions
        </NavLink>
      </nav>
    </aside>
  );
}
