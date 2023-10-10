import styles from './styles.module.css';
import { removeRangesInTimetableForStudent, removeRangesInTimetableForTutor } from '../../../endpoints';
import { timeDiffFactor } from '../DateHelpers';

export const BusySlots = ({ pointers, userType, data, onClick, onError, editable = false }) => {
    const {x, y, offsetX, offsetY } = pointers;
    const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    const timetableEntryDimensionStyle = (dayNumber, startDiffFactor, endDiffFactor) => {
        if(!x.current) return {};
        const width = x.current.offsetWidth
        const height = y.current.offsetHeight
        return {
            top: (5 * (startDiffFactor + 1) + offsetY.current.offsetHeight + (height) * startDiffFactor ) + "px",
            left: (0.05 * width + 5 * (dayNumber + 1) + offsetX.current.offsetWidth + (width) * dayNumber) + "px",
            width: 0.9 * width + "px",
            height: (5 * (endDiffFactor + 1) + height * endDiffFactor) + "px"
        }
    }
    
    const removeBusy = (day, range) => {
        if (userType === 'S') {
            removeRangesInTimetableForStudent({ studentId: localStorage.getItem("userId"), busy: { [day]: [{ start: range.start, end: range.end }] } }).then((response) => {
                onClick();
            }).catch((error) => {
                onError(error);
            });
        }
        else if (userType === 'T') {
            removeRangesInTimetableForTutor({ tutorId: localStorage.getItem("userId"), busy: { [day]: [{ start: range.start, end: range.end }] } }).then((response) => {
                onClick();
            }).catch((error) => {
                    onError(error);
            });
        }
    }

    let arr = []
        for (let day in data)
            for (let range of data[day])
            arr.push(<div 
                    style={timetableEntryDimensionStyle(
                        DAYS.indexOf(day),
                        timeDiffFactor('07:00', range.start),
                        timeDiffFactor(range.start, range.end))
                    } 
                    className={`${styles.busy} ${editable ? styles.editable : ''}`}
                    onClick={() => editable && removeBusy(day, range)}/>)
    return arr;
}