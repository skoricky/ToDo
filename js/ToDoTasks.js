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
    var taskStatus = "NEW";
    addNewTask(title, taskStatus);
}

function addNewTask(title, taskStatus) {
    var taskObj;
    taskObj = {
        title: "",
        taskStatus: "",
        taskBody: "",
        contributors: "",
        dataBegin: "",
        dataDeathLine: "",
        label: ""
    };
    taskObj.title = title;
    taskObj.taskStatus = taskStatus;
    taskObj.label = (tasksArray.length).toString();
    tasksArray.push(taskObj);
    if(tasksArray.length > 1) {
        addNextTask(tasksArray.length - 1);
    } else {
        addFirstTask();
    }
    setLocalStorage();
}

function addFirstTask() {
    $("#currentTask").show();
    $("#currentTask").children("#currentTaskStatus").html(tasksArray[0].taskStatus);
    $("#currentTask").children("#currentTaskTitle").html(tasksArray[0].title);
    $("#currentTask").children("#currentTaskMore").html("More...");
}

function addNextTask(N) {
    var taskCloneElement = $("#currentTask").clone(true);
    taskCloneElement.prependTo("#tasksZone");
    taskCloneElement.children("#currentTaskStatus").html(tasksArray[N].taskStatus);
    taskCloneElement.children("#currentTaskTitle").html(tasksArray[N].title);
    taskCloneElement.children("#currentTaskLabel").val(N);
    taskCloneElement.children("#currentTaskMore").html("More...");
}

function editTask(element) {
    var index;
    $('.currentTaskMore:hover').each(function () {
        if(element === this) {
            index = (Number)($(this).parent().children("#currentTaskLabel").val());

            $(".taskModal").show();
            var modal = $(".taskModal");
            modal.children("#taskModalLabel").val(index.toString());
            modal.children("#taskModalTitle").val(tasksArray[index].title);
            modal.children("#taskModalBody").html(tasksArray[index].taskBody);
            modal.children("#date").children("#dateIn").html(tasksArray[index].dataBegin);
            modal.children("#date").children("#dateOut").html(tasksArray[index].dataDeathLine);
        }
    })
}

function saveTask() {
    var modal = $(".taskModal");
    var index = (Number)(modal.children("#taskModalLabel").val());

    tasksArray[index].title = modal.children("#taskModalTitle").val();
    tasksArray[index].taskBody = modal.children("#taskModalBody").val();
    tasksArray[index].taskStatus = modal.children("#taskModalStatus").val();
    // // tasksArray[index].dataBegin = modal.children("#date").children("#dateIn").value.toString();
    // // tasksArray[index].dataDeathLine = modal.children("#date").children("#dateOut").value.toString();
    setLocalStorage();
    showEditTask(index);
    modal.hide();
}

function showEditTask (index) {
    var showTask = tasksArray[index];
    tasksArray.splice(index, 1)
    tasksArray.push(showTask);
    labelSort();
    setLocalStorage();
    $(".currentTask").hide();
    getTasks();
}


function remoteTask(element) {
    var index;
    $('.currentTaskRemote:hover').each(function () {
        if(element === this) {
            index = (Number)($(this).parent().children("#currentTaskLabel").val());
            if(tasksArray.length > 0) {
                tasksArray.splice(index, 1);
            }
            $(this).parent().hide();
        }
    });
    labelSort();
    setLocalStorage();
}

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
        $("#currentTask").show();
        $("#currentTask").children("#currentTaskStatus").html("No task");
        $("#currentTask").children("#currentTaskTitle").html("You don't have some task. Please add now...");
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

function clear() {
    localStorage.clear();
    pageLoad();
}