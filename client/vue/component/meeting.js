const Meeting = {
    template:`
            <div class="modal is-active">
               <div class="modal-background" @click="meetingClose"></div>
                    <div class="modal-content" style="width:90%;">
                        <div class="box">
                        <div class="field">
                            <label class="label">Create Your Space For The Meeting</label>
                            <div class="control">
                                <form  method="POST" action="https://writer.zoho.com/writer/remotedoc.im" target="result" accept-charset="UTF-8">
                                    <input type="hidden" name="apikey" value="5c3a0816a1c4110a9f8838b802a40882">
                                    <input type="hidden" name="output" value="url">
                                    <input type="hidden" name="mode" value="collabedit">
                                    <input class="input is-primary" name="filename" v-bind:value="todo.title" type="text" placeholder="insert main topic here..">
                                    <input type="hidden" name="lang" value="en">
                                    <input type="hidden" name="id" value="1234">
                                    <input type="hidden" name="format" value="docx">
                                    <input type="submit" class="button is-link is-focused" name="submit" value="Generate link url">
                                </form>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label has-text-left">URL LINK</label>
                            <p class="has-text-info"> please copy and paste all text into text area </p> 
                            <div class="control">
                                <iframe class="card" ref="result" id="ifr" src="zoho.html" style="width:100%;"  name="result"></iframe>
                            </div>
                            <br>
                            <div class="control">
                                <p class="has-text-danger has-text-left">paste here  </p>
                                <textarea v-model="zohoResponse"  class="textarea is-info" type="text" placeholder="PASTE HERE"></textarea>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column is-6">
                                <div class="field">
                                    <label class="label has-text-left">People</label>
                                    <p class="control has-icons-left has-icons-right">
                                    <input 
                                        class="input" 
                                        type="email" 
                                        placeholder="Email" 
                                        v-model="people"
                                    >
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-envelope"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                        <i class="fas fa-check"></i>
                                    </span>
                                    </p>
                                </div>
                                <div class="field">
                                    <button class="button is-link is-focused" name="submit" v-on:click="addPeople" > add </button>
                                </div>
                            </div>
                            <div class="column is-6">
                                <div class="field">
                                    <table class="table card" style="width:100%;" >
                                        <thead>
                                            <tr>
                                                <th>list email</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="i in peoples" >
                                                <td>{{i}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="field">
                            <button class="button is-link is-focused" v-on:click="sentMail">invite and start meeting</button>
                        </div>
                    </div>
                    <button class="modal-close" @click="meetingClose"></button> 
                </div>
            </div>`,
    props:['todo'],
    data () {
        return {
            zohoResponse:'',
            DocId : '',
            peoples : [],
            people : '',
            urlToGo : '',
        }
    },
    watch :{
        zohoResponse : function(){
            let DocId = this.zohoResponse.split('=')
            this.DocId = DocId[DocId.length-1]
            let doc = DocId[2].split(' ')
            this.urlToGo= DocId[1]+'='+doc[0]
        }
    },
    methods: {
        meetingClose () {
            console.log("meetingClose")
            this.$emit('close-meeting')
        },
        saveChange () {
            console.log("savechange")
            // this.$emit('hide-form')
        },
        addPeople () {
            this.peoples.push(this.people)
            this.people = ''
        },
        sentMail () {
            console.log("=========== sent email ===========")
            console.log(this.urlToGo)
            let url = this.urlToGo
            const link = document.createElement('a')
            link.href = url
            // link.setAttribute('download', 'file.docx')
            document.body.appendChild(link)
            link.click()
            axios
            .post('http://localhost:3000/mail/',{
                peoples :this.peoples,
                documentId : this.DocId
            }, {
                headers : {
                    token : localStorage.getItem("token")
                }
            })
            .then(response => {
                console.log(response)
            })
            .catch( err => {
                console.log(err, "err mail")
            } )
        }
        
       
    }
}




// URL=https://writer.zoho.com/writer/editor.im?doc=d26aa7b8029bf4f8d34c7dd0013939230e67120270a31be4e5a6cd8eeaf3c1c984317afbc16c66eb5c0c620ee5efa8e5 WARNING=NULL RESULT=TRUE DOCUMENTID=8xcpva367207ad82045e1b13b72e4610c0e49