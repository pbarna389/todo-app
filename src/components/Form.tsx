import { FormEvent, useState, useEffect, useContext } from 'react';
import { ITodoContext, IFormContext, ITimerContext } from "../../@types/todo"; 

import { TodoContext } from "../context/todoContext";
import { FormContext } from '../context/formContext';
import { TimerContext } from '../context/timerContext';

import "../styles/Form.css"

const Form: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [selectedToEdit, setSelectedToEdit] = useState<string>("");
  const [prio, setPrio] = useState<string>("");

  const {
    todos, setTodos, done
  } = useContext(TodoContext) as ITodoContext;

  const {
    editMode,
    setEditMode,
    formTimeoutId,
    setFormTimeoutId,
    removeForm,
    setRemoveForm,
    selectToEdit,
    changeForm
  } = useContext(FormContext) as IFormContext;

  const {
    handleInfoCard
  } = useContext(TimerContext) as ITimerContext;

  useEffect(() => {
    if (selectToEdit) {
      setSelectedToEdit(selectToEdit.title)
      setPrio(selectToEdit.priority)
    }
  }, [selectToEdit])
  
  const addNewTodo = (e:FormEvent):void => {
    if (todo === null || todo.length === 0) return;
    const todoList = [...todos];
    const filteredTodosList = todoList.filter(e => e.title.toLowerCase() === todo.toLowerCase());
    const filteredDoneList = done.filter(e => e.title.toLowerCase() === todo.toLowerCase());
    if (filteredTodosList.length !== 0 || filteredDoneList.length !== 0) {
      handleInfoCard("You can't add the same name to a to-do!")
    } else {
      setTodos(prev => [...prev, {id: todos.length + done.length, priority: "Medium", title: todo, finished: false}]);
      setTodo("");
      handleInfoCard(`New todo added to the list: ${todo}`)
    }
  };

  const handleSubmit = (e:FormEvent):void => {
    e.preventDefault();
    if (todo.length === 0) {
      handleInfoCard("You must type in your todo's name!")
    } else {
      addNewTodo(e)
    }
  };
  
  const handleSubmitEdit = (e:FormEvent):void => {
    e.preventDefault();
    console.log("ENTER ADDING MODE");
    if (selectToEdit) {
      selectToEdit.title = selectedToEdit;
      selectToEdit.priority = prio;
      setRemoveForm(false);
      changeForm(editMode, setEditMode, formTimeoutId, setFormTimeoutId, 250);
      handleInfoCard("Your changes has been saved!");
    }
  };

  return (
    <section className="section-form">
      <h1>Todo list</h1>
      {
      !editMode ? 
        <form className={removeForm ? "addElementMode change" : "addNewElement"} onSubmit={e => handleSubmit(e)}>
            <input type="text" name="" id="" placeholder='Type in your to-do' value={todo} onChange={e => setTodo(e.target.value)} data-input="form"/>
            <button type='submit' data-btn="form">Add to the list</button>
        </form>
      :
        <form className={!removeForm ? "change edit-mode" : "edit-mode"} onSubmit={e => handleSubmitEdit(e)}>
          <div className="edit-settings">
            <div>
              <label>Title:
                <input type="text" name="" id="" value={selectedToEdit} onChange={e => setSelectedToEdit(e.target.value)} data-edit-input="form-edit" />
              </label>
            </div>
            <div>
              <label className="label-prio">Priorities:
              <select name="priorities" id="prio" value={prio} onChange={e => setPrio(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              </label>
            </div>
          </div>
          <button type="submit" data-edit-btn="form-edit">Save</button>
        </form>
      }
    </section>
  )
};

export default Form;