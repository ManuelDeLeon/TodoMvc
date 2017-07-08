TodoList({
  share: 'todoList',

  render() {
    <section class="todoapp">
      <Header />
      <Main b="if: hasItems" />
      <Footer b="if: hasItems" />
    </section>
  }
})