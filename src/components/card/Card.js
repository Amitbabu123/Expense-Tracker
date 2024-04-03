import React, { useState } from 'react';
import './Card.css';
import EllipsePieChart from '../ellipsePieChart/EllipsePieChart';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import ClearIcon from '@mui/icons-material/Clear';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import LuggageIcon from '@mui/icons-material/Luggage';
import Box from '@mui/material/Box';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart'; // Import PieChart component

const Card = () => {
  const [expenses, setExpenses] = useState([]);
  const [showIncomeAlert, setShowIncomeAlert] = useState(false);
  const [incomeAmount, setIncomeAmount] = useState('');
  const [showExpenseAlert, setShowExpenseAlert] = useState(false);
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expensePrice, setExpensePrice] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [expenseDate, setExpenseDate] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination constants
  const itemsPerPage = 3;
  const totalPages = Math.ceil(expenses.length / itemsPerPage);

  const handleAddIncome = () => {
    setShowIncomeAlert(true);
  };

  const handleAddIncomeConfirm = () => {
    alert(`Added Income: ₹${incomeAmount}`);
    setIncomeAmount('');
    setShowIncomeAlert(false);
  };

  const handleCancelIncome = () => {
    setIncomeAmount('');
    setShowIncomeAlert(false);
  };

  const handleAddExpenses = () => {
    setShowExpenseAlert(true);
  };

  const handleAddExpenseConfirm = () => {
    const newExpense = {
      title: expenseTitle,
      price: expensePrice,
      category: expenseCategory,
      date: expenseDate
    };
    if (editIndex !== null) {
      const updatedExpenses = [...expenses];
      updatedExpenses[editIndex] = newExpense;
      setExpenses(updatedExpenses);
      setEditIndex(null);
    } else {
      setExpenses([...expenses, newExpense]);
    }
    setExpenseTitle('');
    setExpensePrice('');
    setExpenseCategory('');
    setExpenseDate('');
    setShowExpenseAlert(false);
  };

  const handleCancelExpense = () => {
    setExpenseTitle('');
    setExpensePrice('');
    setExpenseCategory('');
    setExpenseDate('');
    setShowExpenseAlert(false);
    setEditIndex(null);
  };

  const handleEditExpense = (index) => {
    const expenseToEdit = expenses[index];
    setExpenseTitle(expenseToEdit.title);
    setExpensePrice(expenseToEdit.price);
    setExpenseCategory(expenseToEdit.category);
    setExpenseDate(expenseToEdit.date);
    setShowExpenseAlert(true);
    setEditIndex(index);
  };

  const handleDeleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Calculate the range of expenses to display based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Data for the pie chart representing expenses
  const pieChartData = [
    { value: 70, label: 'Entertainment', color: '#FF9304' },
    { value: 10, label: 'Travel', color: 'yellow' },
    { value: 30, label: 'Food', color: '#00008B' },
  ];

  return (
    <div className='cart'>
      <div className='cart_main'>
        <div className='cart1'>
          <h1 className='head'>Wallet Balance: <span>₹4500</span> </h1>
          <button className='btn' onClick={handleAddIncome}>+ Add Income</button>
        </div>
        <div className='cart2'>
          <h1 className='head'>Expenses: <span>₹500</span> </h1>
          <button className='btn1' onClick={handleAddExpenses}>+ Expense</button>
        </div>
        <EllipsePieChart />
      </div>

      {showIncomeAlert && (
        <div className='alertBar'>
          <h2>Add Income</h2>
          <input type='number' value={incomeAmount} onChange={(e) => setIncomeAmount(e.target.value)} placeholder='Income Amount' />
          <div>
            <button className='addBtn' onClick={handleAddIncomeConfirm}>Add Income</button>
            <button className='cancelBtn' onClick={handleCancelIncome}>Cancel</button>
          </div>
        </div>
      )}

      {showExpenseAlert && (
        <div className='alertBar'>
          <h2>{editIndex !== null ? 'Edit Expense' : 'Add Expense'}</h2>
          <input type='text' value={expenseTitle} onChange={(e) => setExpenseTitle(e.target.value)} placeholder='Title' />
          <input type='number' value={expensePrice} onChange={(e) => setExpensePrice(e.target.value)} placeholder='Price' />
          <select value={expenseCategory} onChange={(e) => setExpenseCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="Samosa"><LocalPizzaIcon /></option>
            <option value="Movie"><CardGiftcardIcon /></option>
            <option value="Auto"><LuggageIcon /></option>
          </select>
          <input type='date' value={expenseDate} onChange={(e) => setExpenseDate(e.target.value)} />
          <div>
            <button className='addBtn' onClick={handleAddExpenseConfirm}>{editIndex !== null ? 'Edit Expense' : 'Add Expense'}</button>
            <button className='cancelBtn' onClick={handleCancelExpense}>Cancel</button>
          </div>
        </div>
      )}

      <div className='expenses'>
        <h2>Recent Transactions</h2>
        {expenses.slice(startIndex, endIndex).map((expense, index) => (
          <div key={index} className='expense'>
            <div className='expense-details'>
              {expense.category === 'Samosa' && <LocalPizzaIcon />}
              {expense.category === 'Movie' && <CardGiftcardIcon />}
              {expense.category === 'Auto' && <LuggageIcon />}
              <span>{expense.title}</span>
              <span className='price'>₹{expense.price}</span>
              <h5>{new Date(expense.date).toLocaleDateString()}</h5>
            </div>
            <div className='expense-actions'>
              <button onClick={() => handleEditExpense(index + startIndex)}><ModeEditOutlineIcon style={{ color: 'yellow' }} /></button>
              <button onClick={() => handleDeleteExpense(index + startIndex)}><ClearIcon style={{ color: 'white', backgroundColor: 'red', borderRadius: '50%' }} /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>{'<'}</button>
          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>{i + 1}</button>
            ))}
          </div>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>{'>'}</button>
        </div>
      )}

      {/* Bar line ("Top Expenses") */}
      <Box display="flex" flexDirection="column" alignItems="center" style={{ marginLeft: '70px', marginRight: '20px' }}>
        <h2 style={{ marginTop: '0px' }}>Top Expenses</h2>
        <div style={{ height: '20%', width: '40%', marginBottom: '20px', backgroundColor: '#ccc' }}>
          {/* Bar line content */}
        </div>
      </Box>

      {/* Pie Chart for Expenses */}
      <div className="pie-chart-container" style={{ width: '40%', height: '40%' }}>
        <PieChart
          series={[
            {
              arcLabel: (item) => `${item.label}`, // Label each arc with its corresponding category
              arcLabelMinAngle: 45,
              data: pieChartData, // Pass the data for the pie chart
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: 'white',
              fontWeight: 'bold',
            },
          }}
        />
      </div>
    </div>
  );
};

export default Card;
