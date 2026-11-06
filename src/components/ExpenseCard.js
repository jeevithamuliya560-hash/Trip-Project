export default function ExpenseCard({ expense }) {
  return (
    <article className="expense-row">
      <div className="expense-icon" aria-hidden="true">
        {expense.category === "Stay" ? "⌂" : expense.category === "Transport" ? "↗" : "•"}
      </div>
      <div className="expense-info">
        <strong>{expense.title}</strong>
        <span>{expense.category} · {expense.date}</span>
      </div>
      <strong className="expense-amount">
        ₹{Number(expense.amount).toLocaleString("en-IN")}
      </strong>
    </article>
  );
}