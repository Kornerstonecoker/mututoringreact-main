import styles from './styles.module.css';

import { Popup } from '../../Popup';
import { useState } from 'react';

import { MeetingModal } from '../../MeetingModal';

import { getTimeFromIso, getDayIndex, timeDiffFactor } from '../DateHelpers';

export const Meetings = ({ targetId, type, pointers, data, onChange, show = true }) => {
    const { x, y, offsetY, offsetX } = pointers;
    const [popup, setPopup] = useState(null);

    const timetableEntryDimensionStyle = (dayNumber, startDiffFactor, endDiffFactor) => {
        if (!x.current) return {};
        const width = x.current.offsetWidth
        const height = y.current.offsetHeight
        return {
            top: (5 * (startDiffFactor + 1) + offsetY.current.offsetHeight + (height) * startDiffFactor) + "px",
            left: (0.05 * width - 1.8 + 5 * (dayNumber + 1) + offsetX.current.offsetWidth + (width) * dayNumber) + "px",
            width: width * 0.9 + "px",
            height: (5 * (endDiffFactor + 1) + height * endDiffFactor) + "px"
        }
    }



    const meetingCard = (meeting) => {
        let day = getDayIndex(meeting.startDate)
        const startTime = getTimeFromIso(meeting.startDate)
        const endTime = getTimeFromIso(meeting.endDate)
        let status = "cancelled";
        if (meeting.studentAccepted && meeting.tutorAccepted) status = "confirmed";
        else if (meeting.studentAccepted || meeting.tutorAccepted) status = "pending";
        return show && <div
            className={`${styles.meeting} ${styles[status]}`}
            style={timetableEntryDimensionStyle(
                day,
                timeDiffFactor('07:00', startTime),
                timeDiffFactor(startTime, endTime))
            }
            onClick={() => {
                setPopup(<Popup
                    content={
                        <>
                            <MeetingModal
                                meeting={meeting}
                                onChange={onChange}
                                type={type}
                                targetId={targetId}
                                onSuccess={() => { onChange(); setPopup(null) }}
                            />
                        </>}
                    whenClosed={() => setPopup(null)}
                />)
            }}
        >{meeting.module}</div> ||
            <div
                className={`${styles.hidden}`}
                style={timetableEntryDimensionStyle(
                    day,
                    timeDiffFactor('07:00', startTime),
                    timeDiffFactor(startTime, endTime))
                }
            />
    }

    return <>
        {data.filter(m => m.tutorAccepted || m.studentAccepted).map(meetingCard)}
        {popup}
    </>
}