(function (window) {
  'use strict';

  function TaskManager(itemsSaved) {
    var self = this;
    self.items = [];

    if (itemsSaved) {
      console.log(itemsSaved);
      for (var i = 0; i < itemsSaved.length; i++) {
        
        var newItem = new TaskItem(self, i);
        newItem.itemDiv.innerHTML = itemsSaved[i].title;
        newItem.title = itemsSaved[i].title;
        newItem.description = itemsSaved[i].description;
        self.addItem(newItem);
      }
    }

    var taskInput = window.document.getElementById("taskInput");
    var taskDescription = window.document.getElementById("taskDescription");

    var handler = function (event) {
      var key = event.which || event.keyCode;
      if (13 === key) {
        return;
      }

      self.selectedItem.innerHTML = taskInput.value;

      var idSelected = self.selectedItem.getAttribute("id");

      if (idSelected) {
        idSelected = idSelected.replace("item-", "");
      }

      var itemSelected = self.items[parseInt(idSelected)];

      itemSelected.title = taskInput.value;

      window.localStorage.setItem("items", JSON.stringify(self.items.map(function (item) {
        return {
          title: item.title,
          description: item.description
        }
      })));
    }

    taskInput.addEventListener("keyup", handler);

    taskDescription.addEventListener("keyup", function (event) {
      var idSelected = self.selectedItem.getAttribute("id");

      if (idSelected) {
        idSelected = idSelected.replace("item-", "");
      }

      var itemSelected = self.items[parseInt(idSelected)];

      itemSelected.description = taskDescription.value;

      window.localStorage.setItem("items", JSON.stringify(self.items.map(function (item) {
        return {
          title: item.title,
          description: item.description
        }
      })));
    });

    taskInput.addEventListener("focus", function (event) {
      taskInput.parentNode.classList.add('focus');
    });
    taskInput.addEventListener("blur", function (event) {
      taskInput.parentNode.classList.remove('focus');
    });
  }

  TaskManager.prototype.addItem = function (item) {
    var self = this;
    var element;
    var list = window.document.getElementById("taskList");

    console.log(item);

    if (self.items.length < 1) {
      element = list.childNodes[0];
    } else {
      element = self.items[self.items.length - 1].item;
    }

    this.items.push(item);

    list.insertBefore(item.item, element);
  }

  TaskManager.prototype.viewCreateItem = function (newItem, element) {
    var self = this;

    window.document.getElementById("createAndEditView").style.display = "block";
    window.document.getElementById("taskInput").value = "";
    window.document.getElementById("taskDescription").value = "";

    for (var i = 0; i < this.items.length; i++) {
      this.items[i].item.classList.remove('selected');
    }

    var item;

    if (newItem) {
      //window.document.getElementById("addTask").setAttribute("disabled", true);
      //window.document.getElementById("addTask").classList.add('disabled');

      var id = this.items.length;

      item = new TaskItem(this, id);
      this.addItem(item);

      item.item.classList.add('selected');

      self.selectedItem = item.itemDiv;

    } else {
      if (element.localName !== 'li') {
        self.selectedItem = element;
        self.selectedItem.classList.add('selected');
      } else {
        self.selectedItem = element.getElementsByTagName('span')[0];
        self.selectedItem.parentNode.classList.add('selected');
      }

      var idSelected = self.selectedItem.getAttribute("id");

      if (idSelected) {
        idSelected = idSelected.replace("item-", "");
      }

      var itemSelected = this.items[parseInt(idSelected)];

      window.document.getElementById("taskInput").value = self.selectedItem.innerHTML;
      window.document.getElementById("taskDescription").value = itemSelected.description;


    }


  }

  TaskManager.prototype.hideCreateItem = function () {

    window.document.getElementById("createAndEditView").style.display = "none";
    //window.document.getElementById("addTask").removeAttribute("disabled");
    //window.document.getElementById("addTask").classList.remove('disabled');

    window.document.getElementById("taskInput").value = "";
  }

  window.TaskManager = TaskManager;



})(window);


