export const timeDiffFactor = (start, end) => {
    const startTime = start.split(':')
    const startMins = Number.parseInt(startTime[0]) * 60 + Number.parseInt(startTime[1])
    if (!end) return startMins / 30
    const endTime = end.split(':')
    const endMins = Number.parseInt(endTime[0]) * 60 + Number.parseInt(endTime[1])
    return (endMins - startMins) / 30
}

export const thisMonday = () => {
    const today = new Date();
    const day = today.getDay()
    const diff = today.getDate() - day + (day === 0 ? -6 : 1)
    return new Date(today.setDate(diff))
}

export const nextMonday = (monday) => {
    monday = new Date(monday)
    const day = monday.getDay()
    const diff = monday.getDate() - day + (day === 0 ? -6 : 1) + 7
    return new Date(monday.setDate(diff))
}

export const previousMonday = (monday) => {
    monday = new Date(monday)
    const day = monday.getDay()
    const diff = monday.getDate() - day + (day === 0 ? -6 : 1) - 7
    return new Date(monday.setDate(diff))
}

export const dateFromIso = (date) => {
    return date.toISOString().split('T')[0]
}

export const timeAdd = (time, minsToAdd) => {
    function D(J) { return (J < 10 ? '0' : '') + J }
    var piece = time.split(':')
    var mins = piece[0] * 60 + piece[1] + minsToAdd
    return D(mins % (24 * 60) / 60 | 0) + ':' + D(mins % 60);
}

export const getFormattedDay = (date, offset) => {
    date = new Date(date)
    offset && date.setDate(date.getDate() + offset)
    date = date.toDateString().split(' ');
    let day = Number.parseInt(date[2])
    return (day % 10 === 1 ? `${day}st` : day % 10 === 2 ? `${day}nd` : day % 10 === 3 ? `${day}rd` : `${day}th`) + " " + date[1]
}

export const getTimeFromIso = (iso) => {
    return iso.split('T')[1].split('.')[0]
}

export const getDayIndex = (date) => {
    let day = new Date(date).getDay()
    return day === 0 ? 6 : day - 1 // 0 is sunday, 1 is monday, 2 is tuesday, etc, we want 0 to be monday, 1 to be tuesday, etc
}