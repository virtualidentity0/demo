// DOM ELEMENTS

var btn = document.querySelector(".main-btn");
var forms = document.querySelectorAll("input");
var area_deadline = document.querySelector(".deadline");
var area_p_time = document.querySelector(".p-time");
var collapse = document.querySelector("#collapse-advanced");
var toggler = document.querySelector(".advanced-toggler");
var error = document.querySelector("#error-msg");

// VARIABLES

var today = new Date()
    .toJSON()
    .slice(0, 10)
    .replace(/-/g, "/");

// EVENT LISTENERS

btn.addEventListener("click", () => {
    // if not collapsed
    if (collapse.classList.contains("show") == false) {
        area_deadline.textContent = `Deadline: ${forms[0].value}`;
        area_p_time.textContent = `${allWeekDays(forms[0].value) *
            forms[1].value} productive hours with daily commitment of ${forms[1].value} hours`;
        document.querySelector(".days-left").textContent = `${allWeekDays(forms[0].value)} days left`;
        document.querySelector(".weeks-left").textContent = `${countWeeksLeft(forms[0].value)} weeks left`;
    }
    // if collapsed
    else {
        forms[1].value = ""; // resset third form
        if (forms[2].value.length > 0 || forms[3].value.length > 0) {
            error.classList.add("d-none");
            var workDays = countWorkDays(today, forms[0].value);
            var weekDays = countWeekDays(today, forms[0].value);
            area_deadline.textContent = `Deadline: ${forms[0].value}`;
            area_p_time.textContent = `${workDays * forms[2].value + weekDays * forms[3].value} productive hours with workday commitment of ${forms[2].value} hours and weekday commitment ${forms[3].value} hours`;
        } else {
            error.classList.remove("d-none");
            error.textContent = "Enter Value";
        }
    }
});

toggler.addEventListener('click', function() {
    forms[1].toggleAttribute('disabled');
    forms[1].classList.toggle('input-disabled');
})

// counts days till deadline
var allWeekDays = function(deadline) {
    var future = new Date(deadline);
    var localToday = new Date();
    var count = Math.floor(
        (Date.UTC(future.getFullYear(), future.getMonth(), future.getDate()) -
            Date.UTC(localToday.getFullYear(), localToday.getMonth(), localToday.getDate())) /
        (1000 * 60 * 60 * 24)
    );
    return count;
};

// count weeks
var countWeeksLeft = function(deadline) {
    var future = new Date(deadline);
    var localToday = new Date();
    var weeks = Math.floor(
        (Date.UTC(future.getFullYear(), future.getMonth(), future.getDate()) -
            Date.UTC(localToday.getFullYear(), localToday.getMonth(), localToday.getDate())) /
        (7 * 24 * 60 * 60 * 1000)
    );
    return weeks;
};

// counts workdays till deadline
var countWorkDays = function(today, deadline) {
    let startDate = new Date(today);
    let endDate = new Date(deadline);
    let count = 0;
    let curDate = startDate;

    while (curDate <= endDate) {
        var dayOfWeek = curDate.getDay();
        if (!(dayOfWeek == 6 || dayOfWeek == 0)) count++;
        curDate.setDate(curDate.getDate() + 1);
    }
    return count;
};
// counts weekdays till deadline
var countWeekDays = function(today, deadline) {
    let startDate = new Date(today);
    let endDate = new Date(deadline);
    let count = 0;
    let curDate = startDate;

    while (curDate <= endDate) {
        var dayOfWeek = curDate.getDay();
        if (dayOfWeek == 6 || dayOfWeek == 0) count++;
        curDate.setDate(curDate.getDate() + 1);
    }
    return count;
};