import { deleteTaskAction, toggleTaskAction } from "@/actions/task.actions";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import type { Task } from "@/types/database.types";

export function TasksTable({ tasks }: { tasks: Task[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            <th className="px-4 py-3">Done</th>
            <th className="px-4 py-3">Task</th>
            <th className="px-4 py-3">Due Date</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {tasks.map((task) => (
            <tr key={task.id}>
              <td className="px-4 py-4">
                <form action={toggleTaskAction.bind(null, task.id, !task.completed)}>
                  <button
                    type="submit"
                    className="h-5 w-5 rounded border border-slate-300"
                    aria-label="Toggle task"
                  >
                    {task.completed ? "✓" : ""}
                  </button>
                </form>
              </td>
              <td className="px-4 py-4">
                <p className="font-semibold text-slate-950">{task.title}</p>
                <p className="mt-1 max-w-md truncate text-slate-500">
                  {task.description}
                </p>
              </td>
              <td className="px-4 py-4">{formatDate(task.due_date)}</td>
              <td className="px-4 py-4 text-right">
                <form action={deleteTaskAction.bind(null, task.id)}>
                  <Button variant="danger" type="submit">
                    Delete
                  </Button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
