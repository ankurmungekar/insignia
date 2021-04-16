/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
// import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
// import BubbleChart from "@material-ui/icons/BubbleChart";
// import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
// import Unarchive from "@material-ui/icons/Unarchive";
// import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
//import DashboardPage from "views/Dashboard/";
import Leaderboard from "views/Leaderboard/";
import Actions from "views/Actions/";
import Rewards from "views/UserProfile/UserProfile.js";
import Badges from "views/Badges";

const dashboardRoutes = [
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   rtlName: "لوحة القيادة",
  //   icon: Dashboard,
  //   component: DashboardPage,
  //   layout: "/admin"
  // },
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: Person,
  //   component: UserProfile,
  //   layout: "/admin"
  // },
  {
    path: "/maestro-bluehost/leaderboard",
    name: "Leaderboard",
    icon: Person,
    component: Leaderboard,
    layout: "/project"
  },
  {
    path: "/maestro-bluehost/actions",
    name: "Actions",
    icon: Person,
    component: Actions,
    layout: "/project"
  },
  {
    path: "/maestro-bluehost/badges",
    name: "Badges",
    icon: LibraryBooks,
    component: Badges,
    layout: "/project"
  },
  {
    path: "/maestro-bluehost/rewards",
    name: "Rewards",
    icon: Notifications,
    component: Rewards,
    layout: "/project"
  }
];

export default dashboardRoutes;
