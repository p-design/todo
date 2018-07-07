Vue.component('item-component', {
  template: '#item-component',
  props: ['item', 'selectMode'],
  computed: {
    className() {
      const className = []
      if (this.item.done) className.push('done')
      if (this.item.selected) className.push('selected')
      return className
    }
  },
  methods: {
    select() {
      if (this.selectMode) {
        this.item.selected = !this.item.selected
      }
    }
  }
})

const vm = new Vue({
  el: '#app',
  data: {
    input: '',
    todos: [],
    viewAll: false,
    selectMode: false,
  },
  computed: {
    done() {
      return this.todos.filter(v => v.done)
    },
    undone() {
      return this.todos.filter(v => !v.done)
    },
    selected() {
      return this.todos.filter(v => v.selected)
    },
    editButtonClassName() {
      return this.selected.length === 1 ? 'active' : ''
    },
    doneButtonClassName() {
      return this.selected.length >= 1 ? 'active' : ''
    },
    deleteButtonClassName() {
      return this.selected.length >= 1 ? 'active' : ''
    }
  },
  methods: {
    add() {
      if (this.input === '') return
      this.todos.push({
        text: this.input,
        selected: false,
        done: false
      })
      this.input = ''
    },
    deselectAll() {
      this.selected.forEach(item => item.selected = false)
    },
    toggleSelectMode() {
      this.selectMode = !this.selectMode
      this.todos.forEach(item => item.selected = false)
    },
    editSelected() {
      if (this.selected.length !== 1) return
      const item = this.selected[0]
      const newText = window.prompt('Edit Todo', item.text)
      if (newText !== null && newText !== '') {
        item.text = newText
        this.deselectAll()
      }
    },
    doneSelected() {
      this.selected.forEach(item => item.done = true)
      this.deselectAll()
    },
    deleteSelected() {
      this.selected.forEach(item => {
        const index = this.todos.indexOf(item)
        if (index !== -1) this.todos.splice(index, 1)
      })
    }
  },
  watch: {
    todos: {
      handler(value) {
        localStorage.setItem('data', JSON.stringify(value))
      },
      deep: true
    }
  }
})

const stored = localStorage.getItem('data');
if (stored) {
  const data = JSON.parse(stored)
  vm.todos = data
} else {
  vm.todos = [
    {
      text: '買い物する',
      done: false,
      selected: false
    },
    {
      text: '誰かと会う',
      done: false,
      selected: false
    },
    {
      text: '宿題する',
      done: false,
      selected: false
    }
  ]
}
