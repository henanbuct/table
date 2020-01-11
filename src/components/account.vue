<template>
  <div>账户</div>
</template>
<script>
export default {
  data () {
    return {
      activeName: 'diagnosis'
    };
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
