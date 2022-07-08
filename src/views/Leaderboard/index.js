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
import Spinner from '../../assets/img/rhombus.gif';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from "react-share";
import { FacebookIcon, TwitterIcon, LinkedinIcon } from "react-share";

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
    padding: '0',
    margin: "0 0 80px",
    lineHeight: "40px"
  }
};

const useStyles = makeStyles(styles);
// const tableData = [
//   { firstName: "Siddhant Wadhwani", level: "9", totalPoints: "1200", badge: "43", country: 'India' },
//   { firstName: "Abhishek Kaushik", level: "7", totalPoints: "1100", badge: "32", country: 'United Kingdom' },
//   { firstName: "Rejin Jayasankar", level: "6", totalPoints: "980", badge: "32", country: 'Autralia' },
//   { firstName: "Ankur Mungekar", level: "5", totalPoints: "700", badge: "23", country: 'India' },
//   { firstName: "Miranda Shaffer", level: "5", totalPoints: "650", badge: "20", country: 'India' },
//   { firstName: "Bradyn Kramer", level: "4", totalPoints: "650", badge: "13", country: 'China' },
//   { firstName: "Alvaro Mcgee", level: "1", totalPoints: "200", badge: "5", country: 'Russia' }
// ]
export default function TableList(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
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
      <div style={{ float: 'left', marginLeft: "20px" }}><h1 className={classes.header}>Leaderboard</h1></div>
      <div style={{ float: 'right', marginRight: "20px" }}>
        <span style={{ display: 'inline-block', verticalAlign: 'top', marginRight: "10px", marginTop: '5px' }}>Share on Social Media:</span>
        <FacebookShareButton
          url={"https://maestro.bluehost.com/"}
          quote={"Meastro Loyalty Leaders"}
          hashtag={"#hashtag"}
          description={"Meastro "}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton> &nbsp;
        <TwitterShareButton
          title={"Meastro Loyalty Leaders"}
          url={"https://maestro.bluehost.com/"}
          hashtags={["hashtag1", "hashtag2"]}
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton> &nbsp;
        <LinkedinShareButton
          title={"Meastro Loyalty Leaders"}
          summary={"Meastro Loyalty Leaders"}
          hashtags={["hashtag1", "hashtag2"]}
        >
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </div>
      <div style={{ clear: 'both' }}>
        <GridItem xs={12} sm={12} md={12}>
          {loading && (
            <div style={{ padding: '100px', textAlign: 'center' }}><img style={{ mixBlendMode: 'color-burn' }} src={Spinner} /></div>
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
    </div>
  );
}
