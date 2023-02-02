export interface Todo {
    readonly id: number;
    title: string;
    priority: string,
    finished: boolean;
};

export type Torder = "none" | "higher" | "lower" | "same";

export interface ITodoContext {
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    done: Todo[],
    setDone: React.Dispatch<React.SetStateAction<Todo[]>>,
    draggedMouseElement: string | null,
    setDraggedMouseElement: React.Dispatch<React.SetStateAction<string | null>>,
    draggedMouseParent: string | null,
    setDraggedMouseParent: React.Dispatch<React.SetStateAction<string | null>>,
    overMouseElement: string | null,
    setOverMouseElement: React.Dispatch<React.SetStateAction<string | null>>,
    overMouseParent: string | null,
    setOverMouseParent: React.Dispatch<React.SetStateAction<string | null>>,
    draggedIdx: number | null, 
    setDraggedIdx: React.Dispatch<React.SetStateAction<number | null>>,
    overMouseIdx: number | null, 
    setOverMouseIdx: React.Dispatch<React.SetStateAction<number | null>>
    dragging: boolean,
    setDragging: React.Dispatch<React.SetStateAction<boolean>>,
    order: Torder,
    setOrder: React.Dispatch<React.SetStateAction<Torder>>
};

export interface IFormContext {
    removeForm: boolean,
    setRemoveForm: React.Dispatch<React.SetStateAction<boolean>>,
    editMode: boolean,
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
    formTimeoutId: number | undefined, 
    setFormTimeoutId: React.Dispatch<React.SetStateAction<number | undefined>>
    selectToEdit: Todo | null,
    setSelectToEdit: React.Dispatch<React.SetStateAction<Todo | null>>
    changeForm(mode:boolean, setMode:React.Dispatch<React.SetStateAction<boolean>>, timeoutID:number | undefined, setTimeoutID: React.Dispatch<React.SetStateAction<number | undefined>>, timeoutTime:number): any,
}

export interface ITimerContext {
    infoCardOn: boolean,
    setInfoCardOn: React.Dispatch<React.SetStateAction<boolean>>
    infoCardText: string | null,
    setInfoCardText: React.Dispatch<React.SetStateAction<string | null>>
    infoCardTimeoutID: number | undefined,
    setInfoCardTimeoutID: React.Dispatch<React.SetStateAction<number | undefined>>
    optionElementSelected: string | null,
    setOptionElementSelected: React.Dispatch<React.SetStateAction<string | null>>,
    infoID: number | null, 
    setInfoID: React.Dispatch<React.SetStateAction<number | null>>
    clickedAgain: boolean, 
    setClickedAgain: React.Dispatch<React.SetStateAction<boolean>>
    clickedAgainTimeoutID: number | undefined,
    setClickedAgainTimeoutID: React.Dispatch<React.SetStateAction<number | undefined>>
    infoCardTimeoutReset(): any; 
    removeInfoCard(setInfoCardOn: React.Dispatch<React.SetStateAction<boolean>>, setInfoCardTimeoutID: React.Dispatch<React.SetStateAction<number | undefined>>, timeoutTime: number): any,
    handleClickAgain(): any;
    handleInfoCard(text: string): any;
}

export interface IProviderProps {
    children: ReactNode;
};

export interface listItemProps {
    element: Todo,
    index: number,
    handleLiDrag(e: any): any,
    handleDrop(e: any): any,
    handleFinish(e: any, finished: Todo): any,
    handleLiDragStart(e: any): any,
}

export interface PlaceboItemsProps {
    text: string;
};