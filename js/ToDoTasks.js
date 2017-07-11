/**
 * Created by ПриписновАЮ on 07.07.2017.
 */
var testObj  = {
    label: "no text"
};

var tasksArray = [];

// document.addEventListener("DOMContentLoaded", testLoad);
$(document).ready(pageLoad);

function pageLoad() {
    if (localStorage.length > 0) {
        for (var i = 0; i < localStorage.length; i++) {
            var returnObj = JSON.parse(localStorage.getItem(i.toString()));
            tasksArray[i] = returnObj;
        }
        // var N = (tasksArray.length < 5) ? tasksArray.length : 5;
        // $("#currentTask").children("#currentTaskStatus").html(tasksArray[0].taskStatus);
        // $("#currentTask").children("#currentTaskTitle").html(tasksArray[0].title);
        // $("#currentTask").children("#currentTaskMore").html("More...");
        getTasks();
    } else {
        $("#currentTask").children("#currentTaskStatus").html("No task");
        $("#currentTask").children("#currentTaskTitle").html("You don't have some task. Please add now...");
    }
}

function getTasks() {
    for(var i = 0; i < tasksArray.length; i++) {
        addTask(i);
    }
}

function addNewTask() {
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
    taskObj.title = $("#newTaskTitleText").val();
    taskObj.taskStatus = "NEW";
    taskObj.label = (tasksArray.length - 1).toString();
    tasksArray.push(taskObj);
    addTask(tasksArray.length - 1);
    setLocalStorage();
}

function addTask(N) {
    var taskCloneElement = $("#currentTask").clone(true);
    taskCloneElement.prependTo("#tasksZone");
    taskCloneElement.children("#currentTaskStatus").html(tasksArray[N].taskStatus);
    taskCloneElement.children("#currentTaskTitle").html(tasksArray[N].title);
    taskCloneElement.children("#currentTaskLabel").val(N);
    taskCloneElement.children("#currentTaskMore").html("More...")
    // $("#currentTaskStatus").parent("#currentTask").html("No task").hide();
}

function editTask(element) {
    var index;
    $('#currentTaskMore:hover').each(function () {
        if(element === this) {
            index = (Number)($(this).parent().children("#currentTaskLabel").val());
            $(".taskModal").css("display", "block");
            var modal = $(".taskModal");
            modal.children("#taskModalLabel").val(index.toString());
            modal.children("#taskModalTitle").html(tasksArray[index].title);
            modal.children("#taskModalBody").html(tasksArray[index].taskBody);
            modal.children("#date").children("#dateIn").html(tasksArray[index].dataBegin);
            modal.children("#date").children("#dateOut").html(tasksArray[index].dataDeathLine);
        }
    })
}

function saveTask() {
    var modal = $(".taskModal");
    var index = (Number)(modal.children("#taskModalLabel").val());

    tasksArray[index].title = modal.children("#taskModalTitle").html();
    tasksArray[index].taskBody = modal.children("#taskModalBody").html();
    // tasksArray[index].dataBegin = modal.children("#date").children("#dateIn").value.toString();
    // tasksArray[index].dataDeathLine = modal.children("#date").children("#dateOut").value.toString();
    setLocalStorage();
    modal.css("display", "none");
}

// function editTask(index) {
//     $(".taskModal").css("display", "block");
//     var modal = $(".taskModal");
//     modal.children("#taskModalLabel").val(index.toString());
//     modal.children("#taskModalTitle").html(tasksArray[index].title);//tasksArray[index].title
// }

function remoteTask(element) {
    var index;
    $('#currentTaskRemote:hover').each(function () {
        if(element === this) {
            index = (Number)($(this).parent().children("#currentTaskLabel").val());
            tasksArray.splice(index, 1);
            setLocalStorage();
            $(this).parent().hide();
        }
    })
}

function setLocalStorage() {
    if(tasksArray.length > 0) {
        localStorage.clear();
        for(var i = tasksArray.length - 1; i >= 0; i--) {
            var serialObj = JSON.stringify(tasksArray[i]);
            localStorage.setItem(i.toString(), serialObj);
        }
    } else {
        var errorString = "Warning! You have some problem for setting tasks!";
        showErrorModal(errorString);
    }
}

function testLoad() {
    if (localStorage.length > 0) {
        // document.getElementById('testLabel').innerHTML = localStorage.getItem("1");
        $("#testLabel").html(localStorage.getItem("1"));
    } else {
        // document.getElementById('testLabel').innerHTML = testObj.label;
        $("#testLabel").html(testObj.label);
    }
}

function testButtonClick() {
    // testObj.label =  document.getElementById('testTextInput').value;
    testObj.label = $("#testTextInput").val();
    var testStr = testObj.label;
    localStorage.setItem("1", testStr);
}

function testButtonClear() {
    localStorage.clear();
}