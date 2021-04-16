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
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Notifications from "@material-ui/icons/Notifications";
import Leaderboard from "views/Leaderboard/";
import Actions from "views/Actions/";
import Rewards from "views/UserProfile/UserProfile.js";
import Badges from "views/Badges";

const dashboardRoutes = [
  {
    path: `/leaderboard`,
    name: "Leaderboard",
    icon: Person,
    component: Leaderboard,
    layout: "/project"
  },
  {
    path: `/actions`,
    name: "Actions",
    icon: Person,
    component: Actions,
    layout: "/project"
  },
  {
    path: `/badges`,
    name: "Badges",
    icon: LibraryBooks,
    component: Badges,
    layout: "/project"
  },
  {
    path: `/rewards`,
    name: "Rewards",
    icon: Notifications,
    component: Rewards,
    layout: "/project"
  }
];

export default dashboardRoutes;
