"use client";
import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import styles from "./dashboard.module.css";
import Navbar from "./Navbar/page";

Chart.register(...registerables);

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

const getNutritionData = (): NutritionData[] => {
  if (typeof window !== "undefined") {
    const storedData = localStorage.getItem("nutritionData");

    try {
      if (storedData) {
        return JSON.parse(storedData);
      }
    } catch (error) {
      console.error("Error parsing nutrition data:", error);
    }
  }

  return []; // Return an empty array if no data or parsing error occurs
};

const Dashboard = () => {
  const [nutritionData, setNutritionData] = useState<NutritionData[]>([]);

  useEffect(() => {
    setNutritionData(getNutritionData());
  }, []); // Empty dependency array ensures this runs only once on component mount
  const totalCalories = Math.round(
    nutritionData.reduce((acc, item) => acc + item.calories, 0)
  );
  const dailyCalorieIntake = 2000;
  const percentageCalories = ((totalCalories / dailyCalorieIntake) * 100).toFixed(2);

  const barChartData = {
    labels: nutritionData.map((item) => item.name.charAt(0).toUpperCase() + item.name.slice(1)),
    datasets: [
      {
        label: "Calories",
        data: nutritionData.map((item) => item.calories),
        backgroundColor: [
          "#FF6384", // Red
          "#36A2EB", // Blue
          "#FFCE56", // Yellow
          "#4BC0C0", // Turquoise
          "#9966CC", // Purple
          "#FF8C00", // Orange
          "#87CEEB", // Sky Blue
          "#FFD700", // Gold
          "#32CD32", // Lime Green
          "#FF69B4",
        ],
      },
    ],
    options: {
      scales: {
        x: {
          type: "category",
        },
      },
      plugins: {
        legend: {
          labels: {
            font: {
              family: "Arial, sans-serif",
              size: 14,
              color: "#fff",
            },
          },
        },
      },
      // Add the following options for better font rendering
      defaultFontFamily: "Arial, sans-serif",
      defaultFontSize: 14,
      defaultFontColor: "#fff",
      responsive: true,
      maintainAspectRatio: false,
    },
  };

  const pieChartData = {
    labels: [
      "Carbohydrates",
      "Protein",
      "Fat",
      "Calories",
      "Sodium",
      "Fat Saturate",
      "Cholesterol",
      "Sugar",
      "Fiber",
      "Potassium",
    ],
    datasets: [
      {
        data: [
          nutritionData.reduce(
            (acc, item) => acc + item.carbohydrates_total_g,
            0
          ),
          nutritionData.reduce((acc, item) => acc + item.protein_g, 0),
          nutritionData.reduce((acc, item) => acc + item.fat_total_g, 0),
          nutritionData.reduce((acc, item) => acc + item.calories, 0),
          nutritionData.reduce((acc, item) => acc + item.sodium_mg, 0),
          nutritionData.reduce((acc, item) => acc + item.fat_saturated_g, 0),
          nutritionData.reduce((acc, item) => acc + item.cholesterol_mg, 0),
          nutritionData.reduce((acc, item) => acc + item.sugar_g, 0),
          nutritionData.reduce((acc, item) => acc + item.fiber_g, 0),
          nutritionData.reduce((acc, item) => acc + item.potassium_mg, 0),
        ],
        backgroundColor: [
          "#FF6384", // Red
          "#36A2EB", // Blue
          "#FFCE56", // Yellow
          "#4BC0C0", // Turquoise
          "#9966CC", // Purple
          "#FF8C00", // Orange
          "#87CEEB", // Sky Blue
          "#FFD700", // Gold
          "#32CD32", // Lime Green
          "#FF69B4",
        ],
      },
    ],
    options: {
      plugins: {
        legend: {
          labels: {
            font: {
              family: "Arial, sans-serif",
              size: 14,
              color: "#fff",
            },
          },
        },
      },
      // Add the following options for better font rendering
      defaultFontFamily: "Arial, sans-serif",
      defaultFontSize: 14,
      defaultFontColor: "#fff",
      responsive: true,
      maintainAspectRatio: false,
    },
  };

  const pieChart2Data = {
    labels: nutritionData.map((item) => item.name.charAt(0).toUpperCase() + item.name.slice(1)),
    datasets: [
      {
        data: nutritionData.map((item) => item.calories),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
    options: {
      plugins: {
        legend: {
          labels: {
            font: {
              family: "Arial, sans-serif",
              size: 14,
              color: "#fff",
            },
          },
        },
      },
      // Add the following options for better font rendering
      defaultFontFamily: "Arial, sans-serif",
      defaultFontSize: 14,
      defaultFontColor: "#fff",
      responsive: true,
      maintainAspectRatio: false,
    },
  };

  return (
    <div className="w-full h-[100vh] flex">
      <div className="w-[20%] h-[100%]">
        <Navbar />
      </div>
      <div className="w-[80%] h-[100%] ">
        <h1 className=" w-[100%] h-[10%] text-center text-4xl font-semibold text-slate-800 pt-6   bg-white border-2 border-white shadow-lg">
          Nutrition Dashboard
        </h1>
        <div className=" w-[100%] h-[90%] flex  justify-between items-center gap-10 p-[60px]">
          <div className=" flex-col w-[33.33%] h-[100%] flex justify-center items-centerborder-2  mb-5  items-center gap-5 ">
            <div className="w-full h-[90%]   border-white shadow-lg p-3 rounded-lg">
              <Bar
                data={barChartData}
                className="h-[100%]  "
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
            <div className="w-full h-[10%] flex items-center justify-center text-center text-3xl font-semibold text-slate-800  bg-white border-2 border-white shadow-lg">
              <p className="">Total Calories: {percentageCalories} %</p>
            </div>
          </div>
          <div className=" flex-col w-[33.33%] h-[100%] flex justify-center items-centerborder-2  mb-5  items-center gap-5">
            <div className="w-full h-[90%]   border-white shadow-lg p-3 rounded-lg">
              <Pie
                data={pieChartData}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                }}
              />
            </div>
            <div className="w-full h-[10%] flex items-center justify-center text-center text-3xl font-semibold text-slate-800  bg-white border-2 border-white shadow-lg">
              <p className="">Total Nutrition</p>
            </div>
          </div>{" "}
          <div className=" flex-col w-[33.33%] h-[100%] flex justify-center items-centerborder-2  mb-5  items-center gap-5">
            <div className="w-full h-[90%]   border-white shadow-lg p-3 rounded-lg">
              <Pie
                data={pieChart2Data}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                }}
              />
            </div>
            <div className="w-full h-[10%] flex items-center justify-center text-center text-3xl font-semibold text-slate-800  bg-white border-2 border-white shadow-lg">
              <p className="">Total Food</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
