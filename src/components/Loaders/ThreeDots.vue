<template>
  <div class="dot-cl">
    <div class="snippet" data-title=".dot-bricks">
      <div class="stage">
        <div class="dot-bricks"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.dot-cl {
  width: 200px;
  margin: auto;
}
.dot-bricks {
  position: relative;
  top: 8px;
  left: -9999px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #0052a2;
  color: #0052a2;
  box-shadow: 9991px -16px 0 0 #0052a2, 9991px 0 0 0 #0052a2,
    10007px 0 0 0 #0052a2;
  animation: dotBricks 2s infinite ease;
}

@keyframes dotBricks {
  0% {
    box-shadow: 9991px -16px 0 0 #0052a2, 9991px 0 0 0 #0052a2,
      10007px 0 0 0 #0052a2;
  }
  8.333% {
    box-shadow: 10007px -16px 0 0 #0052a2, 9991px 0 0 0 #0052a2,
      10007px 0 0 0 #0052a2;
  }
  16.667% {
    box-shadow: 10007px -16px 0 0 #0052a2, 9991px -16px 0 0 #0052a2,
      10007px 0 0 0 #0052a2;
  }
  25% {
    box-shadow: 10007px -16px 0 0 #0052a2, 9991px -16px 0 0 #0052a2,
      9991px 0 0 0 #0052a2;
  }
  33.333% {
    box-shadow: 10007px 0 0 0 #0052a2, 9991px -16px 0 0 #0052a2,
      9991px 0 0 0 #0052a2;
  }
  41.667% {
    box-shadow: 10007px 0 0 0 #0052a2, 10007px -16px 0 0 #0052a2,
      9991px 0 0 0 #0052a2;
  }
  50% {
    box-shadow: 10007px 0 0 0 #0052a2, 10007px -16px 0 0 #0052a2,
      9991px -16px 0 0 #0052a2;
  }
  58.333% {
    box-shadow: 9991px 0 0 0 #0052a2, 10007px -16px 0 0 #0052a2,
      9991px -16px 0 0 #0052a2;
  }
  66.666% {
    box-shadow: 9991px 0 0 0 #0052a2, 10007px 0 0 0 #0052a2,
      9991px -16px 0 0 #0052a2;
  }
  75% {
    box-shadow: 9991px 0 0 0 #0052a2, 10007px 0 0 0 #0052a2,
      10007px -16px 0 0 #0052a2;
  }
  83.333% {
    box-shadow: 9991px -16px 0 0 #0052a2, 10007px 0 0 0 #0052a2,
      10007px -16px 0 0 #0052a2;
  }
  91.667% {
    box-shadow: 9991px -16px 0 0 #0052a2, 9991px 0 0 0 #0052a2,
      10007px -16px 0 0 #0052a2;
  }
  100% {
    box-shadow: 9991px -16px 0 0 #0052a2, 9991px 0 0 0 #0052a2,
      10007px 0 0 0 #0052a2;
  }
}
</style>
