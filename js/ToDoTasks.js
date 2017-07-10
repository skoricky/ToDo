/**
 * Created by ПриписновАЮ on 07.07.2017.
 */
var testObj  = {
    label: "no text"
};

var taskObj  = {
    title: "",
    taskStatus: "",
    taskBody: "",
    contributors: "",
    dataBegin: "",
    dataDeathLine: "",
    label: "no text"
};

var tasksArray = [];

// document.addEventListener("DOMContentLoaded", testLoad);
$(document).ready(testLoad);

function pageLoad() {
    if (localStorage.length > 0) {
        for (var i = localStorage.length; i >= 0; i--) {
            var returnObj = JSON.parse(localStorage.getItem(i.toString()));
            tasksArray[i] = returnObj;
        }
        var N = (tasksArray.length < 5) ? tasksArray.length : 5;
        getTasks(N, 0);
    }
}

function getTasks(N, i) {

}

function addNewTask() {
    taskObj.title = $("#titleTaskText").val();
}

function editTask() {
    
}

function saveTask() {
    setLocalStorage();
}

function remoteTask() {
    
}

function setLocalStorage() {
    if(tasksArray.length > 0) {
        for(var i = 0; i < tasksArray.length; i++) {
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