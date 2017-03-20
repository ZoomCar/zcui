${layout ? `import ${layout.pascal}Layout from '~/layouts/${layout.param}';`: ""}

export default {
  name: 'page-${name.param}',
  components: {
    ${layout ? `${layout.pascal}Layout,`: ''}
  },
  data() {
    return {}
  }
}

