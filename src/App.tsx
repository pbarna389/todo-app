import { useEffect, useContext } from "react";
import { TodoContext } from "./context/todoContext";
import { TimerContext } from "./context/timerContext"; 

import FormProvider from './context/formContext';

import { Todo, ITodoContext, ITimerContext } from "../@types/todo";

import "./App.css";

import Form from "./components/Form";
import Header from "./components/Header";
import InfoCard from "./components/InfoCard";
import ListItem from "./components/ListItem";
import PlaceboItem from "./components/PlaceboItem";

const App = () => {

  const { 
    todos, 
    setTodos, 
    done, 
    setDone, 
    draggedMouseElement, 
    setDraggedMouseElement, 
    draggedMouseParent, 
    setDraggedMouseParent,
    overMouseElement, 
    setOverMouseElement,
    overMouseParent,
    setOverMouseParent,
    draggedIdx, 
    setDraggedIdx, 
    overMouseIdx, 
    setOverMouseIdx,
    setDragging,
    setOrder,
    dragging
  } = useContext(TodoContext) as ITodoContext;

  const {
    handleInfoCard
  } = useContext(TimerContext) as ITimerContext;

  //THE LOGIC OF SWITCHING UP OF THE ORDER WITH THE MOUSE
  
  useEffect(() => {
    console.log(draggedMouseElement, draggedMouseParent);
    if (draggedMouseParent === "todos") {
          
      todos.forEach((el, idx) => {
        if (el.title === draggedMouseElement) {
          setDraggedIdx(idx)
        }
      })
    } else {
      done.forEach((el, idx) => {
        if (el.title === draggedMouseElement) {
          setDraggedIdx(idx)
        }
      })
    }
  }, [draggedMouseElement]);

  useEffect(() => {
    if (overMouseParent === draggedMouseParent) {
      if (overMouseIdx === 0 && draggedIdx === 0) {
        console.log("same")
        setOrder("same")
      }
      if (overMouseIdx === 0 && draggedIdx === 1) {
        console.log("higher");
        setOrder("higher");
      }
      if (draggedIdx === 0 && draggedIdx < overMouseIdx!) {
        setOrder("lower")
      }
        if (draggedIdx && overMouseIdx) {
          
          if (overMouseIdx < draggedIdx) {
            console.log("higher")
            setOrder("higher");
          }
          if (overMouseIdx > draggedIdx) {
            console.log("lower");
            setOrder("lower");
          }
          if (overMouseIdx === draggedIdx) {
            console.log("same")
            setOrder("same")
          }
        }
    } else {
      setOrder("none");
    }
    }, [overMouseIdx])
  
  const setDefault = (): void => {
    setOverMouseElement(null);
    setOverMouseParent(null);
    setDraggedMouseElement(null);
    setDraggedMouseParent(null);
    setDraggedIdx(null);
    setOverMouseIdx(null);
    setDragging(false);
    setOrder("none");
  };

  const getDataAttr = (e: any):string => {
    const target = e.target;
    const elementTitle = target.getAttribute("data-title");

    return elementTitle;
  };

  const handleLiDragStart = (e:any):void => {
    setDragging(true);

    const newDragElement = getDataAttr(e);
    setDraggedMouseElement(newDragElement);
    
    const parentTarget = e.target.parentNode.parentNode.getAttribute("data-parent");
    setDraggedMouseParent(parentTarget);

    console.log(draggedMouseElement, draggedMouseParent);
  };

  const handleLiDrag = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();

    let elementSelect = getDataAttr(e);

    if (elementSelect !== overMouseElement) {
      if (elementSelect === "Edit" || elementSelect === "edit" || elementSelect === null ) {
        setOverMouseElement(overMouseElement);
      } else {
        setOverMouseElement(elementSelect);
      }
    }
  };

  const handleSetNewList = (parent: string):void => {
    const newArray = parent === "todos" ? [...todos] : [...done];

    if (overMouseParent !== draggedMouseParent) return;

    if (overMouseIdx === 0! && draggedIdx! > overMouseIdx!) {
      // console.log("First element");
        const splicedDraggedArr:Todo[] = newArray.splice(draggedIdx!);
        const newMovedElement:Todo = splicedDraggedArr.shift()!;

        const newList:Todo[] = [newMovedElement]?.concat(newArray)?.concat(splicedDraggedArr);
        // console.log(newList);

        handleInfoCard(`Element moved to the first position: ${draggedMouseElement}`)

        parent === "todos"
        ? setTodos(newList)
        : setDone(newList!);

      } else if (overMouseIdx === newArray.length -1 ! && draggedIdx! < overMouseIdx!) {
        // console.log("Last Element");
        const splicedDraggedArr:Todo[] = newArray.splice(draggedIdx!);
        const newMovedElement:Todo = splicedDraggedArr.shift()!;

        const newList:Todo[] = newArray?.concat(splicedDraggedArr)?.concat(newMovedElement);
        // console.log(newList);

        handleInfoCard(`Element moved to the last position: ${draggedMouseElement}`)

        parent === "todos"
        ? setTodos(newList)
        : setDone(newList);

      } else if (draggedIdx! > overMouseIdx!) {
        // console.log("draggedIdx higher")
        const splicedDraggedArr:Todo[] = newArray.splice(draggedIdx!);
        const newMovedElement:Todo = splicedDraggedArr.shift()!;

        const splicedOverArr:Todo[] = newArray?.splice(0, overMouseIdx! + 1);
        const afterMovedElement: Todo = splicedOverArr.pop()!;
        const newList:Todo[] = splicedOverArr?.concat(newMovedElement)?.concat(afterMovedElement)?.concat(newArray)?.concat(splicedDraggedArr);
        // console.log(newList)

        handleInfoCard(`${draggedMouseElement} changed it's position with ${overMouseElement}`)

        parent === "todos"

        ? setTodos(newList)
        : setDone(newList);

      } else if (draggedIdx! < overMouseIdx!) {
        // console.log("OvermouseIdx is higer")
        const splicedDraggedArr: Todo[] = newArray.splice(0, draggedIdx! + 1);
        const newMovedElement: Todo = splicedDraggedArr.pop()!;
        
        const splicedOverArr: Todo[] = newArray?.splice(overMouseIdx! - (draggedIdx! + 1));
        const afterMovedElement: Todo = splicedOverArr.shift()!;
        // console.log(draggedIdx, newMovedElement, splicedDraggedArr, newArray),
        // console.log(overMouseIdx! - (draggedIdx! + 1), afterMovedElement, splicedOverArr, newArray)


        const newList: Todo[] = splicedDraggedArr.concat(newArray).concat(afterMovedElement).concat(newMovedElement).concat(splicedOverArr);
        // console.log(newList);

        handleInfoCard(`${draggedMouseElement} changed it's position with ${overMouseElement}`);

        parent === "todos"

        ? setTodos(newList)
        : setDone(newList);
      };
      setDefault();
    };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    console.log("dropping li");
    
    const dataAttr = getDataAttr(e);
    console.log(
      `dropping on ${overMouseElement}, task is ${dataAttr}`
    );

    const includesTodos = todos.filter((el) => el.title === dataAttr);
    const includesDone = done.filter((el) => el.title === dataAttr);
    if (overMouseParent === "todos" && includesTodos) {
      handleSetNewList(overMouseParent);
    }
    if (overMouseParent === "done" && includesDone) {
      handleSetNewList(overMouseParent);
    }
  };

  //THE LOGIC OF MOVING ELEMENTS BETWEEN STATES W CLICKING OR JUST DROPPING ON THE OTHER LIST

  const handleAddDone = (event: React.MouseEvent<HTMLDivElement>, movingElement:any = "Medium"): void => {
    // console.log("Adding TO finished");
    const dataAttr = getDataAttr(event);

    setDone((prev) => [
      ...prev,
      { id: done.length + 1, priority: movingElement.priority ? movingElement.priority : movingElement, title: dataAttr, finished: true },
    ]);
    // console.log("New element set")
    const newArr = todos
      .filter((el) => el.title !== dataAttr)
      .map(
        (el, idx) =>
          (el = { id: idx + 1, priority: el.priority, title: el.title, finished: el.finished })
      );
    // console.log("New todos list created");
    setTodos(newArr);
    setOverMouseElement(null);
    setOverMouseParent(null);
  };

  const handleAddTodos = (event: React.MouseEvent<HTMLDivElement>, movingElement:any = "Medium"):void => {
    console.log(movingElement)
    const dataAttr = getDataAttr(event);

    setTodos((prev) => [
      ...prev,
      { id: todos.length + 1, priority: movingElement.priority ? movingElement.priority : movingElement, title: dataAttr, finished: false },
    ]);
    const newArr = done
      .filter((el) => el.title !== dataAttr)
      .map(
        (el, idx) =>
          (el = { id: idx + 1, priority: el.priority, title: el.title, finished: el.finished })
      );
    setDone(newArr);
    setOverMouseElement(null);
    setOverMouseParent(null);
  };

  const handleFinish = (e: React.MouseEvent<HTMLDivElement>, element: Todo): void => {
    if (!element.finished) {
      handleAddDone(e, element);
    } else {
      handleAddTodos(e, element);
    }
  };

    const onDragEnter = (e: any): void => {
        console.log("hover over ul");
        const target = e.target;
        // console.log(e.target);

        let parentTarget = target.parentNode;
        console.log(parentTarget);
        if (parentTarget.classList.value.includes("options-wrapper")) {
        const placeholder = parentTarget.parentNode
        parentTarget = placeholder.parentNode;
        console.log(parentTarget);
        }
        if (parentTarget.classList.value.includes("listItem-wrapper")) {
        parentTarget = parentTarget.parentNode;
        }

        setOverMouseParent(parentTarget.classList.value);
        if (target.classList.value === "edit") {
        setOverMouseElement(parentTarget.classList.value);
        } else {
        setOverMouseElement(target.classList.value);
        }
    };

    const onDragOver = (e: any) => {
        e.preventDefault();
    }

    const onDragEnd = (e: any): void => {
        console.log("Drag ends");
        const oldDone = done.map((el) => el.title);
        const oldTodos = todos.map((el) => el.title);
        console.log(overMouseParent);

        let movingElement = {};
        const dataAttr = getDataAttr(e);
        if (overMouseParent === "todo-wrapper") {
        overMouseElement === "todos" ? done.forEach(el => el.title === dataAttr ? movingElement = el : "") : todos.forEach(el => el.title === dataAttr ? movingElement = el : "")
        } else {
        overMouseParent === "todos" ? done.forEach(el => el.title === dataAttr ? movingElement = el : "") : todos.forEach(el => el.title === dataAttr ? movingElement = el : "");
        }
        console.log(movingElement)

        const addElement = (e: any, handle: boolean, type: string):void => {
        if (handle) {
            if (type === "todos" && overMouseParent) {
            // console.log("added to list");
            handleInfoCard(`${draggedMouseElement} moved to ${overMouseParent?.charAt(0).toUpperCase() + overMouseParent?.slice(1)}`)

            handleAddTodos(e, movingElement);
            setOverMouseParent(null);
            setOverMouseElement(null);
            } else if (type === "done" && overMouseParent) {
            // console.log("added to finished");
            handleInfoCard(`${draggedMouseElement} moved to ${overMouseParent?.charAt(0).toUpperCase() + overMouseParent?.slice(1)}`)

            handleAddDone(e, movingElement);
            setOverMouseParent(null);
            setOverMouseElement(null);
            }
        } else {
            setOverMouseParent(null);
            setOverMouseElement(null);
        }
        }

        if (overMouseParent === "todo-wrapper") {
        if (overMouseElement === "done") {
            if (!oldDone.includes(dataAttr)) {
            addElement(e, true, "done")
            } else {
            addElement(e, false, "done")
            }
        }

        if (overMouseElement === "todos") {

            if (!oldTodos.includes(dataAttr)) {
            addElement(e, true, "todos", )
            } else {
            addElement(e, false, "todos")
            }
        }
        }

        if (overMouseParent === "done") {
        if (!oldDone.includes(dataAttr)) {
            addElement(e, true, "done", )
        } else {
            addElement(e, false, "done")
        };
        }

        if (overMouseParent === "todos") {
        if (!oldTodos.includes(dataAttr)) {
            addElement(e, true, "todos", )
        }  else {
            addElement(e, false, "todos")
        };
        }
    };

  return (
      <div className="App" onDragEnd={setDefault} >
        <Header />
        <main>
        <FormProvider>
            <InfoCard />
            <Form />
              <section className="todo-wrapper">
                <div
                  style={{ 
                    borderBottom: dragging && overMouseParent === "todos" && overMouseParent !== draggedMouseParent ? "10px solid #7e81b1" : "" 
                  }}
                  className="todos"
                  onDragEnter={(e) => onDragEnter(e)}
                  onDragOver={e => onDragOver(e)}
                  onDragEnd={(e) => onDragEnd(e)}
                  data-parent="todos"
                >
                  <h2 draggable={false}>Todos</h2>
                  {todos.length !== 0
                    ? todos.map((el, idx) => (
                        <ListItem
                          handleLiDragStart={handleLiDragStart}
                          handleLiDrag={handleLiDrag}
                          handleDrop={handleDrop}
                          handleFinish={handleFinish}
                          key={el.title}
                          element={el}
                          index={idx}
                        />
                      ))
                    : <PlaceboItem text={"Add a new item or drop here some!"} />}
                </div>
                <div
                  style={{ 
                    borderBottom: dragging && overMouseParent === "done" && overMouseParent !== draggedMouseParent ? "10px solid #7e81b1" : "" 
                  }}
                  className="done"
                  onDragEnter={(e) => onDragEnter(e)}
                  onDragOver={e => onDragOver(e)}
                  onDragEnd={(e) => onDragEnd(e)}
                  data-parent="done"
                >
                  <h2 draggable={false}>Finished</h2>
                  {done.length !== 0
                    ? done.map((el, idx) => (
                        <ListItem
                          handleLiDragStart={handleLiDragStart}
                          handleLiDrag={handleLiDrag}
                          handleDrop={handleDrop}
                          handleFinish={handleFinish}
                          key={el.title}
                          element={el}
                          index={idx}
                        />
                      ))
                    : <PlaceboItem text={"Drop some items here!"} />}
                </div>
              </section>
          </FormProvider>
        </main>
      </div>
  );
}

export default App;
