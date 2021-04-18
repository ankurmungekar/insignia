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
import ActionList from "components/ActionList";
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
export default function TableList(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionList, setActionList] = useState([]);
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
        const tempActionList = [...actionList, values]; // new array need to update
        setActionList(tempActionList); // update the state
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
    axios.get(`/partner/${partnerId}/actions`)
      .then(function (response) {
        setActionList(response.data);
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
      <div style={{ float: 'left' }}><h1 className={classes.header} >Actions</h1></div>
      <div style={{ float: 'right' }}><Button color="primary" onClick={handleClickOpen}>Add new Action</Button></div>
      <div style={{ clear: 'both' }}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Actions vs Points</h4>
              </CardHeader>
              <CardBody>
                {loading && (
                  <div style={{ padding: '100px', textAlign: 'center' }}><img src={Spinner} /></div>
                )}
                {!loading && actionList.length > 0 && (<ActionList
                  tableHeaderColor="primary"
                  tableHead={["Specific Actions", "Points", "Action Tag"]}
                  tableData={actionList}
                />)}
                {!loading && (actionList.length === 0) && (
                  <div style={{ padding: '100px', textAlign: 'center' }}>No actions found, please add some actions</div>
                )}
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <div style={{ padding: '30px' }}>
          <DialogTitle id="form-dialog-title">Add Action</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add Actions and specify points in order to earn rewards
            </DialogContentText>
            <Formik
              initialValues={initialValues}
              validationSchema={ActionFormSchema}
              isInitialValid={ActionFormSchema.isValidSync(initialValues)}>
              {formData => (
                <div>
                  <CustomInput
                    labelText="Action"
                    id="description"
                    name="description"
                    formControlProps={{
                      fullWidth: true
                    }}
                    handleChange={formData.handleChange}
                  />
                  <CustomInput
                    labelText="Points"
                    id="point"
                    name="point"
                    formControlProps={{
                      fullWidth: true
                    }}
                    handleChange={formData.handleChange}
                  />
                  <CustomInput
                    labelText="Tag"
                    id="actionTag"
                    name="actionTag"
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
