import { PlaceboItemsProps } from "../../@types/todo";
import "../styles/PlaceboItem.css";

const PlaceboItem:React.FC<PlaceboItemsProps> = ({ text }) => {
  return (
    <div className="listItem placebo">{text}</div>
  )
}

export default PlaceboItem