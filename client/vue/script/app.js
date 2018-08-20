let app = new Vue({
    el: '#app',
    components: {
        'new-todo': NewTodo,
        'edit-todo' : EditTodo,
        'head-todo' : Head,
        'content-todo' : Content,
        'meeting' : Meeting,
    },
    data :{
      isEditing: false,
      isMeeting:false,
      owner:'',
      edited : '',
      forMeeting : '',
      todos:[],
    },
    created(){
      this.getTodos()
    },
    methods: {
                logout (){
                  alert('sure ??')
                  if(localStorage.getItem("fbToken")){
                   FB.logout(function(response){
                      localStorage.clear()  
                      window.location.replace("/index.html")
                   });
                  }else{
                     localStorage.clear()
                     window.location.replace("/index.html")
                  }    
                },
                editTodo(){
                  let id = todo._id
                    let newTag = todo.tag.reduce(function(result,tag){
                      let tags =  result + "#" + tag
                      return tags
                    }, '')
                    axios
                    .put(`https://test.adrowicaksono.xyz/task?id=${id}`, {
                        title: todo.title,
                        task:todo.task,
                        tag:newTag,
                        deadline: new Date(todo.deadline),
                        status: todo.status
                    }, {
                      headers:{
                        token: localStorage.getItem("token")
                      }
                    })
                    .then(function(task){
                      window.location.replace('/home.html')
                      console.log("berhasil")
                    })
                    .catch(function(err){
                      console.log(err)
                    })
                },
                newTodo (newTodo) {
                  axios
                  .post("https://test.adrowicaksono.xyz/task", newTodo,{
                    headers:{
                      token: localStorage.getItem("token")
                    }
                  })
                  .then(function(res){
                    window.location.replace('/home.html')
                  })
                  .catch(function(err){
                    console.log(err.message)
                  })
                },
                hideTodo(todo){
                  const todoIndex = this.todos.indexOf(todo)
                  this.todos.splice(todoIndex, 1)
                },
                completeTodo (todo) {
                    const todoIndex = this.todos.indexOf(todo)
                    this.todos[todoIndex].status = true
                    let id = todo._id

                    let newTag = todo.tag.reduce(function(result,tag){
                      let tags =  result + "#" + tag
                      return tags
                    }, '')
                    axios
                    .put(`https://test.adrowicaksono.xyz/task?id=${id}`, {
                        title: todo.title,
                        task:todo.task,
                        tag:newTag,
                        deadline: new Date(todo.deadline),
                        status: todo.status
                    }, {
                      headers:{
                        token: localStorage.getItem("token")
                      }
                    })
                    .then(function(task){
                      window.location.replace('/home.html')
                      console.log("berhasil")
                    })
                    .catch(function(err){
                      console.log(err)
                    })
                },
                showForm (todo) {
                  this.edited = todo
                  this.isEditing = true
                },
                hideForm () {
                  this.isEditing = false
                  edited = ''
                },
                getTodos(){
                  axios
                  .get('https://test.adrowicaksono.xyz/task',{
                    headers:{
                      token: localStorage.getItem("token")
                    }
                  })
                  .then((todos)=>{
                    this.todos = todos.data.task
                    this.owner = 'Hi, ' + todos.data.task[0].userId.name
                  })
                  .catch(function(err){
                    console.log(err.message)
                  })
                },
                makeMeeting (todo) {
                  this.forMeeting = todo
                  this.isMeeting = true
                },
                closeMeeting () {
                  this.forMeeting = ''
                  this.isMeeting = false
                }
    },        
})