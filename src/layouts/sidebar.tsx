import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { NavLink, Outlet } from "react-router-dom";
import { Logo, Contorl } from "../assets";
import Icon from "react-icons-kit";
import { bars } from "react-icons-kit/fa/bars";
import { lineChart } from "react-icons-kit/fa/lineChart";
import { signOut } from "react-icons-kit/fa/signOut";

interface Props {}

const allListMenu = [
  {
    id: 1,
    name: "Dashbord",
    icon: bars,
    liActive: "active",
    linkTo: "dashboard",
  },
  {
    id: 2,
    name: "Orders",
    icon: lineChart,
    liActive: null,
    linkTo: "orders",
  },
  {
    id: 3,
    name: "Logout",
    icon: signOut,
    liActive: null,
    linkTo: "login",
  },
];

const Sidebar: React.FC<Props> = observer(() => {
  const [open, setOpen] = useState(true);
  const [listMenu, setListMenu] = useState(allListMenu);

  const handleClickMainLi = (index: any) => {
    let tmp = listMenu;
    allListMenu.forEach((e, i) => {
      if (index == i) {
        window.location.href = `${listMenu[i].linkTo}`;
      }
    });
    setListMenu(tmp);
  };

  const twoSum = (sum) => {
    for (let i = 4; i < 8; i++) {
      if (i == 6) {
        continue;
      }
      sum += i;
      console.log(sum);
    }
  };
  console.log(twoSum(0));

  return (
    <div className="flex">
      <div className={`${open ? "w-72" : "w-20"} duration-300 p-5 pt-8 bg-gray-900 h-screen relative`}>
        <img
          src={Contorl}
          alt=""
          className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-gray-900 ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img src={Logo} className={`cursor-pointer duration-500 w-9 h-9 `} />
          <h1 className={`text-white origin-left font-medium text-xl duration-300 ${!open && "scale-0"}`}>Wirachai Dashboard</h1>
        </div>
        <ul className="pt-6">
          {allListMenu.map((menu: any, index: any) => (
            <li key={index} className={`text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-slate-400 rounded-md`} onClick={() => handleClickMainLi(index)}>
              <Icon icon={menu.icon} />
              <span className={`${!open && "hidden"} origin-left duration-200`}> {menu.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-7 flex-1 h-screen">
        <Outlet />
      </div>
    </div>
  );
});

export default Sidebar;
