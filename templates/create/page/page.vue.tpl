<template>
  ${layout ? `<layout-${layout.param}>`:''}
    <div class="page page-${name.param}">${name.param}</div>
  ${layout ? `</layout-${layout.param}>`:''}
</template>

<script>
import './${name.param}.scss';

import ${name.pascal}Page from './${name.param}';
export default ${name.pascal}Page;
</script>

