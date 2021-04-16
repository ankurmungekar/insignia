import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Row from "./row";
import { useHistory } from "react-router-dom";

const styles = {
    container: {
        paddingLeft: '100px',
        paddingRight: '100px'
    }
};

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
    const classes = useStyles();
    const { tableData } = props;
    let rank = 1;
    return (
        <div className={classes.container}>
            <h1 className={classes.header}>Leaderboard</h1>
            <Table className={classes.table}>
                <TableBody>
                    {tableData.map((item, key) => {
                        return (
                            <Row rowData={item} rank={rank++} key={key} />
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
