import { useState } from "react";
import ExpenseList from "./expense-tracker/components/ExpenseList";
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
import ExpenseForm from "./expense-tracker/components/ExpenseForm";

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const handleDelete = (id: number) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const handleAddExpense = (newExpense: Omit<Expense, "id">) => {
    const newId = expenses.length ? expenses[expenses.length - 1].id + 1 : 1;
    setExpenses([...expenses, { id: newId, ...newExpense }]);
  };

  const visibleExpenses = selectedCategory
    ? expenses.filter((expense) => expense.category === selectedCategory)
    : expenses;

  return (
    <>
      <h1 className="text-center">Expense Tracker</h1>
      <div className="m-5">
        <ExpenseForm onAddExpense={handleAddExpense} />
      </div>
      <div className="m-5">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </div>
      <div className="m-5">
        <ExpenseList expenses={visibleExpenses} onDelete={handleDelete} />
      </div>
    </>
  );
};

export default App;
