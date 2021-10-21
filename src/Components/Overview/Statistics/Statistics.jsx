import React, { useContext } from 'react'
import { Avatar, Box } from '@material-ui/core';
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
import WidgetsIcon from "@material-ui/icons/Widgets";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import AddEntries from '../Overview.jsx/AddEntries';
import { Line } from 'react-chartjs-2';
import { Context } from '../../../Provider';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../../Logo/Logo';
import { Bar } from 'react-chartjs-2';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(100),
      height: theme.spacing(40),
    }
  },

  links: {
    color: "white",
    textDecoration: "none"
  },
  margin: {
    marginTop: "20px"
  },

}));
const styleDiv1 = {
  backgroundColor: "#6200ee",
  height: "70px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  div: {
    width: "80px",
  },
  h2: {
    color: "white",
    fontFamily: "Roboto",
  },
  flex: {
    display: "flex"
  }
};
const styleDiv2 = {
  backgroundColor: "#6200ee",
  height: "70px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
  position: "fixed",
  bottom: "0",
  color: "white",
  textAlign: "center",
  fontFamily: "Roboto",
  p: {
    margin: '0px'
  },

}

export default function Statistics() {
  const { entries, img } = useContext(Context)
  const classes = useStyles();

  const valuesIncome = []
  const valuesExpense = []
  entries.map((x) => {
    if (x.type === "income") {
      valuesIncome.push(x.amount)
    } else {
      valuesExpense.push(x.amount)
    }
  })
  const valueIncomeCategories = []
  const valueExpenseCategories = []
  entries.map((x) => {
    if (x.type === "income") {
      valueIncomeCategories.push(x.category)
    } else {
      valueExpenseCategories.push(x.category)

    }
  })
  const valueCategories = []
  const categoryAmount = []

  entries.map((x) => {
    valueCategories.push(x.category)
    categoryAmount.push(x.amount)

  })



  const data = {
    labels: categoryAmount
    ,
    datasets: [
      {
        label: "Income",
        data: valuesIncome,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "Expense",
        data: valuesExpense,
        fill: false,
        borderColor: "#742774"
      }
    ],
  };

  const dataIncome = {
    labels: valueIncomeCategories
    ,
    datasets: [
      {
        label: 'Income',
        data: valuesIncome,
        fill: false,
        backgroundColor: '#03dac5',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  const dataExpense = {
    labels: valueExpenseCategories
    ,
    datasets: [
      {
        label: 'Expenses',
        data: valuesExpense,
        fill: false,
        backgroundColor: 'red',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  const optionsLine = {
    indexAxis: 'y',
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const optionsBarIncome = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,

      },

    },
  };

  const optionsBarExpense = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,

      },
    },
  };

  return (
    <Box>
      <div style={styleDiv1}>
        <div style={styleDiv1.flex}>
          <div style={styleDiv1.div}>
            <Logo />
          </div>
          <h2 style={styleDiv1.h2}>Statistics</h2>
        </div>
        {img.map((el) => {
          return (
            <Avatar>
              <img
                src={el.picture.thumbnail}
                alt="random image"
                key={el.picture}
              />
            </Avatar>

          )
        })}
      </div>
      <div>
        <Bar data={dataIncome} options={optionsBarIncome} />
      </div>
      <div>
        <Bar data={dataExpense} options={optionsBarExpense} />
      </div>

      <div style={{ paddingBottom: "80px" }}>
        <Line data={data} options={optionsLine} />
      </div>
      <div style={styleDiv2}>
        <div>
          <Link to="overview" className={classes.links}>
            <HomeIcon fontSize="medium" />
            <p style={styleDiv2.p}>Overview</p></Link>
        </div>
        <div>
          <Link to="/categories" className={classes.links}>
            <WidgetsIcon fontSize="medium" />
            <p style={styleDiv2.p}>Categories</p></Link>
        </div>
        <div>
          <Link to="/statistics" className={classes.links}>
            <EqualizerIcon fontSize="medium" />
            <p style={styleDiv2.p}>Statistics</p></Link>
        </div>
        {<AddEntries />}
      </div>
    </Box>
  )
}

