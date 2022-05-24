<template>
  <div class="flex items-center bg-white p-2 space-x-4 rounded-full px-3">
    <p
      class="
        h-6
        w-6
        rounded-full
        text-white
        bg-orange-600
        flex
        items-center
        justify-center
      "
    >
      {{ index }}
    </p>
    <h2
      class="font-bold italic"
      :class="{ 'line-through': list.state == 'Completed' }"
    >
      {{ list.item }}
    </h2>
    <div class="flex !ml-auto space-x-1">
      <transition-group name="zoom" >
        <h2
          class="bg-red-400 px-2 text-white rounded-full cursor-pointer"
          @click="undoEvent(list.id)"
          v-if="undo"
        >
          Undo({{ count }})
        </h2>
      </transition-group>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="
          h-6
          w-6
          text-green-500
          cursor-pointer
          hover:scale-105
          duration-300
        "
        viewBox="0 0 20 20"
        fill="currentColor"
        @click="markAsCompleted(list.id)"
        v-if="list.state != 'Completed'"
      >
        <path
          fill-rule="evenodd"
          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clip-rule="evenodd"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-red-500 cursor-pointer hover:scale-105 duration-300"
        viewBox="0 0 20 20"
        fill="currentColor"
        @click="deleteTodo(list.id)"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useTodoStore } from "../stores/todoStore";
export default {
  props: ["list", "index"],
  setup(props) {
    const item = ref(props.list);
    const index = ref(props.index + 1);
    const store = useTodoStore();
    const undo = ref(false);
    const count = ref(3);

    function markAsCompleted(id) {
      store.markCompleted(id);
      undo.value = true;

      (function loop() {
        console.log('called')
        setTimeout(function () {
          count.value--
          console.log('called')
          if(count.value == -1) {
            undo.value = false;
            count.value = 3;
            return;
          }
          else loop();
        }, 1000); //9000 = 9000ms = 9s
      })();

    
    }

    function deleteTodo(id) {
      store.markDelete(id);
    }

    function undoEvent(id) {
      store.undoCompleted(id);
      undo.value = false;
    }

    return {
      item,
      index,
      undo,
      count,
      markAsCompleted,
      deleteTodo,
      undoEvent,
    };
  },
};
</script>

<style>
</style>