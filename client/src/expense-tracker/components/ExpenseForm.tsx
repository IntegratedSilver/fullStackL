import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const expenseSchema = z.object({
  description: z.string().min(1, "Description is required"),
  amount: z.number().min(0.01, "Amount must be greater than zero"),
  category: z.enum(["Utilities", "Entertainment", "Food", "Shopping", "Groceries"])
});

type ExpenseFormValues = z.infer<typeof expenseSchema>;

interface ExpenseFormProps {
  onAddExpense: (data: ExpenseFormValues) => void;
}

const ExpenseForm = ({ onAddExpense }: ExpenseFormProps) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema)
  });

  const onSubmit = (data: ExpenseFormValues) => {
    onAddExpense(data);
    reset(); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label>Description</label>
        <input className="form-control" {...register("description")} />
        {errors.description && <p className="text-danger">{errors.description.message}</p>}
      </div>
      <div className="form-group">
        <label>Amount</label>
        <input type="number" className="form-control" {...register("amount", { valueAsNumber: true })} />
        {errors.amount && <p className="text-danger">{errors.amount.message}</p>}
      </div>
      <div className="form-group">
        <label>Category</label>
        <select className="form-control" {...register("category")}>
          <option value="">Select Category</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Food">Food</option>
          <option value="Shopping">Shopping</option>
          <option value="Groceries">Groceries</option>
        </select>
        {errors.category && <p className="text-danger">{errors.category.message}</p>}
      </div>
      <button type="submit" className="btn btn-primary mt-3">Add Item</button>
    </form>
  );
};

export default ExpenseForm;