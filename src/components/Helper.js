export function splitDate(time) {
    const monthNames = ["January", "February", "March", "April",
                        "May", "June", "July", "August","September",
                        "October", "November", "December"];
    const dt = new Date(time * 1000);
    return {
        fullDate: dt.getDate() + " " + monthNames[dt.getMonth()] + " " + dt.getFullYear(),
        date: dt.getDate(),
        month: dt.getMonth(),
        year: dt.getFullYear(),
    }
};

export function splitTime(time) {
    const dt = new Date(time * 1000);
    return {
        hours: dt.getHours(),
        mins: dt.getMinutes(),
        secs: dt.getSeconds(),
    }
};