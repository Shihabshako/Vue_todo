import { defineStore } from "pinia";

export const useTodoStore = defineStore("todoList", {
  state: () => ({
    todoList: [],
    activeTab: "All",
  }),
  getters: {
    filterTodoList: (state) => {
      return (arg) => {
        if (arg == "All") {
          return state.todoList;
        } else {
          return state.todoList.filter((item) => item.state == arg);
        }
      };
    },
  },
  actions: {
    addToList(data) {
      this.todoList.push(data);
    },
    markCompleted(id) {
      this.todoList.map((item) => {
        if (item.id == id) {
          item.state = "Completed";
        }
        return item;
      });
    },
    markDelete(id) {
      let index = this.todoList.map((item) => item.id).indexOf(id);
      this.todoList.splice(index, 1);
    },
    undoCompleted(id) {
      this.todoList.map((item) => {
        if (item.id == id) {
          item.state = "Active";
        }
        return item;
      });
    },
    updateActiveTab(state) {
      this.activeTab = state;
    },
  },
});
