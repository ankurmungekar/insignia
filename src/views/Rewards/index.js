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
  const [loading, setLoading] = useState(true);
  const [rewardList, setRewardList] = useState([]);
  const partnerId = props.match.params.id;
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (values) => {
    const params = { ...values };
    axios.post(`/partners/${partnerId}/campaing`, params)
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
    axios.get(`/partners/${partnerId}/campaigns`)
      .then(function (response) {
        setRewardList(response.data);
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
      <div style={{ float: 'right', marginBottom: '30px' }}><Button color="primary" onClick={handleClickOpen}>Create new Campaign</Button></div>
      <div style={{ clear: 'both' }}>
        {loading && (
          <div style={{ padding: '100px', textAlign: 'center' }}><img src={Spinner} /></div>
        )}
        <GridContainer>
          {!loading && rewardList.map((item, key) => {
            return (
              <GridItem xs={12} sm={6} md={4} key={key}>
                <Card style={{ marginTop: '0' }}>
                  <div style={{ padding: '40px 30px' }}>
                    <div>
                      <div style={{ borderRadius: '100%', float: 'left', paddingTop: '20px' }}>
                        {item.name}
                      </div>
                      <Button style={{ float: 'right' }}> {item.status} </Button>
                    </div>
                    <div style={{ clear: 'both' }}>
                      <p>{item.description}</p>
                      <p style={{ margin: '0' }}>
                        Top winners will get
                      </p>
                      <ol style={{ margin: '0' }}>
                        <li>Amazon voucher</li>
                        <li>Amazon voucher</li>
                        <li>Amazon voucher</li>
                      </ol>
                    </div>
                  </div>
                </Card>
              </GridItem>
            )
          })}
          {!loading && (rewardList.length === 0) && (
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
                status: ''
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
    </div >
  );
}
