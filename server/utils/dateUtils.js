function getFormattedDate(date = new Date(), timezoneOffset = null) {
    if (timezoneOffset !== null && timezoneOffset !== undefined && !isNaN(timezoneOffset)) {
        // timezoneOffset passed in minutes from client (e.g. new Date().getTimezoneOffset())
        const utcMs = date.getTime() + (date.getTimezoneOffset() * 60000);
        const targetMs = utcMs - (timezoneOffset * 60000);
        const targetDate = new Date(targetMs);
        const year = targetDate.getFullYear();
        const month = String(targetDate.getMonth() + 1).padStart(2, "0");
        const day = String(targetDate.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

module.exports = {
    getFormattedDate,
};
