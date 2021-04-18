import React, { useState, useEffect } from "react";
import axios from '../../axios.js';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from "@material-ui/core/Icon";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { Formik } from 'formik';
import Spinner from '../../assets/img/fidget-spinner.gif';

const tableData = [
  {
    name: "December 2021", status: "inactive", description: 'campaign description', rewards: [{
      name: 'Amazon voucher Worth Rs. 2000',
      rank: 1
    },
    {
      name: '50% Discount on Lenskart.com',
      rank: 2
    }]
  },
  {
    name: "June 2021", status: "active", description: 'campaign description', rewards: [{
      name: 'Amazon voucher Worth Rs. 2000',
      rank: 1
    },
    {
      name: '50% Discount on Lenskart.com',
      rank: 2
    }]
  },
  {
    name: "July 2021", status: "inactive", description: 'campaign description', rewards: []
  }
]
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
  }
};

const useStyles = makeStyles(styles);

export default function TableList(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openRanks, setOpenRanks] = useState(false);
  const [loading, setLoading] = useState(true);
  const [campaignsList, setCampaignsList] = useState([]);
  const partnerId = props.match.params.id;
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenRank = () => {
    setOpenRanks(true);
  };
  const handleCloseRank = () => {
    setOpenRanks(false);
  };

  const handleSubmit = (values) => {
    const params = { ...values };
    axios.post(`/partner/${partnerId}/campaign`, params)
      .then(response => {
        const tempCamaignList = [...campaignsList, values];
        setCampaignsList(tempCamaignList);
        setOpen(false);
      })
      .catch(error => {
        console.log(error);
      })
  };
  const handleStatusChange = (e) => {
    // const params = { ...values };
    // axios.post(`/partners/${partnerId}/campaing`, params)
    //   .then(response => {
    //     // const tempActionList = [...actionList, values]; // new array need to update
    //     // setActionList(tempActionList); // update the state
    //     setOpen(false);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   })
    console.log(e);
  };
  useEffect(() => {
    axios.get(`/partner/${partnerId}/campaigns`)
      .then(function (response) {
        setCampaignsList(response.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      })
    // eslint-disable-next-line
  }, []);
  let rewardList = '';
  const displayRewards = (rewards) => {
    rewardList = (rewards.map((item, key) => {
      return <li>{item.name}</li>
    }))
    return rewardList;
  }
  return (
    <div>
      <div style={{ float: 'left'}}><h1 className={classes.header} >Campaigns</h1></div>
      <div style={{ float: 'right', marginBottom: '30px' }}><Button color="primary" onClick={handleClickOpen}>Create new Campaign</Button></div>
      <div style={{ clear: 'both' }}>
        {loading && (
          <div style={{ padding: '100px', textAlign: 'center' }}><img src={Spinner} /></div>
        )}
        <GridContainer>
          {!loading && campaignsList.map((item, key) => {
            return (
              <GridItem xs={12} sm={12} md={12} key={key}>
                <Card style={{ marginTop: '0' }}>
                  <div style={{ padding: '20px' }}>
                    <div>
                      <div style={{ float: 'right' }}>
                        <Switch
                          checked={item.status === 'ACTIVE' ? true : false}
                          onChange={(e) => handleStatusChange(e)}
                          name="status"
                          color="primary"
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                        <Button color="primary" onClick={handleClickOpenRank}>Add Rewards</Button>
                      </div>
                      <h3 style={{ margin: '0px 0 -15px 0' }}>{item.name}</h3>
                      <p>{item.description}</p>
                    </div>
                    <div>
                      {(item.rewards && item.rewards.length > 0) && (
                        <div>
                          <div>Top winners will get:</div>
                          <ol style={{ paddingLeft: '14px', margin: '0', color: '#f07830', fontWeight: 'bold' }}>
                            {displayRewards(item.rewards)}
                          </ol>
                        </div>
                      )}
                      {(!item.rewards || item.rewards && item.rewards.length === 0) && (
                        <div>No Rewards added to the Campaign, please add some Rewards</div>
                      )}
                    </div>
                  </div>
                </Card>
              </GridItem>
            )
          })}
          {!loading && (campaignsList.length === 0) && (
            <div style={{ padding: '100px', textAlign: 'center' }}>No campaigns found, please add a campaign</div>
          )}
        </GridContainer>
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <div style={{ padding: '30px' }}>
          <DialogTitle id="form-dialog-title">Add Campaign</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Initiate a Campaign for a Partner.
            </DialogContentText>
            <Formik
              initialValues={{
                name: '',
                description: '',
                status: '',
                rewards: []
              }}>
              {formData => (
                <div>
                  <CustomInput
                    labelText="Name"
                    id="name"
                    name="name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    handleChange={formData.handleChange}
                  />
                  <CustomInput
                    labelText="Description"
                    id="description"
                    name="description"
                    formControlProps={{
                      fullWidth: true
                    }}
                    handleChange={formData.handleChange}
                  />
                  <FormControl className={classes.formControl} style={{ width: "100%"}}>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="status"
                      value={formData.values.status}
                      onChange={formData.handleChange}
                    >
                      <MenuItem value="active">ACTIVE</MenuItem>;
                      <MenuItem value="inactive">INACTIVE</MenuItem>;
                    </Select>
                  </FormControl>
                  <div style={{ marginTop: '20px' }}>
                    <Button color="primary" onClick={() => handleSubmit(formData.values)}>Create</Button>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                  </div>
                </div>
              )}
            </Formik>
          </DialogContent>
        </div>
      </Dialog>
      <Dialog open={openRanks} onClose={handleCloseRank} aria-labelledby="form-dialog-title">
        <div style={{ padding: '30px' }}>
          <DialogTitle id="form-dialog-title">Add Rewards</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add rewards to the campaign
            </DialogContentText>
            <Formik
              initialValues={{
                name: '',
                description: '',
                status: ''
              }}>
              {formData => (
                <div>
                  <div>
                    <CustomInput
                      labelText="Name"
                      id="name"
                      name="name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      handleChange={formData.handleChange}
                      style={{ margin: '0' }}
                    />
                    <CustomInput
                      labelText="Rank"
                      id="rank"
                      name="rank"
                      formControlProps={{
                        fullWidth: true
                      }}
                      handleChange={formData.handleChange}
                      style={{ margin: '0' }}
                    />
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    <Button color="primary" onClick={() => handleSubmit(formData.values)}>Create</Button>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                  </div>
                </div>
              )}
            </Formik>
          </DialogContent>
        </div>
      </Dialog>
    </div >
  );
}
