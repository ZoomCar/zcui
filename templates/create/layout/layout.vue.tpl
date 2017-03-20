<template>
  <div class="layout layout-${name.param}">
    <slot>DefaultSlot - ${name.param}</slot>
  </div>
</template>

<script>
import './${name.param}.scss';

import ${name.pascal}Layout from './${name.param}';
export default ${name.pascal}Layout;
</script>

