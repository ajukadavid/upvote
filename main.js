const submissionComponent = {
    template: `<div style="display: flex; width: 100%">
<figure class="media-left">
<img class="image is-64x64"
v-bind:src="submission.submissionImage">
</figure>
<div class="media-content">
<div class="content">
<p>
<strong>
<a v-bind:href="submission.url" class="has-text-info">
{{ submission.title }}
</a>
<span class="tag is-small">#{{ submission.id }}</span>
</strong>
<br>
{{ submission.description }}
<br>
<small class="is-size-7">
Submitted by:
<img class="image is-24x24"
v-bind:src="submission.avatar">
</small>
</p>
</div>
</div>
<div class="media-right">
<span class="icon is-small" v-on:click="upvote(submission.id)">
<i class="fa fa-chevron-up"></i>
<strong class="has-text-info">{{ submission.votes }}</strong>
</span>
</div>
</div>`,
props: ['submission', 'submissions'],

methods: {
    upvote(id){
        const submission = this.submissions.find((submission) => submission.id === id)
        submission.votes++
    }
}

}

const submissonForm = {
    template: `
    <h1>New Submission</h1>
    <form @submit.prevent="handleSubmit">
    <label>
    Title
    <input type="text" placeholder="title" v-model="title"/>
    </label>
    <label>
    description
    <input type="text" placeholder="description" v-model="description"/>
    </label>
    <label>
    votes
    <input type="number" placeholder="number of votes" v-model="votes"/>
    </label>
    <input type="submit" value="Add submission" class="submitButton"/>
    </form>
    `,
    data() {
        return  { 

                id: '',
                title: '',
                description: '',
                url: '',
                votes: ''    
        }
    }, 
    methods: {
        handleSubmit(){
            const newSubmission = {
                id: Math.floor(Math.random() * 100),
                title: this.title,
                description: this.description,
                url: '#',
                votes: this.votes,
                avatar: '../public/images/avatars/molly.png',
                submissionImage: '../public/images/submissions/image-aqua.png',
            }
            let mainSubmissions = Seed.submissions
            mainSubmissions.push(newSubmission)
            console.log(mainSubmissions)
        }
    }
}
const upvoteApp = {
    components: {
            "submissionComponent": submissionComponent,
            "submissonForm": submissonForm      
    },
    data(){
        return {
            submissions: Seed.submissions
        }
    },
    computed: {
        sortedSubmissions() {
            return this.submissions.sort((a, b) => {
                return b.votes - a.votes
            })
        }
    },
   
}

Vue.createApp(upvoteApp).mount('#app')
