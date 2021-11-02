import React, { useState, useEffect } from "react";
import { categotiesObj } from "../src/Components/Data/Categories"

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



  const [entries, setEntries] = useState([])

  const updateEntry = (entry) => {
    const updated = entries.map(c => {
      if (c.id === entry.id) {
        return entry
      } else {
        return c
      }

    })

    setEntries(updated)
    localStorage.setItem("entries", JSON.stringify(updated))
  }

  const addEntry = (entry) => {
    const newEntry = [{ ...entry }, ...entries]
    setEntries(newEntry)

    localStorage.setItem("entries", JSON.stringify(newEntry))
  }


  useEffect(() => {
    const entry = localStorage.getItem("entries");
    const savedEntry = JSON.parse(entry);
    if (savedEntry) {
      setEntries(savedEntry);
    }
  }, []);

  const updateCategory = (category) => {
    const updated = checked.map(c => {
      if (c.id === category.id) {
        return category
      } else {
        return c
      }
    })

    setChecked(updated)
    localStorage.setItem("category", JSON.stringify(updated))
  }

  const addCategory = (category) => {
    const newChecked = [{ ...category }, ...checked]
    setChecked(newChecked)
    localStorage.setItem("category", JSON.stringify(newChecked))
  }

  useEffect(() => {
    const category = localStorage.getItem("category");
    const savedCategory = JSON.parse(category);
    if (savedCategory) {
      setChecked(savedCategory);
    }
  }, []);

 

  const handleRemoveItem = (id) => {
    const removed = entries.filter((i) => (i.id !== id))
    setEntries(removed)
    localStorage.setItem("entries", JSON.stringify(removed))
  }

  const sumEntries = [...entries.reduce((r, o) => {

    const key = o.category + o.type;

    const item = r.get(key) || Object.assign({}, o, {
      amount: 0,
      newBudget: checked.find(x => x.category === o.category).budget,
    });

    item.amount += parseInt(o.amount);
    return r.set(key, item);
  }, new Map).values()];


  const [values, setValues] = React.useState({
    amount: '',
  });


  return (
    <Context.Provider
      value={
        {

          values,
          setValues,
          sumEntries,
          handleRemoveItem,
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

  );
};

export default Provider;
