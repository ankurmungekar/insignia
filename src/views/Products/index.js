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
import ProductList from "components/ProductList";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { Formik } from 'formik';
import * as Yup from 'yup';
import Spinner from '../../assets/img/rhombus.gif';
// import DataGrid from '@material-ui/core/data-grid';
{/* <a href="https://ibb.co/XWBhP55"><img src="https://i.ibb.co/51DN3jj/bottle1.png" alt="bottle1" border="0"></a>
<a href="https://ibb.co/QXZhsbW"><img src="https://i.ibb.co/0Qk1PD0/bag2.png" alt="bag2" border="0"></a> */}
{/* <a href="https://ibb.co/Y0F2kmc"><img src="https://i.ibb.co/dmwB2FP/mug1.png" alt="mug1" border="0"></a>
<a href="https://ibb.co/QN8W5hx"><img src="https://i.ibb.co/YkD5rJV/tshirt1.png" alt="tshirt1" border="0"></a> */}

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
  header: {
    margin: "0 0 80px",
    lineHeight: "40px"
  }
};

const data = [
  {
    "id": 1,
    "title": "T-Shirts",
    "price": "1999",
    "description": "Collection of exclusive, customized Meastro T-shirts",
    "category": "men's clothing",
    "image": "https://i.ibb.co/YkD5rJV/tshirt1.png",
    "rating": { "rate": 3.9, "count": 120 }
  },
  {
    "id": 2,
    "title": "Bags",
    "price": "2499",
    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    "category": "men's clothing",
    "image": "https://i.ibb.co/0Qk1PD0/bag2.png",
    "rating": { "rate": 3.9, "count": 120 }
  },
  {
    "id": 3,
    "title": "Bottles",
    "price": "999",
    "description": "This double wall stainless steel bottle will keep your drinks cold throughout those warm summer days. 16.9oz. Height: 9.125 in.", "category": "men's clothing",
    "image": "https://i.ibb.co/51DN3jj/bottle1.png",
    "rating": { "rate": 4.1, "count": 259 }
  },
  {
    "id": 4,
    "title": "Mugs",
    "price": "599",
    "description": "Meastro Merchandise Printed Beautiful Mug for Home, Office, Kitchen Black Ceramic Coffee Mug.",
    "category": "men's clothing",
    "image": "https://i.ibb.co/dmwB2FP/mug1.png",
    "rating": { "rate": 4.7, "count": 500 }
  }]

const useStyles = makeStyles(styles);
export default function TableList(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actionList, setActionList] = useState(data);
  const partnerId = props.match.params.id;
  const [editProduct, setEditProduct] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(false);
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

  const schemaSample = {
    "category":
      { "description": "string", "name": "string" },
    "description": "string",
    "discount": { "description": "string", "discountPercent": 0, "name": "string" },
    "inventory": { "quantity": 0 },
    "name": "string",
    "price": 0
  }


  const openEditProduct = (product) => {
    setSelectedProduct(product);
    setEditProduct(true);
  }

  const openDeleteProduct = (product) => {
    setSelectedProduct(product);
    setDeleteProduct(true);
  }
  // useEffect(() => {
  //   axios.get(`/partner/${partnerId}/actions`)
  //     .then(function (response) {
  //       setActionList(response.data);
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       setLoading(false);
  //       console.log(error);
  //     })
  //   // eslint-disable-next-line
  // }, []);

  return (
    <div>
      <div style={{ float: 'left' }}><h1 className={classes.header} >Products</h1></div>
      <div style={{ float: 'right' }}><Button color="primary" onClick={handleClickOpen}>Add new Product</Button></div>
      <div style={{ clear: 'both' }}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Products</h4>
              </CardHeader>
              <CardBody>
                {loading && (
                  <div style={{ padding: '100px', textAlign: 'center' }}><img style={{ mixBlendMode: 'color-burn' }} src={Spinner} /></div>
                )}
                {!loading && actionList.length > 0 && (<ProductList
                  tableHeaderColor="primary"
                  tableHead={["", "Title", "Description", "Points", "", ""]}
                  tableData={actionList}
                  openEditProduct={openEditProduct}
                  openDeleteProduct={openDeleteProduct}
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
          <DialogTitle id="form-dialog-title">Add Product</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add Product and specify price
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
                    id="point"
                    name="point"
                    formControlProps={{
                      fullWidth: true
                    }}
                    handleChange={formData.handleChange}
                  />
                  <CustomInput
                    labelText="Price"
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
      <Dialog open={editProduct} onClose={() => setEditProduct(false)} aria-labelledby="form-dialog-title">
        <div style={{ padding: '30px' }}>
          <DialogTitle id="form-dialog-title">Edit - {selectedProduct.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edit Product and specify price
            </DialogContentText>
            <Formik
              initialValues={initialValues}
              validationSchema={ActionFormSchema}
              isInitialValid={ActionFormSchema.isValidSync(initialValues)}>
              {formData => (
                <div>
                  <CustomInput
                    labelText={selectedProduct.title}
                    id="name"
                    name="name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    handleChange={formData.handleChange}
                  />
                  <CustomInput
                    labelText={selectedProduct.description}
                    id="description"
                    name="description"
                    formControlProps={{
                      fullWidth: true
                    }}
                    handleChange={formData.handleChange}
                  />
                  <CustomInput
                    labelText={selectedProduct.price}
                    id="actionTag"
                    name="actionTag"
                    formControlProps={{
                      fullWidth: true
                    }}
                    handleChange={formData.handleChange}
                  />
                  <div style={{ marginTop: '20px' }}>
                    <Button color="primary" disabled={!formData.isValid} onClick={() => addNewAction(formData.values)}>Update</Button>
                    <Button onClick={() => setEditProduct(false)} color="primary">Cancel</Button>
                  </div>
                </div>
              )}
            </Formik>
          </DialogContent>
        </div>
      </Dialog>
      <Dialog open={deleteProduct} onClose={() => setDeleteProduct(false)} aria-labelledby="form-dialog-title">
        <div style={{ padding: '30px' }}>
          <DialogTitle id="form-dialog-title">Delete Product</DialogTitle>
          <DialogContent>
            <Formik
              initialValues={initialValues}
              validationSchema={ActionFormSchema}
              isInitialValid={ActionFormSchema.isValidSync(initialValues)}>
              {formData => (
                <div>
                  <div style={{ fontSize: '20px' }}>Are you sure you want to delete <strong>{selectedProduct.title}</strong>?</div>
                  <div style={{ marginTop: '20px' }}>
                    <Button color="danger" disabled={!formData.isValid} onClick={() => addNewAction(formData.values)}>Delete</Button>
                    <Button onClick={() => setDeleteProduct(false)} color="primary">Cancel</Button>
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
