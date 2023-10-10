import styles from './styles.module.css';

import {
    useState,
    useEffect
} from 'react';

import { FaStar } from 'react-icons/fa';

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"

}

export const Rating = ({ size = 24, value = 0, editable = false, onEdit = () => {} }) => {
    const rating = Array(5).fill(0);
    const [currentRating, setCurrentRating] = useState(value);
    const [hoverRating, setHoverRating] = useState(undefined);
    const handleClick = rating => {
        setCurrentRating(rating)
        onEdit(rating)
    }

    const handleMouseOver = rating => {
        setHoverRating(rating)
    }

    const handleMouseLeave = () => {
        setHoverRating(undefined)
    }


    return <div className={styles.rating}>
        {rating.map((_, index) => {
            return editable ? 
                <FaStar
                    key={index}
                    size={size}
                    style={{
                        marginRight: 10,
                        cursor: "pointer"
                    }}
                    color={(hoverRating || currentRating) > index ? colors.orange : colors.grey}
                    onClick={() => handleClick(index + 1)}
                    onMouseOver={() => handleMouseOver(index + 1)}
                    onMouseLeave={handleMouseLeave}
                /> :
                <FaStar
                key={index}
                size={size}
                style={{
                    marginRight: 10
                }}
                color={currentRating > index ? colors.orange : colors.grey}
                />
        })}
            </div>
}
    