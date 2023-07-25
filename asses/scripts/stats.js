//metodo funcion
const { createApp } = Vue;

//inicia con un objeto como argumento
createApp({
    data() {
        return {
            // propiedades reactivas
            events: [],
            current: "",
            arrayCategoriesPast: [],
            arrayCategoriesUpComing: [],
            upComingEvents: [],
            pastEvents: [],
            percentage: [],
            revenues: "",
            porcentajeMenorAssis: "",
            porcentajeMenorAssisName: "",
            porcentMasAssis: "",
            porcentMasAssisName: "",
            arrayOrder: [],
            nameMasCapacity: "",
            masCapacity: Number,
            forCategoryPast: [],
            forCategoryUpComing: [],
        };
    },
    created() {
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
            .then((data) => data.json())
            .then((data) => {
                this.events = data.events;
                this.current = data.currentDate

                this.upComingEvents = this.events.filter(event => event.date >= this.current)

                this.pastEvents = this.events.filter(event => event.date < this.current)

                this.arrayCategoriesPast = [...new Set(this.pastEvents.map((event) => event.category))];

                this.arrayCategoriesUpComing = [...new Set(this.upComingEvents.map((event) => event.category))];

                this.arrayOrder = this.events.sort((a, b) => a.capacity - b.capacity)

                this.nameMasCapacity = this.arrayOrder[this.arrayOrder.length - 1].name

                this.masCapacity = this.arrayOrder[this.arrayOrder.length - 1].capacity.toLocaleString('de-DE')

                this.percentage = this.pastEvents.sort((a, b) => this.calculatePercentage(a.assistance, a.capacity) - this.calculatePercentage(b.assistance, b.capacity))

                this.porcentajeMenorAssis = this.calculatePercentage(this.percentage[0].assistance, this.percentage[0].capacity)

                this.porcentajeMenorAssisName = this.percentage[0].name

                this.porcentMasAssis = this.calculatePercentage(this.percentage[this.percentage.length - 1].assistance, this.percentage[this.percentage.length - 1].capacity).toFixed(2)

                this.porcentMasAssisName = this.percentage[this.percentage.length - 1].name

                this.forCategoryPast = this.arrayCategoriesPast.map(category => {
                    let eventFilter = this.pastEvents.filter(event => event.category == category)
                    assistance = 0;
                    capacity = 0;
                    let revenuesPastEvents = 0;
                    let percentageOfAssistancePastEvents = 0;
                    for (const event of eventFilter) {
                        revenuesPastEvents += event.price * event.assistance
                        assistance += event.assistance
                        capacity += event.capacity
                    }

                    percentageOfAssistancePastEvents = this.calculatePercentage(assistance, capacity).toFixed(2)
                    return { name: category, revenues: revenuesPastEvents.toLocaleString('de-DE'), assistance: percentageOfAssistancePastEvents };
                })
                this.forCategoryUpComing = this.arrayCategoriesUpComing.map(category => {
                    let eventFilter = this.upComingEvents.filter(event => event.category == category)
                    estimate = 0;
                    capacity = 0;
                    let revenuesUpcoming = 0;
                    let percentageOfAssistanceUpcoming = 0;
                    
                    for (const event of eventFilter) {
                        revenuesUpcoming += event.price * event.estimate
                        estimate += event.estimate
                        capacity += event.capacity
                    }

                    percentageOfAssistanceUpcoming = this.calculatePercentage(estimate, capacity).toFixed(2)

                    return { name: category, revenues: revenuesUpcoming.toLocaleString('de-DE'), estimate: percentageOfAssistanceUpcoming };
                })
            })
            .catch((error) => console.error(error.message));
    },
    methods: {
        calculatePercentage(assistance, capacity) {
            let porcentaje = (assistance / capacity) * 100
            return porcentaje
        }
    },
}).mount("#app");//montar mi app vue sobre el id app