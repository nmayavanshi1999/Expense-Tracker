import { useState, useEffect } from "react";
import "./App.css";
import { toast } from "react-toastify";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function App() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 3200);
    return () => clearTimeout(timer);
  }, []);

  const [expenses, setExpenses] = useState(() => {
    try {
      const savedExpenses = localStorage.getItem("expenses");
      return savedExpenses ? JSON.parse(savedExpenses) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (e) => {
    e.preventDefault();

    if (!title || !amount || !date) {
      toast.warn("Please fill all fields");
      return;
    }

    if (Number(amount) <= 0) {
      toast.warn("Amount must be greater than 0");
      return;
    }

    const newExpense = {
      id: Date.now(),
      title: title.trim(),
      amount: Number(amount),
      category,
      date,
    };

    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);

    toast.success("Expense added successfully");

    setTitle("");
    setAmount("");
    setCategory("Food");
    setDate("");
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((item) => item.id !== id);
    setExpenses(updatedExpenses);
    toast.error("Expense deleted");
  };

  const totalExpense = expenses.reduce((total, item) => total + item.amount, 0);

  const categories = [
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Entertainment",
    "Others",
  ];

  const chartData = categories.map((cat) => ({
    category: cat,
    amount: expenses
      .filter((item) => item.category === cat)
      .reduce((total, item) => total + item.amount, 0),
  }));

  return (
    <>
    { showWelcome && (
      <div className="welcome-overlay">
        <div className="welcome-name">✨ Nisarg</div>
        <p className="welcome-sub">Welcome back, bhai 👋</p>
        <div className="welcome-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    )}
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

    <div className="chart-box">
      <h2>Expense Analytics</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#7c3aed" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>

    <div className="expense-list">
      {expenses.length === 0 ? (
        <p className="empty-message">No expenses added yet</p>
      ) : (
        expenses.map((item) => (
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
        ))
      )}
    </div>
  </div>
</div>
</>
  );
}

export default App;