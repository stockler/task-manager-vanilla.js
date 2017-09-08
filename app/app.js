var source;

(function () {
    'use strict';

    var items = window.localStorage.getItem("items");

    if (items) {
        items = JSON.parse(items);
    }

    var taskManager = new TaskManager(items);

    window.document.getElementById("addTask").addEventListener("click", function (event) {
        taskManager.viewCreateItem(true);
    });

    window.document.getElementById("close").addEventListener("click", function (event) {
        taskManager.hideCreateItem();
    });

})();