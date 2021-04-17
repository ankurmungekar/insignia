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
  const [actionList, setActionList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [badgesList, setBadgesList] = useState([]);
  const partnerId = props.match.params.id;
  const handleClickOpen = () => {
    axios.get(`/partner/${partnerId}/actions`)
      .then(function (response) {
        setActionList(response.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      })
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (values) => {
    const params = { ...values, partnerId: partnerId };
    axios.post('/badge', params)
      .then(response => {
        // const tempActionList = [...actionList, values]; // new array need to update
        // setActionList(tempActionList); // update the state
        setOpen(false);
      })
      .catch(error => {
        console.log(error);
      })
  };
  useEffect(() => {
    axios.get(`/partner/${partnerId}/badges`)
      .then(function (response) {
        setBadgesList(response.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      })
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <div style={{ float: 'right', marginBottom: '30px' }}><Button color="primary" onClick={handleClickOpen}>Create new Badge</Button></div>
      <div style={{ clear: 'both' }}>
        <GridContainer>
          {loading && (
            <div style={{ padding: '100px', textAlign: 'center' }}><img src={Spinner} /></div>
          )}
          {!loading && badgesList.map((item, key) => {
            return (
              <GridItem xs={12} sm={6} md={4} key={key}>
                <Card style={{ marginTop: '0' }}>
                  <div style={{ padding: '40px 30px' }}>
                    <div style={{ width: '120px', height: '120px', borderRadius: '100%', float: 'left' }}>
                      <img src={item.logoUrl} style={{ width: '100%', borderRadius: '100%' }} />
                    </div>
                    <div style={{ margin: '0 0 0 140px' }}>
                      <h3 style={{ margin: '0 0 -5px 0', fontSize: '20px' }}>{item.name}</h3>
                      <p style={{ fontSize: '14px', lineHeight: '22px', color: '#545454' }}>{item.description}</p>
                      <p style={{ fontSize: '14px', lineHeight: '22px', color: '#545454' }}><b>Action:</b> {item.actionDescription}</p>
                      <p style={{ fontSize: '14px', lineHeight: '22px', color: '#545454' }}><b>Limit:</b> {item.needed}</p>
                    </div>
                  </div>
                </Card>
              </GridItem>
            )
          })}
          {!loading && (badgesList.length === 0) && (
            <div style={{ padding: '100px', textAlign: 'center' }}>No badges found, please add some badges</div>
          )}
        </GridContainer>
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <div style={{ padding: '30px' }}>
          <DialogTitle id="form-dialog-title">Create a Badge</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add a badge to unlock on achieving a milestone
            </DialogContentText>
            <Formik
              initialValues={{
                name: '',
                description: '',
                logoUrl: '',
                actionId: '',
                actionCount: ''
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
                  <CustomInput
                    labelText="logoUrl"
                    id="logoUrl"
                    name="logoUrl"
                    formControlProps={{
                      fullWidth: true
                    }}
                    handleChange={formData.handleChange}
                  />
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Action List</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="actionId"
                      value={formData.values.actionId}
                      onChange={formData.handleChange}
                    >
                      {
                        actionList.map((item, key) => {
                          return <MenuItem key={key} value={item.id}>{item.description}</MenuItem>;
                        })
                      }
                    </Select>
                  </FormControl>
                  <CustomInput
                    labelText="Limit"
                    id="actionCount"
                    name="actionCount"
                    formControlProps={{
                      fullWidth: true
                    }}
                    handleChange={formData.handleChange}
                  />
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
