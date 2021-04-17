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
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';

import Leaderboard from "views/Leaderboard/";
import Actions from "views/Actions/";
import Rewards from "views/Rewards/";
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
    icon: AssignmentIcon,
    component: Actions,
    layout: "/project"
  },
  {
    path: `/badges`,
    name: "Badges",
    icon: LoyaltyIcon,
    component: Badges,
    layout: "/project"
  },
  {
    path: `/campaigns`,
    name: "Campaigns",
    icon: CardGiftcardIcon,
    component: Rewards,
    layout: "/project"
  }
];

export default dashboardRoutes;
