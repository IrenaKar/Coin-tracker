import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import React, { useState, useEffect } from "react";
import { categotiesObj } from "../src/Components/Data/Categories"
import DateFnsUtils from '@date-io/date-fns';



export const Context = React.createContext();

const Provider = ({ children }) => {

  const [img, setImg] = useState([]);

  useEffect(() => {
    fetch("https://randomuser.me/api")
      .then((res) => res.json())
      .then((data) => setImg(data.results));
  }, []);

  const [categories, setCategories] = useState(categotiesObj)

  const [checked, setChecked] = useState([]);

  const [entries, setEntries] = useState([])

  const clickHandler = (el) => {
    const findId = checked.indexOf(el);
    const newArr = [...checked];
    if (findId > -1) {
      newArr.splice(findId, 1);
      setChecked(newArr);
    } else {
      newArr.push(el);
      setChecked(newArr);
    }
  };

  const updateEntry = (entry) => {
    const updated = entries.map(c => {
      if (c.id === entry.id) {
        return entry
      } else {
        return c
      }
    })

    setEntries(updated)
    // set updated categoris in LocalStorage here
  }

  const addEntry = (entry) => {
    setEntries([entry, ...entries]);
  }

  const updateCategory = (category) => {
    const updated = checked.map(c => {
      if (c.id === category.id) {
        return category
      } else {
        return c
      }
    })

    setChecked(updated)
    // set updated categoris in LocalStorage here
  }


  const addCategory = (category) => {
    setChecked([{ ...category }, ...checked])
    console.log(checked)
    // set updated categoris in LocalStorage here
    // localStorage.setItem("category", JSON.stringify(categories))
    // const categoriesFromStorage = localStorage.getItem("category")
    // setCategories(JSON.parse(categoriesFromStorage))
    // console.log(categoriesFromStorage)
  }


  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Context.Provider
        value={
          {
            img,
            setImg,
            categories,
            setCategories,
            checked, 
            setChecked, 
            clickHandler,
            addEntry,
            entries,
            updateCategory,
            addCategory,
            updateEntry,
            setEntries,
                   }
        }
      >



        {children}
      </Context.Provider>
    </MuiPickersUtilsProvider>
  );
};

export default Provider;
