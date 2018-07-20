<template>
  <div class="component-${name.param}">${name.param}</div>
</template>

<script>
import './${name.param}.scss';

import ${name.pascal} from './${name.param}';
export default ${name.pascal};
</script>
