import React, { useContext } from 'react'
import { Box } from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import { Context } from '../../../Provider';
import { makeStyles } from '@material-ui/core/styles';
import { Bar } from 'react-chartjs-2';
import Header from '../Overview.jsx/Header';
import Menu from '../Overview.jsx/Menu';

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
    <Header/>
      <div>
        <Bar data={dataIncome} options={optionsBarIncome} />
      </div>
      <div>
        <Bar data={dataExpense} options={optionsBarExpense} />
      </div>

      <div style={{ paddingBottom: "80px" }}>
        <Line data={data} options={optionsLine} />
      </div>
 <Menu/>
    </Box>
  )
}

