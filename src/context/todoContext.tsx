import { useState, createContext } from 'react'
import { Todo, ITodoContext, IProviderProps, Torder } from '../../@types/todo';

export const TodoContext = createContext<ITodoContext | null>(null);

export const TodoProvider:React.FC<IProviderProps> = ({ children }) => {
    const [todos, setTodos] = useState<Todo[]>([
        // { id: 0, title: "Work", priority: "Medium", finished: false },
        // { id: 1, title: "Eat", priority: "Medium", finished: false },
        // { id: 2, title: "Sleep", priority: "Medium", finished: false },
    ]);
    const [done, setDone] = useState<Todo[]>([
        // { id: 3, title: "Wake up", priority: "Medium", finished: true },
    ]);

    const [draggedMouseElement, setDraggedMouseElement] = useState<string | null>(null);
    const [draggedMouseParent, setDraggedMouseParent] = useState<string | null>(null);

    const [overMouseElement, setOverMouseElement] = useState<string | null>(null);
    const [overMouseParent, setOverMouseParent] = useState<string | null>(null);

    const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
    const [overMouseIdx, setOverMouseIdx] = useState<number | null>(null);

    const [dragging, setDragging] = useState<boolean>(false);
    const [order, setOrder] = useState<Torder>("none");

    return (
        <TodoContext.Provider 
            value={{ 
            todos, setTodos, done, setDone, draggedMouseElement, setDraggedMouseElement, draggedMouseParent, setDraggedMouseParent, overMouseElement, setOverMouseElement, overMouseParent, setOverMouseParent, draggedIdx, setDraggedIdx, overMouseIdx, setOverMouseIdx, dragging, setDragging, order, setOrder 
            }}>
            {children}
        </TodoContext.Provider>
    );
};

export default TodoProvider;
