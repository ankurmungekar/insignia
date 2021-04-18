import React, { useState, useEffect } from "react";
import axios from '../../axios.js';
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
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
import { Formik, Form, FieldArray } from 'formik';
import Spinner from '../../assets/img/fidget-spinner.gif';

let rewardObj = {
  name: '',
  rank: '',
  type: ''
}
const initialValues = {
  rewards: [rewardObj]
};
// const tableData = [
//   {
//     name: "December 2021", status: "inactive", description: 'campaign description', rewards: [{
//       name: 'Amazon voucher Worth Rs. 2000',
//       rank: 1
//     },
//     {
//       name: '50% Discount on Lenskart.com',
//       rank: 2
//     }]
//   },
//   {
//     name: "June 2021", status: "active", description: 'campaign description', rewards: [{
//       name: 'Amazon voucher Worth Rs. 2000',
//       rank: 1
//     },
//     {
//       name: '50% Discount on Lenskart.com',
//       rank: 2
//     }]
//   },
//   {
//     name: "July 2021", status: "inactive", description: 'campaign description', rewards: []
//   }
// ]
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

const PurpleSwitch = withStyles({
  switchBase: {
    color: '#ccc',
    '&$checked': {
      color: '#59b369',
    },
    '&$checked + $track': {
      backgroundColor: '#59b369',
    },
  },
  checked: {},
  track: {},
})(Switch);

export default function TableList(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openRanks, setOpenRanks] = useState(false);
  const [loading, setLoading] = useState(true);
  const [campaignsList, setCampaignsList] = useState([]);
  const [campaignId, setCampaignId] = useState('');
  const partnerId = props.match.params.id;
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenRank = (id) => {
    setCampaignId(id);
    setOpenRanks(true);
  };
  const handleCloseRank = () => {
    setOpenRanks(false);
  };
  const getCampaignList = () => {
    axios.get(`/partner/${partnerId}/campaigns`)
      .then(function (response) {
        setCampaignsList(response.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      })
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
  const handleRewardsSubmit = (values) => {
    axios.post(`/partner/${partnerId}/campaigns/${campaignId}/reward`, values)
      .then(response => {
        getCampaignList();
        handleCloseRank(false);
      })
      .catch(error => {
        console.log(error);
      })
  };
  const handleStatusChange = (e, id) => {
    // const objIndex = campaignsList.findIndex(obj => obj.id === id);
    // const updatedObj = { ...campaignsList[objIndex], status: e.target.checked };
    // console.log(updatedObj);
    // const updatedCampaignsList = [
    //   ...campaignsList.slice(0, objIndex),
    //   updatedObj,
    //   ...campaignsList.slice(objIndex + 1),
    // ];
    // //setCampaignsList(updatedCampaignsList);
    let status = e.target.checked ? 'active' : 'inactive'
    const updatedCampaignsList = campaignsList.map(obj =>
      obj.campaignId === id ? { ...obj, status: status } : obj
    );
    setCampaignsList(updatedCampaignsList);
    let params = { status: status }
    axios.patch(`/partner/${partnerId}/campaigns/${id}/status`, params)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
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
      <div style={{ float: 'left', marginBottom: '30px' }}><h1 className={classes.header} >Campaigns</h1></div>
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
                        <PurpleSwitch
                          checked={item.status.toLowerCase() === 'active' ? true : false}
                          onChange={(e) => handleStatusChange(e, item.campaignId)}
                          name="status"
                        />
                        <Button color="primary" onClick={() => handleClickOpenRank(item.campaignId)}>Add Rewards</Button>
                      </div>
                      <h3 style={{ margin: '0px 0 -15px 0' }}>{item.name}</h3>
                      <p>{item.description}</p>
                    </div>
                    <div>
                      {(item.rewardList && item.rewardList.length > 0) && (
                        <div>
                          <div>Top winners will get:</div>
                          <ol style={{ paddingLeft: '14px', margin: '0', color: '#f07830', fontWeight: 'bold' }}>
                            {displayRewards(item.rewardList)}
                          </ol>
                        </div>
                      )}
                      {(!item.rewardList || item.rewardList && item.rewardList.length === 0) && (
                        <div>No Rewards added to the campaign, Please add some Rewards</div>
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
                  <FormControl className={classes.formControl}>
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
      <Dialog open={openRanks} onClose={handleCloseRank} aria-labelledby="form-dialog-title" >
        <div style={{ padding: '20px' }}>
          <DialogTitle id="form-dialog-title">Add Rewards</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add rewards to the campaign
            </DialogContentText>
            <Formik
              initialValues={initialValues}>
              {formData => (
                <div>
                  <div>
                    <Form>
                      <FieldArray
                        name="rewards"
                        render={arrayHelpers => {
                          function addRewardItem() {
                            if (rewardObj) {
                              arrayHelpers.push(rewardObj);
                            }
                          }
                          function removeRewardItem(index) {
                            arrayHelpers.remove(index)
                            //const lineItems = formData.values.filter((lineItem, lineItemIndex) => lineItemIndex !== index) //as changes don't effect immediately
                          }
                          return formData && formData.values.rewards.map(
                            (reward, index) => {
                              let isFirst = index === 0;
                              let isLast = index === formData.values.rewards.length - 1;
                              return (
                                <div style={{ width: '500px', position: 'relative' }}>
                                  {isLast && (
                                    <div onClick={addRewardItem} style={{ position: 'absolute', bottom: '0', left: '-25px', cursor: 'pointer' }}><AddCircleOutlineIcon /></div>
                                  )}
                                  <GridItem xs={12} sm={12} md={12} key={index}>
                                    <Card style={{ marginTop: '0', boxSizing: 'border-box', padding: '15px' }}>
                                      <h4 style={{ margin: '0px 0 -20px 0' }}>Reward {index + 1}</h4>
                                      <CustomInput
                                        labelText="Name"
                                        id="name"
                                        formControlProps={{
                                          fullWidth: true
                                        }}
                                        handleChange={formData.handleChange}
                                        style={{ margin: '0' }}
                                        name={`rewards[${index}].name`}
                                      />
                                      <CustomInput
                                        labelText="Rank"
                                        id="rank"
                                        formControlProps={{
                                          fullWidth: true
                                        }}
                                        handleChange={formData.handleChange}
                                        style={{ margin: '0' }}
                                        name={`rewards[${index}].rank`}
                                        type="number"
                                      />
                                      <CustomInput
                                        labelText="Type"
                                        id="type"
                                        formControlProps={{
                                          fullWidth: true
                                        }}
                                        handleChange={formData.handleChange}
                                        style={{ margin: '0' }}
                                        name={`rewards[${index}].type`}
                                      />
                                    </Card>
                                    {!isFirst && (
                                      <div onClick={removeRewardItem} style={{ position: 'absolute', bottom: '0', right: '-25px', cursor: 'pointer' }}><RemoveCircleOutlineIcon /></div>
                                    )}
                                  </GridItem>
                                </div>
                              );
                            }
                          );
                        }}
                      />
                    </Form>
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    <Button color="primary" onClick={() => handleRewardsSubmit(formData.values.rewards)}>Add</Button>
                    <Button onClick={handleCloseRank} color="primary">Cancel</Button>
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
