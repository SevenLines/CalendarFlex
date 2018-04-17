<template>
  <div class="wrapper">
    <div class="content">
      <div class="header">
        <button @click="--year">&lt;</button>
        <div class="title">{{year}}</div>
        <button @click="++year">&gt;</button>
      </div>
      <div class="body">
        <calendar :year="year"></calendar>
      </div>
      <div class="header">
        <div class="title">{{year}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      year: 2018
    }
  }
}
</script>

<style lang="scss">
  html {
    height: 100%;
  }

  body {
    height: 100%;
    margin: 0;
  }
</style>

<style lang="scss" scoped>
  .title {
    font-weight: bold;
    font-size: 1.5em;
    margin: 0.25em;
    text-align: center;
  }

  .header {
    padding: 0.25em;
    display: flex;
    flex-shrink: 0;
    justify-content: space-between;
  }

  .wrapper { // ограничивает высоту
    display: flex;
    height: 100%;
  }

  .content { // непосредственный контейнер с заголовком и содержимым
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .body { // основное тело контейнер
    flex-grow: 1; // растягивается чтобы заполнить  все пространство
    overflow-y: auto; // скролл если не влезает
  }
</style>
