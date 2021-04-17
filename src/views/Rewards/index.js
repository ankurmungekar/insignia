import React, { useState, useEffect } from "react";
import axios from '../../axios.js';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import RewardList from "components/RewardList";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { Formik } from 'formik';
import * as Yup from 'yup';
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
export default function Rewards(props) {
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
  const addNewAction = (values) => {
    const params = { ...values, partnerId: partnerId };
    axios.post('/action', params)
      .then(response => {
        const tempRewardList = [...rewardList, values];
        setRewardList(tempRewardList);
        setOpen(false);
      })
      .catch(error => {
        console.log(error);
      })
  };
  const initialValues = {
    description: '',
    point: '',
    actionTag: '',
  }
  const ActionFormSchema = Yup.object().shape({
    description: Yup.string().required('Required'),
    point: Yup.number().required('Required'),
    actionTag: Yup.string().required('Required'),
  });

  useEffect(() => {
    axios.get(`/partner/${partnerId}/rewards`)
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
      <div style={{ float: 'right' }}><Button color="primary" onClick={handleClickOpen}>Add New Campaign</Button></div>
      <div style={{ clear: 'both' }}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Campaigns</h4>
              </CardHeader>
              <CardBody>
                {loading && (
                  <div style={{ padding: '100px', textAlign: 'center' }}><img src={Spinner} /></div>
                )}
                {!loading && rewardList.length > 0 && (<RewardList
                  tableHeaderColor="primary"
                  tableHead={["Specific Campaigns", "Points", "Tag"]}
                  tableData={rewardList}
                />)}
                {!loading && (rewardList.length === 0) && (
                  <div style={{ padding: '100px', textAlign: 'center' }}>No campaigns found, please add a campaign</div>
                )}
              </CardBody>
            </Card>
          </GridItem>
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
              initialValues={initialValues}
              validationSchema={ActionFormSchema}
              isInitialValid={ActionFormSchema.isValidSync(initialValues)}>
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
                    labelText="Assets"
                    id="assets"
                    name="assets"
                    formControlProps={{
                      fullWidth: true
                    }}
                    handleChange={formData.handleChange}
                  />
                  <div style={{ marginTop: '20px' }}>
                    <Button color="primary" disabled={!formData.isValid} onClick={() => addNewAction(formData.values)}>Add</Button>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                  </div>
                </div>
              )}
            </Formik>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
