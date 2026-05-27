import { useState } from "react";
import "./App.css";
import { toast } from "react-toastify";

function App() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  const [expenses, setExpenses] = useState([
    {
      id: 1,
      title: "Petrol",
      amount: 150,
      category: "Travel",
      date: "2026-05-27",
    },
    {
      id: 2,
      title: "Burger",
      amount: 120,
      category: "Food",
      date: "2026-05-27",
    },
  ]);

  const addExpense = (e) => {
    e.preventDefault();

    if (!title || !amount || !date) {
      toast.warn("Please fill all fields");
      return;
    }

    const newExpense = {
      id: Date.now(),
      title: title,
      amount: Number(amount),
      category: category,
      date: date,
    };

    setExpenses([...expenses, newExpense]);

    setTitle("");
    setAmount("");
    setCategory("Food");
    setDate("");
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((item) => item.id !== id);
    setExpenses(updatedExpenses);
  };

  const totalExpense = expenses.reduce((total, item) => total + item.amount, 0);

  return (
    <div className="app">
      <div className="expense-card">
        <h1 className="title">Expense Tracker</h1>
        <p className="subtitle">Track your daily spending easily</p>

        <form className="form-box" onSubmit={addExpense}>
          <input
            className="input-field"
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="input-field"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <select
            className="input-field"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Food</option>
            <option>Travel</option>
            <option>Shopping</option>
            <option>Bills</option>
            <option>Entertainment</option>
            <option>Others</option>
          </select>

          <input
            className="input-field"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button className="add-btn" type="submit">
            Add Expense
          </button>
        </form>

        <div className="summary-box">
          <h2>Total Expense: ₹{totalExpense}</h2>
          <p>{expenses.length} Transactions</p>
        </div>

        <div className="expense-list">
          {expenses.map((item) => (
            <div className="expense-item" key={item.id}>
              <div>
                <h3>{item.title}</h3>
                <p className="category">{item.category}</p>
                <p className="date">{item.date}</p>
              </div>

              <div className="right-box">
                <h3 className="amount">₹{item.amount}</h3>
                <button
                  className="delete-btn"
                  onClick={() => deleteExpense(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App; 