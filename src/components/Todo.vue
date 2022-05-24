<template>
  <div class="flex flex-col items-center justify-center p-10 space-y-10 ">
    <div class="flex flex-col items-center space-y-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-20 w-20 text-green-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
        <path
          fill-rule="evenodd"
          d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
          clip-rule="evenodd"
        />
      </svg>
      <h2 class="text-green-500 text-4xl font-bold">Todo List</h2>
    </div>

    <Form />

    <div class="flex bg-white w-fit  items-center rounded-full justify-center space-x-2">
      <span class="cursor-pointer  p-1 px-3 rounded-full hover:bg-green-400 hover:text-white duration-200" :class="{'active' : activeTab == 'All'}" @click="filterList('All')">All</span>
      <span class="cursor-pointer p-1 px-3 rounded-full hover:bg-green-400 hover:text-white duration-200" :class="{'active' : activeTab == 'Active'}" @click="filterList('Active')">Active</span>
      <span class="cursor-pointer p-1 px-2 rounded-full hover:bg-green-400 hover:text-white duration-200" :class="{'active' : activeTab == 'Completed'}" @click="filterList('Completed')">Completed</span>
    </div>

    <div v-if="todoList.length == 0" class="flex flex-col items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 font-bold text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
        <h2 class="text-3xl font-semibold text-red-500">Nothing to do</h2>
    </div>

    <div class="grid grid-cols-1 gap-4 w-3/4 md:gird-cols-2 lg:grid-cols-2 ">
      <transition-group name="bounceUp" class="w-full" >
         <cards v-for="(item, index) in todoList" :key="index" :list="item" :index="index" />
      </transition-group>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useTodoStore } from "../stores/todoStore";
import Form from "./Form.vue";
import Cards from './Cards.vue';
import { storeToRefs } from "pinia";

export default {
  components: { Form, Cards },
  setup() {
    const store = useTodoStore();
    var {activeTab} = storeToRefs(store)
    var todoList = ref(store.todoList)
    

    function filterList(value){
      todoList.value = store.filterTodoList(value)    
      store.updateActiveTab(value)
    }
    
    return {
      todoList,
      activeTab,
      filterList
    };
  },
};
</script>

<style>
</style>