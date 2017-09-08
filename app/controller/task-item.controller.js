(function (window) {
    'use strict';

    function TaskItem(taskManager, id) {
        var self = this;
        self.taskManager = taskManager;
        self.id = id;

        self.description = null;
        self.title = null;

        var newLi = window.document.createElement('li');
        newLi.setAttribute("draggable", "true");

        var newSpan = window.document.createElement('span');
        newSpan.setAttribute("id", `item-${id}`);
        newSpan.setAttribute("draggable", "false");

        newLi.appendChild(newSpan);

        self.item = newLi;
        self.itemDiv = newSpan;

        newLi.addEventListener("click", function (event) {
            self.taskManager.viewCreateItem(false, event.target);
        });

        newLi.addEventListener('dragstart', function (event) {
            this.style.opacity = '0.4';
            source = this;
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('text/html', this.innerHTML);
        }, false);

        

        newLi.addEventListener('dragover', function (event) {
            if (event.preventDefault) {
                event.preventDefault();
            }
            event.dataTransfer.dropEffect = 'move';
            return false;
        }, false);

        

        newLi.addEventListener('drop', function (event) {
            if (event.preventDefault) {
                event.preventDefault();
            }
            if (event.stopPropagation) {
                event.stopPropagation();
            }
            if (event.target.localName !== 'li') {
                if (source != this.parentNode) {
                    source.innerHTML = this.innerHTML;
                    event.target.parentNode.innerHTML = event.dataTransfer.getData('text/html');
                    
                }
            } else {
                if (source != this) {
                    source.innerHTML = this.innerHTML;
                    event.target.innerHTML = event.dataTransfer.getData('text/html');
                    
                }
            }

            var metas = window.document.getElementsByTagName('meta'); 
            if (metas) {
                for (var i = 0; i < metas.length; i++) {
                    if ('text/html;charset=UTF-8' === metas[i].content) {
                        metas[i].parentNode.removeChild(metas[i]);
                    }
                }
            }
            return false;
        }, false);

        newLi.addEventListener('dragend', function (event) {
            this.style.opacity = '1';
        }, false);


    }

    TaskItem.prototype.createItem = function () {

    }

    TaskItem.prototype.getItem = function () {
        return window.document.getElementById(`item-${id}`);
    }

    window.TaskItem = TaskItem;

})(window);


