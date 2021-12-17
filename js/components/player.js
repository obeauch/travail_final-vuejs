import externalTemplate from '../externalTemplate.js'

export default externalTemplate({

    template_url: "js/components/player.html",

    data() {
        return {
            chansons: [],
            texte_input: "",
            chanson_selection: false,

            audio: new Audio(),
            musique_joue: false,
            temps_actuel: 0,
        }
    },


    mounted() {

        // faire un copier coller fetch pour tout projet
        fetch("chansons.json").then(resp => {
            resp.json().then(contenu_json => {
                this.chansons = contenu_json
            })
        })


        // play, pause, ended, timeupdate
        this.audio.addEventListener("play", e => {
            this.musique_joue = true
        })

        this.audio.addEventListener("timeupdate", e => {
            this.temps_actuel = this.audio.currentTime
        })

        // <img :src="'images/' + jeu.images[0]" alt="">
        this.audio.setAttribute("src", "sons/food-vlog-11204.mp3")
        this.audio.play()
        this.audio.volume = 0.1
        // this.audio.pause()


    },

    methods: {
        jouerChanson(chanson) {
            this.chanson_selection = chanson

        }

    },
})