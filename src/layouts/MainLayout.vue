<template functional>
  <div class="container">
    <header>
      <router-link to="/" tag="h1" class="siteName">
        <u>S</u>ecret <u>S</u>anta <u>A</u>llocation <u>S</u>ystem
      </router-link>
    </header>

    <main>
      <slot></slot>
    </main>

    <footer>
      &copy; Jason Yu 2018
    </footer>
  </div>
</template>

<style scoped>
header {
  margin-bottom: 1rem;
}

.siteName {
  cursor: pointer;
}

footer {
  padding-top: 1rem;
}

.container {
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}
</style>
