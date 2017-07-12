/**
 * Created by ПриписновАЮ on 07.07.2017.
 */

var tasksArray = [];

$(document).ready(pageLoad);

function pageLoad() {
    getLocalStorage();
}

function getTasks() {
    addFirstTask();
    if(tasksArray.length > 1) {
        for (var i = 1; i < tasksArray.length; i++) {
            addNextTask(i);
        }
    }
}

function addNewTaskClick() {
    var title = $("#newTaskTitleText").val();
    addNewTask(title, taskStatus);
}

function addNewTask(title) {
    var taskObj;
    taskObj = {
        title: "",
        taskStatus: "NEW",
        taskBody: "",
        contributors: "",
        dataBegin: "",
        dataDeathLine: "",
        label: ""
    };
    taskObj.title = title;
    taskObj.label = (tasksArray.length).toString();

    tasksArray.push(taskObj);
    if(tasksArray.length > 1) {
        addNextTask(tasksArray.length - 1);
    } else {
        addFirstTask();
    }
    setLocalStorage();
}

function currentTask(taskCloneElement, index) {
    taskCloneElement.prependTo("#tasksZone");
    taskCloneElement.children("#currentTaskStatus").html(tasksArray[index].taskStatus);
    taskCloneElement.children("#currentTaskTitle").html(tasksArray[index].title);
    taskCloneElement.children("#currentTaskLabel").val(index);
    taskCloneElement.children("#currentTaskMore").html("More...");
    taskCloneElement.show();
}

function addFirstTask() {
    remoteTasks();
    var taskCloneElement = $("#currentTask").clone(true);
    currentTask(taskCloneElement, 0);
}

function addNextTask(index) {
    var taskElement =$("#currentTask");
    var taskCloneElement = taskElement.clone(true);
    currentTask(taskCloneElement, index);
}

function editTaskClick(element) {
    var index;
    $('.currentTaskMore').each(function () {
        if(element === this) {
            index = (Number)($(this).parent().children("#currentTaskLabel").val());


            editTask(index);
        }
    })
}

function editTask(index) {
    $(".taskModal").show();
    var modal = $(".taskModal");
    modal.children("#taskModalLabel").val(index.toString());
    if(tasksArray.length > 0) {
        modal.children("#taskModalTitle").val(tasksArray[index].title);
        modal.children("#taskModalBody").html(tasksArray[index].taskBody);
        modal.children("#date").children("#dateIn").html(tasksArray[index].dataBegin);
        modal.children("#date").children("#dateOut").html(tasksArray[index].dataDeathLine);
    } else {
        var title = "task1";
        addNewTask(title);
        modal.children("#taskModalTitle").val(title);
        modal.children("#taskModalBody").html("");
        modal.children("#date").children("#dateIn").html("");
        modal.children("#date").children("#dateOut").html("");
    }

}

function saveTaskClick() {
    saveTask();
}

function saveTask() {
    var modal = $(".taskModal");
    var index = (Number)(modal.children("#taskModalLabel").val());
    tasksArray[index].title = modal.children("#taskModalTitle").val();
    tasksArray[index].taskBody = modal.children("#taskModalBody").val();
    tasksArray[index].taskStatus = modal.children("#taskModalStatus").val();
    tasksArray[index].dataBegin = modal.children("#date").children("#dateIn").val();
    tasksArray[index].dataDeathLine = modal.children("#date").children("#dateOut").val();
    setLocalStorage();
    showEditTask(index);
    modal.hide();
}

function showEditTask (index) {
    var showTask = tasksArray[index];
    tasksArray.splice(index, 1);
    tasksArray.push(showTask);
    labelSort();
    setLocalStorage();
    $(".currentTask").hide();
    getTasks();
}

$(document).on('click', '.currentTaskRemote', function (element) {
    var index = (Number)($(this).parent().children("#currentTaskLabel").val());
    index = tasksArray.indexOf(tasksArray.length === index.toString());
    $(this).parent().remove();
    if(tasksArray.length > 0) {
        tasksArray.splice(index, 1);
    } else {

    }
    if(tasksArray.length === 0) {
        var taskCloneElement = $("#currentTask").clone();
        taskCloneElement.prependTo("#tasksZone");
        taskCloneElement.show();
    }
    setLocalStorage();
});

function labelSort () {
    for(var i = 0; i < tasksArray.length; i++) {
        tasksArray[i].label = i.toString();
    }
}

function getLocalStorage() {
    if (localStorage.length > 0) {
        for (var i = 0; i < localStorage.length; i++) {
            var returnObj = JSON.parse(localStorage.getItem(i.toString()));
            tasksArray[i] = returnObj;
        }
        if(tasksArray.length > 0) {
            getTasks();
        }


    } else {
        var taskCloneElement = $("#currentTask").clone();
        taskCloneElement.prependTo("#tasksZone");
        taskCloneElement.show();
        /*$("#currentTask").show();
        $("#currentTask").children("#currentTaskStatus").html("No task");
        $("#currentTask").children("#currentTaskTitle").html("You don't have some task. Please add now...");*/
    }
}

function setLocalStorage() {
    localStorage.clear();
    if(tasksArray.length > 0) {

        for(var i = tasksArray.length - 1; i >= 0; i--) {
            var serialObj = JSON.stringify(tasksArray[i]);
            localStorage.setItem(i.toString(), serialObj);
        }
    } else {

    }
}
function remoteTasks() {
    $(".currentTask").each(function () {
        if($(this).is(":visible"))
            $(this).remove();
    });
}

function clearTasksClick() {
    remoteTasks();
    if(tasksArray.length > 0)
        tasksArray.splice(0, tasksArray.length);
    localStorage.clear();
    getLocalStorage();
}