import { Reminder } from "./Calendar"

interface Props {
    dayReminders: Reminder[]
}

const RemindersIndicator = ({dayReminders} : Props) => {

    return(
        <>
            {dayReminders?.map((reminder, index)=> {
                return(
                    <div key={index}>
                    r
                    </div>
                )
        })}
        </>
    )
}

export default RemindersIndicator