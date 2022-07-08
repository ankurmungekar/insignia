import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { useHistory } from "react-router-dom";
import Button from "components/CustomButtons/Button.js";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor, isDashboard } = props;
  let history = useHistory();
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    <div style={{ padding: '0 20px' }}><strong>{prop}</strong></div>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((item, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow}>
                <TableCell className={classes.tableCell}>
                  <img src={item.image} style={{ width: '60px' }} />
                </TableCell>
                <TableCell className={classes.tableCell} width="200px">
                  <div style={{ padding: '0 20px' }}><strong>{item.title}</strong></div>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <div style={{ padding: '0 20px' }}>{item.description}</div>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <div style={{ padding: '0 20px' }}><strong>{item.price}</strong></div>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <Button color="primary">Edit</Button>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <Button color="danger">Remove</Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
