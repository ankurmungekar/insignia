import React, { useState, useEffect } from "react";
import axios from '../../axios.js';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Leaderboard from "components/LeaderboardTable";
import Spinner from '../../assets/img/fidget-spinner.gif';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  container: {
    paddingLeft: '50px',
    paddingRight: '50px',
  },
  header: {
    padding: '0 15px'
  }
};

const useStyles = makeStyles(styles);

export default function TableList(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [leaderList, setLeaderList] = useState([]);
  const partnerId = props.match.params.id;
  useEffect(() => {
    axios.get(`/partner/${partnerId}/leaderboard`)
      .then(function (response) {
        setLeaderList(response.data.usersList);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
      })
    // eslint-disable-next-line
  }, []);
  return (
    <div className={classes.container}>
      <h1 className={classes.header}>Leaderboard</h1>
      <GridItem xs={12} sm={12} md={12}>
        {loading && (
          <div style={{ padding: '100px', textAlign: 'center' }}><img src={Spinner} /></div>
        )}
        {!loading && leaderList.length > 0 && (
          <Leaderboard
            tableData={leaderList}
          />)}
        {!loading && (leaderList.length === 0) && (
          <div style={{ padding: '100px', textAlign: 'center' }}>No data found</div>
        )}
      </GridItem>
    </div>
  );
}
