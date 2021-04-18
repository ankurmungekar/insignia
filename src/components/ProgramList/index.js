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
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor, isDashboard } = props;
  let history = useHistory();
  function TableRowHandler(id) {
    if (isDashboard) {
      history.push(`/project/${id}/leaderboard`);
      window.localStorage.setItem('selectedProgram', id);
    }
  }
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
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((item, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow} onClick={() => TableRowHandler(item.id)} style={{ cursor: 'pointer' }}>
                {item.brand && (
                  <TableCell className={classes.tableCell}>
                    {item.brand}
                  </TableCell>
                )}
                {item.platform && (
                  <TableCell className={classes.tableCell}>
                    {item.platform}
                  </TableCell>
                )}
                <TableCell className={classes.tableCell}>
                  0
                </TableCell>
                <TableCell className={classes.tableCell}>
                  0
                </TableCell>
                <TableCell className={classes.tableCell}>
                  0
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
