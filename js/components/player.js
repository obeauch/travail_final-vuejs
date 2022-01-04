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
            son: 0.5,
            show_volume: "",
            src: "songs/",
            current_src: "",
        }
    },


    mounted() {

        // faire un copier coller fetch pour tout projet
        fetch("chansons.json").then(resp => {
            resp.json().then(contenu_json => {
                this.chansons = contenu_json
            })
        })

    },

    methods: {
        afficherChanson(chanson) {
            this.chanson_selection = chanson

            this.audio.addEventListener("timeupdate", e => {
                this.temps_actuel = this.audio.currentTime
            })


            /**
             * Lorsque une chanson est affichée, musique_joue est à false afin que le bouton play soit visible.
             */
            this.musique_joue = false



            /**
             * place dans la source audio le current_src
             * qui contient src-> "songs/" et la chanson en lecture (chanson.audio)
             **/
            this.current_src = this.src + chanson.audio
            this.audio.setAttribute("src", this.current_src)

        },

        // au click sur bouton play, la musique débute et musique_joue devient false, ce qui affiche bouton pause et vice/versa.
        play() {
            this.audio.addEventListener("play", e => {
                this.musique_joue = true
            })
            this.audio.play()

        },

        pause() {
            this.audio.addEventListener("pause", e => {
                this.musique_joue = false
            })
            this.audio.pause()
        },

        volume() {
            this.audio.volume = this.son
            this.show_volume = "Volume (" + Math.round(this.son * 100) + "%)"
        }

    },
})