import Vue from 'vue'

import App from './App'
require('@/lib/sw-register')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>'
}).$mount('#app')
