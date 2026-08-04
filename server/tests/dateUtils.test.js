const test = require("node:test");
const assert = require("node:assert/strict");
const { getFormattedDate } = require("../utils/dateUtils");

test("Date Utils - default current date returns YYYY-MM-DD format", () => {
    const formatted = getFormattedDate();
    assert.match(formatted, /^\d{4}-\d{2}-\d{2}$/);
});

test("Date Utils - specific date formatting", () => {
    const d = new Date(2026, 0, 5); // Jan 5, 2026
    assert.equal(getFormattedDate(d), "2026-01-05");
});

test("Date Utils - padded month and day formatting", () => {
    const d = new Date(2026, 8, 9); // Sep 9, 2026
    assert.equal(getFormattedDate(d), "2026-09-09");
});

test("Date Utils - timezone offset calculation", () => {
    // UTC time: 2026-08-04T00:30:00Z
    const d = new Date("2026-08-04T00:30:00Z");
    
    // Test with offset -330 (IST: UTC+5:30)
    const istFormatted = getFormattedDate(d, -330);
    assert.equal(istFormatted, "2026-08-04");

    // Test with offset +480 (PST: UTC-8:00, 480 mins west)
    // 00:30 UTC minus 8 hours = 16:30 previous day (2026-08-03)
    const pstFormatted = getFormattedDate(d, 480);
    assert.equal(pstFormatted, "2026-08-03");
});
