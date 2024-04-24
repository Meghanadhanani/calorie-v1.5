'use client';
import Navbar from '../Navbar/page';
import styles from './details.module.css';
import { useState, useEffect } from 'react';

const API_BASE_URL = 'https://api.calorieninjas.com/v1/nutrition';
const API_KEY = 'pkDVNbTRj0kGWfyI3S4KAQ==TuUoLflj2H7Wdfh6';

interface NutritionData {
  name: string;
  amount: string;
  date: string;
  calories: number;
  fat_total_g: number;
  fat_saturated_g: number;
  protein_g: number;
  sodium_mg: number;
  potassium_mg: number;
  cholesterol_mg: number;
  carbohydrates_total_g: number;
  fiber_g: number;
  sugar_g: number;
}

const fetchNutritionData = async (query: string): Promise<NutritionData> => {
  const response = await fetch(`${API_BASE_URL}?query=${query}`, {
    headers: {
      'X-Api-Key': API_KEY,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch nutrition data');
  }

  const data = await response.json();
  return data.items[0];
};

export default function DetailsPage() {
   const [foodName, setFoodName] = useState('');
  const [amount, setAmount] = useState('');
  const [defaultDate] = useState(new Date().toISOString().slice(0, 16));
  const [selectedDate, setSelectedDate] = useState(defaultDate);
  const [nutritionData, setNutritionData] = useState<NutritionData[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [filterDate, setFilterDate] = useState(new Date().toISOString().slice(0, 10)); // Today's date by default

  useEffect(() => {
    const storedData = localStorage.getItem('nutritionData');
    if (storedData) {
      setNutritionData(JSON.parse(storedData));
    }
  }, []);

  const loadDataFromLocalStorage = () => {
    const storedData = localStorage.getItem('nutritionData');
    if (storedData) {
      setNutritionData(JSON.parse(storedData));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (foodName.trim() !== "" && amount > 0) {
      const query = `${foodName} ${amount}g`;
      const data = await fetchNutritionData(query);
      const newData = {
        ...data,
        name: foodName,
        amount: `${amount}g`,
        date: selectedDate,
        
      };
      setNutritionData((prevData) => [...prevData, newData]);
      setFoodName('');
      setAmount('');
      setShowForm(false);
      localStorage.setItem('nutritionData', JSON.stringify([...nutritionData, newData]));
    } else {
      console.error("error");
      alert("Please enter a valid food name and amount.");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setFoodName('');
    setAmount('');
  };

  const handleDateFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterDate(e.target.value);
  };

  const filteredData = nutritionData.filter((item) => {
    return filterDate ? item.date.includes(filterDate) : true;
  });

  const handleDelete = (index: number) => {
    const updatedItems = [...nutritionData];
    updatedItems.splice(index, 1);
    setNutritionData(updatedItems);
    localStorage.setItem('nutritionData', JSON.stringify(updatedItems));
  };

  useEffect(() => {
    loadDataFromLocalStorage();
  }, []);
  
  return (
    <div className="w-full h-[100vh] flex ">
    <div className= "w-[20%] h-[100%]">
      <Navbar/>
    </div>
    <div className="w-[80%] h-[100%]">
    <h1 className='w-[100%] h-[10%] text-center text-4xl font-semibold text-slate-800 pt-6   bg-white border-2 border-white shadow-lg'>Details</h1>
    <div className=' p-5'>


      {showForm ? (
        <form onSubmit={handleSubmit} >

          <label>
            Food Name:
            <input
              type="text"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
            />
          </label>
          <br />
          <label>
            Amount (grams):
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value, 10))}
            />
          </label>
          <br />
          <label>
            Date and Time:
            <input
              type="datetime-local"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </label>
          <br />
          <button type="submit" className={styles.subBtn}>
            Submit
          </button>
          <button type="button" onClick={handleCancel} className={styles.cancelBtn}>
            Cancel
          </button>
        </form>
      ) : (
        <button className="bg-green-500 p-3 font-bold text-white border-2 border-green-500 shadow-lg rounded-[4px] text-[16px]" onClick={() => setShowForm(true)}>
          Add Item
        </button>
      )}
      <div className={styles.filterDateDiv}>
        Filter by Date:
        <input
          type="date"
          value={filterDate}
          onChange={handleDateFilter}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Food Name</th>
            <th>Amount</th>
            <th>Date and Time</th>
            <th>Calories</th>
            <th>Total Fat</th>
            <th>Saturated Fat</th>
            <th>Protein</th>
            <th>Sodium</th>
            <th>Potassium</th>
            <th>Cholesterol</th>
            <th>Total Carbohydrates</th>
            <th>Fiber</th>
            <th>Sugar</th>
            <th>Delete item</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            
            <tr key={index}>
              <td>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</td>
              <td>{item.amount}</td>
              <td>{item.date}</td>
              <td>{item.calories}</td>
              <td>{item.fat_total_g}g</td>
              <td>{item.fat_saturated_g}g</td>
              <td>{item.protein_g}g</td>
              <td>{item.sodium_mg}mg</td>
              <td>{item.potassium_mg}mg</td>
              <td>{item.cholesterol_mg}mg</td>
              <td>{item.carbohydrates_total_g}g</td>
              <td>{item.fiber_g}g</td>
              <td>{item.sugar_g}g</td>
              <td>
                
              <button onClick={() => handleDelete(index)} className={styles.dele}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
    </div>
  );
}