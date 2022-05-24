<template>
  <form class="flex bg-green-400 w-3/4 p-2 space-x-2 rounded-full" @submit.prevent="formSubmit">
    <input type="text" class="flex-grow rounded-full px-4 focus:outline-none" v-model="item" placeholder="Add to list" ref="inputRef" />
    <button type="submit" class="p-1 bg-white px-4 rounded-full hover:scale-105 duration-300">
      Add
    </button>
  </form>
</template>

<script>
import { onMounted, onUpdated, ref } from 'vue';
import { useTodoStore } from '../stores/todoStore'
export default {
    setup(){
        const item = ref('')
        const store = useTodoStore();
        const inputRef = ref(null)

        function formSubmit(){
            let data = {
                id : Date.now(),
                item : item.value[0].toUpperCase()+item.value.slice(1),
                state : 'Active'
            }
            store.addToList(data)
            item.value = ''
        }

        onMounted(() => {
          inputRef.value.focus()
        })

        onUpdated(() => {
          inputRef.value.focus()
        })

        return{
            inputRef,
            item,
            formSubmit
        }
    },

};
</script>

<style>
</style>