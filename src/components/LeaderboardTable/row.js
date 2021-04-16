import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

const styles = {
    row: {
        backgroundColor: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "20px",
        textDecoration: "none",
        padding: '20px',
        color: '#3e3e3e',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: '10px'
    },
    first: {
        background: 'linear-gradient(60deg, #ab47bc, #8e24aa)',
        boxShadow: '0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(156 39 176 / 40%)',
        color: '#FFFFFF'
    },
    second: {
        background: 'linear-gradient(60deg, #ef5350, #e53935)',
        boxShadow: '0 12px 20px -10px rgb(244 67 54 / 28%), 0 4px 20px 0px rgb(0 0 0 / 12%), 0 7px 8px -5px rgb(244 67 54 / 20%)',
        color: '#FFFFFF'
    },
    third: {
        backgroundColor: '#ffa21a',
        boxShadow: '0 12px 20px -10px rgb(255 152 0 / 28%), 0 4px 20px 0px rgb(0 0 0 / 12%), 0 7px 8px -5px rgb(255 152 0 / 20%)',
        color: '#FFFFFF'
    },
    rank: {
        fontWeight: '600',
        fontSize: '36px',
        width: '5%',
        paddingTop: '10px',
        paddingLeft: '7px'
    },
    main: {
        width: '55%',
    },
    name: {
        fontWeight: '600',
        fontSize: '20px',
    },
    points: {
        fontWeight: '300',
        fontSize: '14px',
    },
    level: {
        fontWeight: '600',
        fontSize: '14px',
        width: '30%',
    },
    badges: {
        fontWeight: '600',
        fontSize: '14px',
        width: '10%',
    }
};

const useStyles = makeStyles(styles);


const Row = (props) => {
    const { rowData } = props
    const classes = useStyles();
    const rowClasses = () => {
        if (props.rank === 1) {
            return classes.first;
        }
        if (props.rank === 2) {
            return classes.second;
        }
        if (props.rank === 3) {
            return classes.third;
        }
    }
    return (
        <div className={classes.row + ' ' + rowClasses()} >
            <div className={classes.rank}>{props.rank}</div>
            <div className={classes.main}>
                <div className={classes.name}>{rowData.name}</div>
                <div className={classes.points}>{rowData.points} points</div>
            </div>
            <div className={classes.level}>Level {rowData.level}</div>
            <div className={classes.badges}>{rowData.badge}</div>
        </div>
    );
}

export default Row;