<template>
  <div :class="gradientClass" class="min-h-screen transition-all duration-500">
    <router-view />
  </div>
</template>

<script>

export default {
  data() {
    return {
      gradientClass: '',
      directions: [
        'bg-gradient-to-r', 'bg-gradient-to-l', 'bg-gradient-to-t',
        'bg-gradient-to-b', 'bg-gradient-to-tr', 'bg-gradient-to-tl',
        'bg-gradient-to-br', 'bg-gradient-to-bl'
      ]
    }
  },
  methods: {
    generateRandomGradient() {
      // Randomly select a direction
      const randomDirection = this.directions[Math.floor(Math.random() * this.directions.length)]

      // Set the gradient class with blue shades
      this.gradientClass = `${randomDirection} from-gray-50 via-white to-rose-50`
    }
  },
  mounted() {
    this.generateRandomGradient()
  }
}
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Prompt:wght@400;700&display=swap");

body {
  font-family: "Prompt", sans-serif;
}
</style>