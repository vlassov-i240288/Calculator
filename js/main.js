let app = new Vue({
    el: '#app',
    data: {
        zp: '',
        mrp: 3063,
        mzp: 60000,
        mrp14: 42882,
        mrp25: 76575,

        jsonData: '',
        selected: '',
        pickedMzp: '',
        pickedRezident: '',

        opv: '',
        vosms: '',
        kor90: '',
        ipn: '',
        oosms: '',
        so: '',
        sn: '',
        result: '',

        styleWarningSelect: {
            color: 'red',
            textTransform: 'uppercase',
            display: 'none'
        },

        styleWarningMzp: {
            color: 'red',
            textTransform: 'uppercase',
            display: 'none'
        },

        styleWarningRez: {
            color: 'red',
            textTransform: 'uppercase',
            display: 'none'
        }

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

        clearPickedMzp() {
            this.pickedMzp = '';
        },

        clearPickedRezident() {
            this.pickedRezident = '';
        },

        calc() {
            if (this.selected.title == "ТОО на ОУР" ||
                this.selected.title == "ТОО на ОУР студент" ||
                this.selected.title == "ТОО на СНР" ||
                this.selected.title == "ТОО на СНР студент" ||
                this.selected.title == "ИП на ОУР" ||
                this.selected.title == "ИП на ОУР студент" ||
                this.selected.title == "ИП на СНР" ||
                this.selected.title == "ИП на СНР студент") {
                if (this.pickedMzp.titleMzp == "Без вычета МЗП") {
                    if (this.pickedRezident.name == "Резидент") {
                        this.opv = this.zp * this.pickedRezident.koef.opv;
                        this.vosms = this.zp * this.pickedRezident.koef.vosms;
                        this.kor90 = (this.zp - this.opv - this.vosms) * this.pickedRezident.koef.kor90;
                        this.ipn = Math.floor((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.opv);
                        this.oosms = this.zp * this.pickedRezident.koef.oosms;
                        if (this.zp >= 70000) {
                            this.so = Math.floor((this.zp - this.opv) * this.pickedRezident.koef.so);
                            this.sn = Math.floor((this.zp - this.opv - this.vosms + 1) * 0.095 - this.so);
                            if (this.zp >= 200000) {
                                this.kor90 = 0;
                                this.ipn = Math.floor((this.zp - this.opv - 0 - this.vosms) * this.pickedRezident.koef.opv);
                            }
                        } else if (this.zp < 70000) {
                            this.so = Math.floor(this.mzp * this.pickedRezident.koef.so);
                            this.sn = Math.floor(this.mrp14 * 0.095 - this.so + 1);
                        }

                        this.result = Math.floor(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                    if (this.pickedRezident.name == "Не резидент") {
                        this.opv = this.zp * this.pickedRezident.koef.opv;
                        this.vosms = this.zp * this.pickedRezident.koef.vosms;
                        this.kor90 = (this.zp - this.opv - this.vosms) * this.pickedRezident.koef.kor90;
                        this.ipn = Math.floor(this.zp * this.pickedRezident.koef.opv);
                        this.oosms = this.zp * this.pickedRezident.koef.oosms;
                        if (this.zp >= 70000) {
                            this.so = Math.floor((this.zp - this.opv) * this.pickedRezident.koef.so);
                            this.sn = Math.floor((this.zp - this.opv - this.vosms + 1) * 0.095 - this.so);
                        } else if (this.zp < 70000) {
                            this.so = Math.floor(this.mzp * this.pickedRezident.koef.so);
                            this.sn = Math.floor(this.mrp14 * 0.095 - this.so + 1);
                        }
                        this.result = Math.floor(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                }
                if (this.pickedMzp.titleMzp == "С вычетом МЗП") {
                    if (this.pickedRezident.name == "Резидент") {
                        this.opv = this.zp * this.pickedRezident.koef.opv;
                        this.vosms = this.zp * this.pickedRezident.koef.vosms;
                        if (this.zp >= 70000) {
                            this.ipn = Math.floor((this.zp - this.opv - this.pickedRezident.koef.kor9070 - this.mrp14 - this.vosms) * this.pickedRezident.koef.ipn70);
                            this.kor90 = Math.floor((this.zp - this.opv - this.mrp14 - this.vosms) * this.pickedRezident.koef.kor9070);
                            this.so = Math.floor((this.zp - this.opv) * this.pickedRezident.koef.so);
                            this.sn = Math.floor((this.zp - this.opv - this.vosms + 1) * 0.095 - this.so);
                            if (this.zp >= 200000) {
                                this.kor90 = 0;
                                this.ipn = Math.floor((this.zp - this.opv - this.mrp14 - this.vosms) * this.pickedRezident.koef.opv);
                            }
                        } else if (this.zp < 70000) {
                            this.ipn = this.pickedRezident.koef.ipn;
                            this.kor90 = (this.zp - this.opv - this.vosms) * this.pickedRezident.koef.kor90;
                            this.so = this.mzp * this.pickedRezident.koef.so;
                            this.sn = Math.floor(this.mrp14 * 0.095 - this.so + 1);
                        }
                        this.oosms = this.zp * this.pickedRezident.koef.oosms;
                        this.result = Math.floor(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                    if (this.pickedRezident.name == "Не резидент") {
                        this.opv = this.zp * this.pickedRezident.koef.opv;
                        this.vosms = this.zp * this.pickedRezident.koef.vosms;
                        this.kor90 = (this.zp - this.opv - this.vosms) * this.pickedRezident.koef.kor90;
                        this.ipn = Math.floor(this.zp * this.pickedRezident.koef.opv);
                        this.oosms = this.zp * this.pickedRezident.koef.oosms;
                        if (this.zp >= 70000) {
                            this.so = Math.floor((this.zp - this.opv) * this.pickedRezident.koef.so);
                            this.sn = Math.floor((this.zp - this.opv - this.vosms + 1) * 0.095 - this.so);
                        } else if (this.zp < 70000) {
                            this.so = this.mzp * this.pickedRezident.koef.so;
                            this.sn = Math.floor(this.mrp14 * 0.095 - this.so + 1);
                        }
                        this.result = Math.floor(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                }
            }
            if (this.selected.title == "ТОО на ОУР пенсионер" ||
                this.selected.title == "ТОО на СНР пенсионер" ||
                this.selected.title == "ИП на ОУР пенсионер" ||
                this.selected.title == "ИП на СНР пенсионер") {
                if (this.pickedMzp.titleMzp == "Без вычета МЗП") {
                    if (this.pickedRezident.name == "Резидент") {
                        this.opv = this.zp * this.pickedRezident.koef.opv;
                        this.vosms = this.zp * this.pickedRezident.koef.vosms;
                        this.kor90 = (this.zp - this.opv - this.vosms) * this.pickedRezident.koef.kor90;
                        this.ipn = Math.floor((this.zp - this.opv - this.kor90 - 0 - this.vosms) * 0.1);
                        this.oosms = this.zp * this.pickedRezident.koef.oosms;
                        if (this.zp >= 70000) {
                            this.so = (this.zp - this.opv) * this.pickedRezident.koef.so;
                            this.sn = Math.floor((this.zp - this.opv - this.vosms + 1) * 0.095 - this.so);
                            if (this.zp >= 200000) {
                                this.kor90 = 0;
                                this.ipn = Math.floor((this.zp - this.opv - 0 - this.vosms) * this.pickedRezident.koef.ipn);
                            }
                        } else if (this.zp < 70000) {
                            this.so = this.mzp * this.pickedRezident.koef.so;
                            this.sn = Math.floor(this.mrp14 * 0.095 - this.so + 1);
                        }
                        this.result = Math.floor(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                    if (this.pickedRezident.name == "Не резидент") {
                        this.opv = this.zp * this.pickedRezident.koef.opv;
                        this.vosms = this.zp * this.pickedRezident.koef.vosms;
                        this.kor90 = (this.zp - this.opv - this.vosms) * this.pickedRezident.koef.kor90;
                        this.ipn = Math.floor(this.zp * 0.1);
                        this.oosms = this.zp * this.pickedRezident.koef.oosms;
                        if (this.zp >= 70000) {
                            this.so = (this.zp - this.opv) * this.pickedRezident.koef.so;
                            this.sn = Math.floor((this.zp - this.opv - this.vosms + 1) * 0.095 - this.so);
                        } else if (this.zp < 70000) {
                            this.so = this.mzp * this.pickedRezident.koef.so;
                            this.sn = Math.floor(this.mrp14 * 0.095 - this.so + 1);
                        }
                        this.result = Math.floor(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                }
                if (this.pickedMzp.titleMzp == "С вычетом МЗП") {
                    if (this.pickedRezident.name == "Резидент") {
                        this.opv = this.zp * this.pickedRezident.koef.opv;
                        this.vosms = this.zp * this.pickedRezident.koef.vosms;
                        this.oosms = this.zp * this.pickedRezident.koef.oosms;
                        if (this.zp >= 70000) {
                            this.ipn = Math.floor((this.zp - this.opv - this.pickedRezident.koef.kor9070 - this.mrp14 - this.vosms) * this.pickedRezident.koef.ipn70);
                            this.kor90 = Math.floor((this.zp - this.opv - this.mrp14 - this.vosms) * this.pickedRezident.koef.kor9070);
                            this.so = (this.zp - this.opv) * this.pickedRezident.koef.so;
                            this.sn = Math.floor((this.zp - this.opv - this.vosms + 1) * 0.095 - this.so);
                            if (this.zp >= 200000) {
                                this.kor90 = 0;
                                this.ipn = Math.floor((this.zp - this.opv - this.mrp14 - this.vosms) * this.pickedRezident.koef.ipn200);
                            }
                        } else if (this.zp < 70000) {
                            this.ipn = this.pickedRezident.koef.ipn;
                            this.kor90 = (this.zp - this.opv - this.vosms) * this.pickedRezident.koef.kor90;
                            this.so = this.mzp * this.pickedRezident.koef.so;
                            this.sn = Math.floor(this.mrp14 * 0.095 - this.so + 1);
                        }
                        this.result = Math.floor(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                    if (this.pickedRezident.name == "Не резидент") {
                        this.opv = this.zp * this.pickedRezident.koef.opv;
                        this.vosms = this.zp * this.pickedRezident.koef.vosms;
                        this.kor90 = (this.zp - this.opv - this.vosms) * this.pickedRezident.koef.kor90;
                        this.ipn = Math.floor(this.zp * 0.1);
                        this.oosms = this.zp * this.pickedRezident.koef.oosms;
                        if (this.zp >= 70000) {
                            this.so = (this.zp - this.opv) * this.pickedRezident.koef.so;
                            this.sn = Math.floor((this.zp - this.opv - this.vosms + 1) * 0.095 - this.so);
                        } else if (this.zp < 70000) {
                            this.so = this.mzp * this.pickedRezident.koef.so;
                            this.sn = Math.floor(this.mrp14 * 0.095 - this.so + 1);
                        }
                        this.result = Math.floor(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                }
            }

            if (this.selected == '') {
                this.styleWarningSelect.display = 'inline-block';
            } else {
                this.styleWarningSelect.display = 'none'
            }

            if (this.pickedMzp == '') {
                this.styleWarningMzp.display = 'inline-block';
            } else {
                this.styleWarningMzp.display = 'none'
            }

            if (this.pickedRezident == '') {
                this.styleWarningRez.display = 'inline-block';
            } else {
                this.styleWarningRez.display = 'none'
            }




            // if (this.pickedRezident == '') {
            //     this.styleObject.display = 'inline-block';
            // } else {
            //     this.styleObject.display = 'none'
            // }
        }
    },

    async mounted() {
        await this.getJson();
    }
})