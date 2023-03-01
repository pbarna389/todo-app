import { useContext } from "react";
import { TodoContext } from "../context/todoContext";
import { FormContext } from "../context/formContext";
import { TimerContext } from "../context/timerContext";

import { Todo, listItemProps, ITodoContext, IFormContext, ITimerContext } from "../../@types/todo"; 

import edit from "../assets/imgs/edit.svg"
import remove from "../assets/imgs/trashcan.svg"
import plus from "../assets/imgs/plus.svg"
import minus from "../assets/imgs/minus.svg"

import "../styles/ListItem.css";

const ListItem:React.FC<listItemProps> = ({ element, handleLiDrag, handleDrop, handleFinish, handleLiDragStart, index }) => {  

  const { 
    todos, setTodos, 
    done, setDone,  
    overMouseElement, setOverMouseElement, 
    overMouseParent, setOverMouseParent, 
    overMouseIdx, setOverMouseIdx, 
    order 
  } = useContext(TodoContext) as ITodoContext;

  const {
    setRemoveForm,
    editMode,
    setEditMode,
    formTimeoutId,
    setFormTimeoutId,
    setSelectToEdit,
    changeForm
  } = useContext(FormContext) as IFormContext;

  const {
    setOptionElementSelected,
    setInfoID,
    handleClickAgain,
    handleInfoCard
  } = useContext(TimerContext) as ITimerContext;

  const listItemStyle = {
    borderTop: order === "higher" && element.title === overMouseElement ? "10px solid #7e81b1" : "",
    borderBottom: order === "lower" && element.title === overMouseElement ? "10px solid #7e81b1" : "",
  };

  const selectConnectedElement = (e:any):void => {
    if (overMouseElement !== element.title) {
      
      const target = e.target;
      console.log(target.classList.value.includes("options-wrapper"));
      const dataAttr = target.classList.value.includes("options-wrapper") ? target.getAttribute("data-options") : target.classList.value.includes("edit") ? target.getAttribute("data-edit") : target.classList.value.includes("column-change") ? target.getAttribute("data-change") : target.getAttribute("data-delete");

      console.log(dataAttr, e.target.classList.value)

      const selectCorrEl = document.querySelector(`[data-title="${dataAttr}"]`)!;
      const selectCorrElData = selectCorrEl.getAttribute("data-title");
      console.log(selectCorrElData, overMouseIdx);
      setOverMouseElement(selectCorrElData);

      if (overMouseParent === "todos") {
        todos.forEach((el, idx) => {
          if (el.title === selectCorrElData && idx !== overMouseIdx) {
            setOverMouseIdx(idx);
          }
        });
      } else if (overMouseParent === "done") {
          done.forEach((el, idx) => {
            if (el.title === selectCorrElData && idx !== overMouseIdx) {
            setOverMouseIdx(idx);
          }
        })
      }
    }
  };
  
  const wrapperDragOver = (e:any):void => {
    const target = e.target;
    const dataAttr = target.classList.value.includes("listItem-wrapper") ? target.getAttribute("data-wrapper") : target.classList.value.includes("listItem") ? target.getAttribute("data-title") : target.classList.value.includes("options-wrapper") ? target.getAttribute('data-options') : target.classList.value.includes("edit") ? target.getAttribute("data-edit") : target.classList.value.includes("column-change") ? target.getAttribute('data-change'): target.getAttribute('data-delete');
    // console.log(target)
    const newOverElement = document.querySelector(`[data-title="${dataAttr}"]`)!;
    const newOvElData = newOverElement.getAttribute("data-title");
    // console.log(newOvElData)
    if (overMouseElement !== newOvElData) setOverMouseElement(newOvElData);
    
    if (overMouseParent === "todos") {
      todos.forEach((el, idx) => {
        if (el.title === newOvElData && idx !== overMouseIdx) {
          setOverMouseIdx(idx);
        }
      });
    } else if (overMouseParent === "done") {
        done.forEach((el, idx) => {
          if (el.title === newOvElData && idx !== overMouseIdx) {
          setOverMouseIdx(idx);
        }
      })
    } else {
      setOverMouseIdx(null);
    }
  };

  const wrapperMouseOver = (e:any):void => {
    const target = e.target;
    const parent = target.parentNode;
    console.log(parent);

    const parentValueToSet = parent.classList.value.includes("listItem-wrapper") ? parent.parentNode.classList.value : parent.classList.value.includes("options-wrapper") ? parent.parentNode.parentNode.parentNode.classList.value : parent.classList.value.includes("listItem") ? parent.parentNode.parentNode.classList.value : parent.classList.value;

    console.log(parentValueToSet)
    
    wrapperDragOver(e);

    setOverMouseParent(parentValueToSet);
    
  };
  
  const wrapperMouseLeave = ():void => {
    setOverMouseParent(null);
    setOverMouseElement(null);
  };

  const toggleElement = (e:any) => {
    // console.log(overMouseElement);
    const movingElement:Todo[] = overMouseParent === "done" ? done.filter((el: Todo) => el.title === overMouseElement) : todos.filter((el: Todo) => el.title === overMouseElement);
    if (overMouseParent === "done") {
      setTodos((prev) => [...prev, { id: todos.length + 1, priority: movingElement[0].priority, title: movingElement[0].title, finished: false}]);

      const newDone:Todo[] = [...done].filter((el:Todo) => el.title !== movingElement[0].title);

      handleInfoCard(`Re-added to the todo list: ${movingElement[0].title}`)
      setDone(newDone);
    } else {
      setDone((prev) => [...prev, { id: todos.length + 1, priority: movingElement[0].priority, title: movingElement[0].title, finished: true}]);

      const newTodos:Todo[] = [...todos].filter((el:Todo) => el.title !== movingElement[0].title);

      handleInfoCard(`Finished item: ${movingElement[0].title}`)
      setTodos(newTodos);
    }
  };

  const editModeToggle = (e: any):void => {
    const target = e.target;
    const dataAttr = target.getAttribute("data-type");

    let elementToChange: Todo = {id:0, title:"", priority:"", finished:false};
    overMouseParent === "todos" ? todos.forEach(el => el.title === overMouseElement ? elementToChange = el : el = el) : done.forEach(el => el.title === overMouseElement ? elementToChange = el : el = el);
    console.log(elementToChange);
    if (!editMode) {
      console.log("clicked");
      setRemoveForm(true);
      setSelectToEdit(elementToChange);
      
      setOptionElementSelected(dataAttr);
      setInfoID(elementToChange.id);
      
      changeForm(editMode, setEditMode, formTimeoutId, setFormTimeoutId, 250);

      handleInfoCard(`Element edited: ${elementToChange.title}`);
    } else {
      setSelectToEdit(elementToChange)

      setOptionElementSelected(dataAttr);
      setInfoID(elementToChange.id);
      handleClickAgain();

      handleInfoCard(`Edited element changed to ${elementToChange.title}`)
    }
  };
  
  const deleteElement = (e:any):void => {
    const target = e.target;
    const dataType = target.getAttribute("data-type");

    if (!editMode) {
      const dataAttr = target.getAttribute("data-delete");
      const selectCorrEl = document.querySelector(`[data-title="${dataAttr}"]`)!;
      const selectedValue = selectCorrEl.getAttribute('data-title');
      console.log(dataAttr, selectCorrEl, selectedValue, overMouseParent);
  
      const newArr = overMouseParent === "todos" ? [...todos] : [...done];
      console.log(newArr);
      const findElement = {...newArr.filter((el) => el.title === selectedValue)}[0];
      console.log(findElement)
      const targetIndex = newArr.indexOf(findElement);
      console.log(targetIndex)
      
      const splicedArr = newArr.splice(targetIndex);
      splicedArr.shift();
      const result = newArr.concat(splicedArr);
      overMouseParent === "todos" ? setTodos(result) : setDone(result);
      
      if (overMouseParent) {
        setInfoID(element.id);
        setOptionElementSelected(dataType);
        handleInfoCard(`${element.title} removed from ${overMouseParent?.charAt(0).toUpperCase() + overMouseParent?.slice(1)}`)
      }
      
    } else {
      setInfoID(element.id);
      setOptionElementSelected(dataType);
      handleInfoCard("You can't delete items while editing!");
    }
  };
  

  return (
    <div className="listItem-wrapper"
      onMouseOver={(e) => wrapperMouseOver(e)}
      onMouseLeave={(e) => wrapperMouseLeave}
      onDragOver={(e) => wrapperDragOver(e)}
      data-wrapper={element.title}
      data-div-type="listItem-wrapper"
      >
      <div draggable={true}
        style={listItemStyle}
        className={`listItem${index === 0 ? " first-item" : ""} ${element.finished ? "" : element.priority === "High" ? "high" : element.priority === "Medium" ? "medium" : "low"}`}
        onDragStart={e => handleLiDragStart(e)}
        onDragOver={(e) => handleLiDrag(e)}
        onDragEnd={(e) => handleDrop(e)}
        data-title={element.title}
      >
        {element.title}
      <div className="options-wrapper" data-options={element.title} data-div-type="options-wrapper" onMouseOver={e => selectConnectedElement(e)}>
        {
          element.finished ? 
            <img draggable="false" src={plus} className="column-change" onClick={e => toggleElement(e)} data-change={element.title} data-type="column-change" />
            : <img draggable="false" src={minus} className="column-change" onClick={e => toggleElement(e)} data-change={element.title} data-type="column-change" />
        }
        <img draggable="false" src={edit} className="edit" data-edit={element.title} data-type="edit" onClick={e => editModeToggle(e)} />
        <img draggable="false" src={remove} className="delete" data-delete={element.title} data-type="delete" onClick={e => deleteElement(e)} /> 
      </div>  
      </div>
    </div>
  );
};

export default ListItem;
