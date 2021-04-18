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
import ProgramList from "components/ProgramList/";
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

export default function TableList() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [programList, setProgramList] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const addNewProgram = (values) => {
    const params = values;
    axios.post('/program', params)
      .then(response => {
        const tempProgramList = [...programList, values]; // new array need to update
        setProgramList(tempProgramList); // update the state
        setOpen(false);
      })
      .catch(error => {
        console.log(error);
      })
  };
  const initialValues = {
    brand: '',
    platform: '',
    partnerName: ''
  }
  const ProgramFormSchema = Yup.object().shape({
    brand: Yup.string().required('Required'),
    platform: Yup.string().required('Required'),
  });

  useEffect(() => {
    axios.get('/programs')
      .then(function (response) {
        setProgramList(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
      })
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <div style={{ float: 'right' }}><Button color="primary" onClick={handleClickOpen}>Add new Partner</Button></div>
      <div style={{ clear: 'both' }}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Insignia Loyalty Partners</h4>
              </CardHeader>
              <CardBody>
                {loading && (
                  <div style={{ padding: '100px', textAlign: 'center' }}><img src={Spinner} /></div>
                )}
                {!loading && (<ProgramList
                  tableHeaderColor="primary"
                  tableHead={["Brand", "Platform", "Badges", "Levels", "Users"]}
                  tableData={programList}
                  isDashboard={true}
                />)}
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <div style={{ padding: '30px' }}>
          <DialogTitle id="form-dialog-title">Add Partner</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add new partner to the Insignia programme
            </DialogContentText>
            <Formik
              initialValues={initialValues}
              validationSchema={ProgramFormSchema}
              isInitialValid={ProgramFormSchema.isValidSync(initialValues)}>
              {formData => (
                <div>
                  <CustomInput
                    labelText="Brand Name"
                    id="brand"
                    name="brand"
                    formControlProps={{
                      fullWidth: true
                    }}
                    handleChange={formData.handleChange}
                  />
                  {formData.errors.brand && formData.touched.brand ? (
                    <div>{formData.errors.brand}</div>
                  ) : null}
                  {/* <CustomInput
                    labelText="Partner Name"
                    id="partnerName"
                    name="partnerName"
                    formControlProps={{
                      fullWidth: true
                    }}
                    handleChange={formData.handleChange}
                  />
                  {formData.errors.partnerName && formData.touched.partnerName ? (
                    <div>{formData.errors.partnerName}</div>
                  ) : null} */}
                  <CustomInput
                    labelText="Platform"
                    id="platform"
                    name="platform"
                    formControlProps={{
                      fullWidth: true
                    }}
                    handleChange={formData.handleChange}
                  />
                  {formData.errors.platform && formData.touched.platform ? (
                    <div>{formData.errors.platform}</div>
                  ) : null}
                  <div style={{ marginTop: '20px' }}>
                    <Button color="primary" disabled={!formData.isValid} onClick={() => addNewProgram(formData.values)}>Add</Button> &nbsp;
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
