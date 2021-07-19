<template>
  <div class="card-loader">
    <div class="image"></div>
    <div class="content">
      <h4></h4>
      <h4 class="badget-date"></h4>
      <h4 class="badget-sm"></h4>
      <div class="description"></div>
      <h4></h4>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
:root {
  --loading-grey: #ededed;
}
.card-loader {
  width: 100%;
  background-color: #fff;
  border-radius: 6px;
  overflow: hidden;
  /* box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.12); */
}
.card-loader .image,
.card-loader h4,
.card-loader .description {
  background-color: var(--loading-grey);
  background: linear-gradient(
      100deg,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 60%
    )
    var(--loading-grey);
  background-size: 200% 100%;
  background-position-x: 180%;
  animation: 1s loading ease-in-out infinite;
}
.card-loader h4 {
  min-height: 1.6rem;
  border-radius: 4px;
  animation-delay: 0.05s;
}

.card-loader .description {
  min-height: 4rem;
  border-radius: 4px;
  animation-delay: 0.06s;
}
.card-loader .badget-sm {
  width: 70px;
}
.card-loader .badget-date {
  width: 120px;
  min-height: 1rem;
}
@keyframes loading {
  to {
    background-position-x: -20%;
  }
}
</style>
