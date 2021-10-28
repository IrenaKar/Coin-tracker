import React, { useContext } from 'react'
import { Box } from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import { Context } from '../../../Provider';

import { Bar } from 'react-chartjs-2';
import Header from '../Overview.jsx/Header';
import Menu from '../Overview.jsx/Menu';


export default function Statistics() {
  const { entries, sumEntries } = useContext(Context)

  const valuesIncome = []
  const valuesExpense = []

  sumEntries.map((x) => {
    if (x.type === "income") {
      return (

        valuesIncome.push(x.amount)
      )
    } else {
      return (
        valuesExpense.push(x.amount)
      )

    }
  })

  const valueIncomeCategories = []
  const valueExpenseCategories = []

  sumEntries.map((x) => {
    if (x.type === "income") {
      valueIncomeCategories.push(x.category)
    } else {
      valueExpenseCategories.push(x.category)
    }
  })

  const valueCategories = []
  const categoryDate = []

  entries.map((x) => {
    valueCategories.push(x.category)
    categoryDate.push(x.date)

  })



  const data = {
    labels: categoryDate
    ,
    datasets: [
      {
        label: "Income",
        data: valuesIncome,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "#03dac5"
      },
      {
        label: "Expense",
        data: valuesExpense,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "red"
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
        borderColor: '#03dac5',
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
        borderColor: 'red',
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
      <Header />
      <div>
        <Bar data={dataIncome} options={optionsBarIncome} />
      </div>
      <div>
        <Bar data={dataExpense} options={optionsBarExpense} />
      </div>

      <div style={{ paddingBottom: "80px", marginTop: "50px" }}>
        <Line data={data} options={optionsLine} />
      </div>
      <Menu />
    </Box>
  )
}

