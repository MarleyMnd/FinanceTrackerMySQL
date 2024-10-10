<template>
    <div class="bg-color min-h-screen bg-gray-100 p-8">
      <h1 class="text-4xl font-bold text-center mb-8">Tasks</h1>
      <div class="space-y-4">
        <!-- Display tasks from the database -->
        <div
          v-for="(task, index) in userTasks"
          :key="index"
          class="bg-white shadow-lg p-6 rounded-lg text-center"
        >
          <p
            class="text-3xl font-semibold"
            :class="{
              'text-green-600': task.Status === 'done',
              'text-yellow-500': task.Status === 'in progress',
              'text-red-500': task.Status === 'not started',
            }"
          >
            {{ task.name }}
          </p>
          <p class="text-xl text-gray-500 mt-2">{{ formatDate(task.goal_date) }}</p>
          <p
            class="text-md mt-2"
            :class="{
              'text-green-600': task.Status === 'done',
              'text-yellow-500': task.Status === 'in progress',
              'text-red-500': task.Status === 'not started',
            }"
          >
            Status: {{ task.Status }}
          </p>

          <!-- Update task status -->
          <select v-model="task.state" @change="updateTaskStatus(task)" class="mt-4 p-2 border rounded">
            <option value="not started">Not Started</option>
            <option value="in progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button @click="removeTask(task.id)" class="bg-red-500 text-white px-2 py-1 rounded ml-5">
      Remove
    </button>
        </div>
      </div>

      <!-- Add Task Form -->
      <div class="mt-8">
        <h2 class="text-2xl font-semibold mb-4">Add New Task</h2>
        <div class="flex items-center space-x-4">
          <input
            v-model="newTaskName"
            placeholder="Task Name"
            class="p-2 border rounded"
          />
          <input
            v-model="newTaskDate"
            type="date"
            class="p-2 border rounded"
          />
          <select v-model="newTaskStatus" class="p-2 border rounded">
            <option value="not started">Not Started</option>
            <option value="in progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button @click="addTask" class="bg-blue-500 text-white px-4 py-2 rounded">
            Add Task
          </button>
        </div>
      </div>
    </div>
  </template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      newTaskName: '',
      newTaskDate: '',
      newTaskStatus: 'not started'
    }
  },
  created () {
    this.userTasks = JSON.parse(localStorage.getItem('userTasks')) || []
    console.log('User tasks:', this.userTasks)
  },
  methods: {
    async addTask () {
      const newTask = {
        name: this.newTaskName,
        goal_date: this.newTaskDate,
        state: this.newTaskStatus
      }

      try {
        await axios.post('http://localhost:8080/addTask', {
          userId: localStorage.getItem('userId'),
          Task: newTask
        })

        this.userTasks.push(newTask)

        this.newTaskName = ''
        this.newTaskDate = ''
        this.newTaskStatus = 'not started'
      } catch (error) {
        console.error('Error adding task:', error)
      }
    },
    async removeTask (taskId) {
      try {
        // Call the API to remove the task
        await axios.post('http://localhost:8080/removeTask', {
          taskId: taskId
        })

        // Remove the task from the local array
        this.userTasks = this.userTasks.filter(task => task.id !== taskId)
      } catch (error) {
        console.error('Error removing task:', error)
      }
    },

    // New method to handle task status update
    async updateTaskStatus (task) {
      try {
        // Send the updated task status to the server
        const response = await axios.post('http://localhost:8080/updateTaskStatus', {
          userId: localStorage.getItem('userId'),
          taskName: task.Name,
          newStatus: task.Status
        })

        if (response.status === 200) {
          console.log('Task status updated successfully:', response.data.message)
        } else {
          console.error('Error updating task status:', response.data.message)
        }
      } catch (error) {
        console.error('Error updating task status:', error)
      }
    },
    formatDate (date) {
      return new Date(date).toLocaleDateString()
    }
  }
}
</script>

<style>
.bg-color {
  background: linear-gradient(to right, #364652, rgb(255, 255, 255));
}

/* Designing for scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  background: grey;
  border-radius: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #2c3e50;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
