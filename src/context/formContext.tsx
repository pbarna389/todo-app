import { useState, createContext } from 'react'
import { IFormContext, IProviderProps, Todo } from '../../@types/todo';

export const FormContext = createContext<IFormContext | null>(null);

export const FormProvider: React.FC<IProviderProps> = ({ children }) => {
    const [removeForm, setRemoveForm] = useState<boolean>(false); 
    const [editMode, setEditMode] = useState<boolean>(false);
    const [formTimeoutId, setFormTimeoutId] = useState<number | undefined>();
    const [selectToEdit, setSelectToEdit] = useState<Todo | null>(null);

    const changeForm = (mode:boolean, setMode:React.Dispatch<React.SetStateAction<boolean>>, timeoutID:number | undefined, setTimeoutID: React.Dispatch<React.SetStateAction<number | undefined>>, timeoutTime:number):void => {

    const id = setTimeout(() => {
        !mode ? setMode(!mode) : setMode(false);
    }, timeoutTime);

    setTimeoutID(id);
    
    clearTimeout(timeoutID);
    setTimeoutID(timeoutID);    
    }

    return (
        <FormContext.Provider 
            value={{
                removeForm, setRemoveForm,
                editMode, setEditMode,
                formTimeoutId, setFormTimeoutId,
                selectToEdit, setSelectToEdit,
                changeForm
            }}>
            {children}
        </FormContext.Provider>
    )
}

export default FormProvider;