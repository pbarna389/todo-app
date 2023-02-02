import { useState, createContext } from 'react'
import { ITimerContext, IProviderProps } from '../../@types/todo';

export const TimerContext = createContext<ITimerContext | null>(null);

const TimerProvider: React.FC<IProviderProps> = ({ children }) => {
    const [infoCardOn, setInfoCardOn] = useState<boolean>(false);
    const [infoCardText, setInfoCardText] = useState<string | null>(null);
    const [infoCardTimeoutID, setInfoCardTimeoutID] = useState<number | undefined>();
    const [optionElementSelected, setOptionElementSelected] = useState<string | null>(null);
    const [infoID, setInfoID] = useState<number | null>(null);
    const [clickedAgain, setClickedAgain] = useState<boolean>(false);
    const [clickedAgainTimeoutID, setClickedAgainTimeoutID] = useState<number | undefined>();

    const removeInfoCard = (setInfoCardOn: React.Dispatch<React.SetStateAction<boolean>>, setInfoCardTimeoutID: React.Dispatch<React.SetStateAction<number | undefined>>, timeoutTime: number):void => {

    setInfoCardOn(true);
    
    const id = setTimeout(() => {
        setInfoCardOn(false);
    }, timeoutTime);

    setInfoCardTimeoutID(id);
    };

    const infoCardTimeoutReset = () => {
        if (infoCardTimeoutID) {
            clearTimeout(infoCardTimeoutID);
        }
        removeInfoCard(setInfoCardOn, setInfoCardTimeoutID, 1000);
    };

    const handleClickAgain = (): void => {
        if (clickedAgain === true) {
            setClickedAgain(false);
            const id = setTimeout(() => {
                setClickedAgain(true)
            }, 50);
        setClickedAgainTimeoutID(id)
        } else {
            setClickedAgain(true);
            const id = setTimeout(() => {
                setClickedAgain(false)
            }, 50)
            setClickedAgainTimeoutID(id)
        };
        clearTimeout(clickedAgainTimeoutID);
    }

    const handleInfoCard = (text: string):void => {
        handleClickAgain();
        setInfoCardText(text)
        infoCardTimeoutReset();
    };

    return(
        <TimerContext.Provider 
            value={{
                infoCardOn,
                setInfoCardOn,
                infoCardText,
                setInfoCardText,
                infoCardTimeoutID,
                setInfoCardTimeoutID,
                optionElementSelected,
                setOptionElementSelected,
                infoID,
                setInfoID,
                clickedAgain,
                setClickedAgain,
                clickedAgainTimeoutID,
                setClickedAgainTimeoutID,
                infoCardTimeoutReset,
                removeInfoCard,
                handleClickAgain,
                handleInfoCard
            }}>
            {children}
        </TimerContext.Provider>
    )
}

export default TimerProvider;