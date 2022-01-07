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
            secondes: 0,
            minutes: 0,
            s: 0,
            temps_chanson: 0,
            son: 0.5,
            texte_volume: "Volume ",
            texte_temps: "Temps: ",
            timeline: 0,
            show_volume: "",
            src: "songs/",
            current_src: "",
            actif: false,
            style_chanson: {
                backgroundColor: "rgb(42, 59, 75)",
            },
        }
    },


    mounted() {

        fetch("chansons.json").then(resp => {
            resp.json().then(contenu_json => {
                this.chansons = contenu_json
            })
        })

    },

    methods: {

        // Affiche la chanson qui a été cliquée
        afficherChanson(chanson) {
            this.chanson_selection = chanson

            // Tout ce qui affiche le temps de la chanson en cours
            this.audio.addEventListener("timeupdate", e => {
                this.temps_actuel = this.audio.currentTime

                //Pour convertir-arrondir à la seconde
                this.secondes = Math.floor(this.audio.currentTime)

                // Pour ajouter les minutes
                this.minutes = Math.floor(this.secondes / 60)

                // donne les secondes restantes
                this.s = this.secondes % 60

                // Si s plus petit que 10, on ajoute un 0 avant s
                if (this.s < 10) {
                    this.timeline = this.minutes + ":" + 0 + this.s
                } else {
                    this.timeline = this.minutes + ":" + this.s
                }
            })

            this.secondes = chanson.temps
            this.minutes = Math.floor(this.secondes / 60)
            this.s = this.secondes % 60
            this.temps_chanson = this.minutes + ":" + "0" + this.s


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

        tempsChanson(chanson) {

            this.secondes = chanson
            this.minutes = Math.floor(this.secondes / 60)
            this.s = this.secondes % 60

            if (this.s < 10) {
                return this.minutes + ":" + 0 + this.s
            } else {
                return this.minutes + ":" + this.s
            }

        },

        rechercheChansons(chanson) {
            if (chanson.titre.toLowerCase().includes(this.texte_input) || chanson.artiste.toLowerCase().includes(this.texte_input)) {
                return true
            }
            return false
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
            this.show_volume = "(" + Math.round(this.son * 100) + "%)"
        }

    },
})