let app = new Vue({
    el: '#app',
    data: {
        zp: '',
        mrp: 3063,
        mzp: 60000,
        mrp14: 42882,
        mrp25: 76575,
        result: '',
        jsonData: '',
        selected: '',
        pickedMzp: '',
        pickedRezident: '',
        opv: ''
    },

    methods: {
        async getJson() {
            const responce = await fetch("main.json");
            if (responce.ok) {
                const jsonData = await responce.json();
                this.jsonData = jsonData;
            } else {
                alert("Ошибка при соединении с сервером");
            }
        },

        calc: function () {
            for (let key in this.pickedRezident) {
                if (this.pickedRezident.name == "Резидент") {
                    for (let key in this.pickedRezident.koef) {
                    this.opv = this.zp * this.pickedRezident.koef.opv;
                    let vosms = this.zp * this.pickedRezident.koef.vosms;
                    let kor90 = (this.zp - opv - vosms) * this.pickedRezident.koef.kor90;
                    let ipn = Math.floor((this.zp - opv - kor90 - 0 - vosms) * this.pickedRezident.koef.opv);
                    let oosms = this.zp * this.pickedRezident.koef.oosms;
                    let so = this.mzp * this.pickedRezident.koef.so;
                    let sn = Math.floor(this.mrp14 * 0.095 - so);
                    this.result = Math.floor(+this.zp - ipn - opv - vosms) + ' тенге';
                    }
                }
                if (this.pickedRezident.name == "Не резидент") {
                    for (let key in this.pickedRezident.koef) {
                    let opv = this.zp * this.pickedRezident.koef.opv;
                    let vosms = this.zp * this.pickedRezident.koef.vosms;
                    let kor90 = (this.zp - opv - vosms) * this.pickedRezident.koef.kor90;
                    let ipn = Math.floor(this.zp * this.pickedRezident.koef.opv);
                    let oosms = this.zp * this.pickedRezident.koef.oosms;
                    let so = this.mzp * this.pickedRezident.koef.so;
                    let sn = Math.floor(this.mrp14 * 0.095 - so);
                    this.result = Math.floor(+this.zp - ipn - opv - vosms) + ' тенге';
                    }
                }
            }
        }
    },

    async mounted() {
        await this.getJson();
    }
})