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

        formulKor90: '',
        formulOpv: '',
        formulIpn: '',
        formulVosms: '',
        formulSo: '',
        formulSn: '',
        formulOosms: '',
        formulResult: '',

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
        },

        styleWarningZp: {
            color: 'red',
            textTransform: 'uppercase',
            display: 'none'
        },

        formul: {
            display: 'none',
            color: 'cornflowerblue',
            fontSize: '12px'
        },

        total: {
            display: 'none'
        },

        calculator: {
            display: 'none',
            flexDirection: 'column'
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

        checkSelect() {
            this.calculator.display = 'flex'
        },

        clearPickedMzp() {
            this.pickedMzp = '';
        },

        clearPickedRezident() {
            this.pickedRezident = '';
        },




        calc() {
            if (this.selected.title == "ТОО на ОУР") {
                if (this.pickedMzp.titleMzp == "Без вычета МЗП") {
                    if (this.pickedRezident.name == "Резидент") {
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.formulOpv = `расчёт: ОПВ = ЗП ${this.zp} * ${this.pickedRezident.koef.opv}`;
                        this.vosms = Math.round(this.zp * this.pickedRezident.koef.vosms);
                        this.formulVosms = `расчёт: ВОСМС = ЗП ${this.zp} * ${this.pickedRezident.koef.vosms}`;
                        this.kor90 = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.kor90);
                        this.formulKor90 = `расчёт: КОР90 = (ЗП ${this.zp} - ОПВ ${this.opv} - ВОСМС ${this.vosms}) * ${this.pickedRezident.koef.kor90}`;
                        this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.opv);
                        this.formulIpn = `расчёт: ИПН = (ЗП ${this.zp} - ОПВ ${this.opv} - КОР90 ${this.kor90} - 0 - ВОСМС ${this.vosms}) * ${this.pickedRezident.koef.opv}`
                        this.oosms = Math.round(this.zp * this.pickedRezident.koef.oosms);
                        this.formulOosms = `расчёт: ООСМС = ЗП ${this.zp} * ${this.pickedRezident.koef.oosms}`;
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.formulSo = `расчёт: СО = МЗП ${this.mzp} * ${this.pickedRezident.koef.so}`;
                        this.sn = Math.round(this.mrp14 * this.pickedRezident.koef.sn - this.so);
                        this.formulSn = `расчёт: СН = МРП14 ${this.mrp14} * ${this.pickedRezident.koef.sn} - СО ${this.so}`;
                        if (this.zp >= 48740) {
                            this.kor90 = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.kor90);
                            this.formulKor90 = `расчёт: КОР90 = (ЗП ${this.zp} - ОПВ ${this.opv} - ВОСМС ${this.vosms}) * ${this.pickedRezident.koef.kor90}`;
                            this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                            this.formulSo = `расчёт: СО = МЗП ${this.mzp} * ${this.pickedRezident.koef.so}`;
                            this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                            this.formulSn = `расчёт: СН = (ЗП ${this.zp} - ОПВ ${this.opv} - ВОСМС ${this.vosms}) * ${this.pickedRezident.koef.so}`
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.ipn);
                            this.formulIpn = `расчёт: ИПН = (ЗП ${this.zp} - ОПВ ${this.opv} - КОР90 ${this.kor90} - 0 - ВОСМС ${this.vosms}) * ${this.pickedRezident.koef.ipn}`
                        }
                        if (this.zp >= this.mzp) {
                            this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                            this.formulSo = `расчёт: СО = МЗП ${this.mzp} * ${this.pickedRezident.koef.so}`;
                            this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                            this.formulSn = `расчёт: СН = (ЗП ${this.zp} - ОПВ ${this.opv} - ВОСМС ${this.vosms}) * ${this.pickedRezident.koef.sn} - СО ${this.so}`
                        }
                        if (this.zp >= 66670) {
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                            this.formulSo = `расчёт: СО = (ЗП ${this.zp} - ОПВ ${this.opv}) * ${this.pickedRezident.koef.so}`;
                            this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                            this.formulSn = `расчёт: СН = (ЗП ${this.zp} - ОПВ ${this.opv} - ВОСМС ${this.vosms}) * ${this.pickedRezident.koef.sn} - СО ${this.so}`
                        }
                        if (this.zp >= 76576) { //76576
                            this.kor90 = 0;
                            // this.formulKor90 = `расчёт: КОР90 = (ЗП ${this.zp} - ОПВ ${this.opv} - ВОСМС ${this.vosms}) * ${this.pickedRezident.koef.kor90}`;
                            this.formulKor90 = `расчёт: КОР90 = 0`;
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.opv);
                            this.formulIpn = `расчёт: ИПН = (ЗП ${this.zp} - ОПВ ${this.opv} - КОР90 ${this.kor90} - 0 - ВОСМС ${this.vosms}) * ${this.pickedRezident.koef.opv}`
                        }
                        if (this.zp >= 466668) {
                            this.kor90 = 0;
                            this.formulKor90 = `расчёт: КОР90 = 0`;
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.opv);
                            this.formulIpn = `расчёт: ИПН = (ЗП ${this.zp} - ОПВ ${this.opv} - КОР90 ${this.kor90} - 0 - ВОСМС ${this.vosms}) * ${this.pickedRezident.koef.opv}`
                            this.so = Math.round(420000 * this.pickedRezident.koef.so);
                            this.formulSo = `расчёт: СО = (420000 * ${this.pickedRezident.koef.so}`;
                            this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                            this.formulSn = `расчёт: СН = (ЗП ${this.zp} - ОПВ ${this.opv} - ВОСМС ${this.vosms}) * ${this.pickedRezident.koef.sn} - СО ${this.so}`
                        }
                        this.result = Math.round(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                        this.formulResult = `расчёт: ЗП = (ЗП ${this.zp} - ИПН ${this.ipn} - ОПВ ${this.opv} - ВОСМС ${this.vosms})`
                    }
                    if (this.pickedRezident.name == "Нерезидент") {
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.formulOpv = `расчёт: ОПВ = ЗП ${this.zp} * ${this.pickedRezident.koef.opv}`;
                        this.vosms = Math.round(this.zp * this.pickedRezident.koef.vosms);
                        this.formulVosms = `расчёт: ВОСМС = ЗП ${this.zp} * ${this.pickedRezident.koef.vosms}`;
                        this.kor90 = 0;
                        this.formulKor90 = `расчёт: КОР90 = 0`;
                        this.ipn = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.formulIpn = `расчёт: ИПН = ЗП ${this.zp} * ${this.pickedRezident.koef.opv}`
                        this.oosms = Math.round(this.zp * this.pickedRezident.koef.oosms);
                        this.formulOosms = `расчёт: ООСМС = ЗП ${this.zp} * ${this.pickedRezident.koef.oosms}`;
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.formulSo = `расчёт: СО = МЗП ${this.mzp} * ${this.pickedRezident.koef.so}`;
                        this.sn = Math.round(this.mrp14 * this.pickedRezident.koef.sn - this.so);
                        this.formulSn = `расчёт: СН = МРП14 ${this.mrp14} * ${this.pickedRezident.koef.sn} - СО ${this.so}`;
                        if (this.zp >= 48735) { // 42882
                            this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                            this.formulSn = `расчёт: СН = (ЗП ${this.zp} - ОПВ ${this.opv} - ВОСМС ${this.vosms}) * ${this.pickedRezident.koef.so}`
                        }
                        if (this.zp >= 66670) {
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                            this.formulSo = `расчёт: СО = (ЗП ${this.zp} - ОПВ ${this.opv}) * ${this.pickedRezident.koef.so}`;
                            this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                            this.formulSn = `расчёт: СН = (ЗП ${this.zp} - ОПВ ${this.opv} - ВОСМС ${this.vosms}) * ${this.pickedRezident.koef.so}`
                        }
                        if (this.zp >= 466668) {
                            this.kor90 = 0;
                            this.formulKor90 = `расчёт: КОР90 = 0`;
                            this.ipn = Math.round(this.zp * this.pickedRezident.koef.opv);
                            this.formulIpn = `расчёт: ИПН = ЗП ${this.zp} * ${this.pickedRezident.koef.opv}`
                            this.so = Math.round(420000 * this.pickedRezident.koef.so);
                            this.formulSo = `расчёт: СО = (420000 * ${this.pickedRezident.koef.so}`;
                            this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                            this.formulSn = `расчёт: СН = (ЗП ${this.zp} - ОПВ ${this.opv} - ВОСМС ${this.vosms}) * ${this.pickedRezident.koef.sn} - СО ${this.so}`
                        }
                        this.result = Math.floor(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                        this.formulResult = `расчёт: ЗП = (ЗП ${this.zp} - ИПН ${this.ipn} - ОПВ ${this.opv} - ВОСМС ${this.vosms})`
                    }
                }

                if (this.pickedMzp.titleMzp == "С вычетом МЗП") {
                    if (this.pickedRezident.name == "Резидент") {
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.formulOpv = `расчёт: ОПВ = ЗП ${this.zp} * ${this.pickedRezident.koef.opv}`;
                        this.vosms = Math.round(this.zp * this.pickedRezident.koef.vosms);
                        this.formulVosms = `расчёт: ВОСМС = ЗП ${this.zp} * ${this.pickedRezident.koef.vosms}`;
                        this.ipn = 0;
                        this.formulIpn = `расчёт: ИПН = 0`;
                        this.kor90 = 0;
                        this.formulKor90 = `расчёт: КОР90 = 0`;
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.formulSo = `расчёт: СО = МЗП ${this.mzp} * ${this.pickedRezident.koef.so}`;
                        this.sn = Math.round(this.mrp14 * 0.095 - this.so);
                        this.formulSn = `расчёт: СН = МРП14 ${this.mrp14} * ${this.pickedRezident.koef.sn} - СО ${this.so}`;
                        this.oosms = Math.round(this.zp * this.pickedRezident.koef.oosms);
                        this.formulOosms = `расчёт: ООСМС = ЗП ${this.zp} * ${this.pickedRezident.koef.oosms}`;
                        if (this.zp >= 48731) {
                            this.kor90 = Math.round((this.zp - this.opv - this.mrp14 - this.vosms) * this.pickedRezident.koef.kor90);
                            this.formulKor90 = `расчёт: КОР90 = (ЗП ${this.zp} - ОПВ ${this.opv} - МРП14 ${this.mrp14} - ВОСМС ${this.vosms}) * ${this.pickedRezident.koef.kor90}`;
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - this.mrp14 - this.vosms) * this.pickedRezident.koef.ipn);
                            this.formulIpn = `расчёт: ИПН = (ЗП ${this.zp} - ОПВ ${this.opv} - КОР90 ${this.kor90} - МРП14 ${this.mrp14} - ВОСМС ${this.vosms}) * ${this.pickedRezident.koef.ipn}`
                            this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                            this.formulSn = `расчёт: СН = (ЗП ${this.zp} - ОПВ ${this.opv} - ВОСМС ${this.vosms}) * ${this.pickedRezident.koef.sn} - СО ${this.so}`
                        }
                        if (this.zp >= 66670) {
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                            this.formulSo = `расчёт: СО = (ЗП ${this.zp} - ОПВ ${this.opv}) * ${this.pickedRezident.koef.so}`
                            this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                            this.formulSn = `расчёт: СН = (ЗП ${this.zp} - ОПВ ${this.opv} - ВОСМС ${this.vosms}) * ${this.pickedRezident.koef.sn} - СО ${this.so}`
                        }
                        if (this.zp >= 76576) {
                            this.kor90 = 0;
                            this.formulKor90 = `расчёт: КОР90 = 0`;
                            this.ipn = Math.round((this.zp - this.opv - this.mrp14 - this.vosms) * this.pickedRezident.koef.ipn);
                            this.formulIpn = `расчёт: ИПН = (ЗП ${this.zp} - ОПВ ${this.opv} - МРП14 ${this.mrp14} - ВОСМС ${this.vosms}) * ${this.pickedRezident.koef.ipn}`
                        }
                        if (this.zp >= 466667) { //76576
                            this.kor90 = 0;
                            this.formulKor90 = `расчёт: КОР90 = 0`;
                            this.so = Math.round(420000 * this.pickedRezident.koef.so);
                            this.formulSo = `расчёт: СО = (420000 * ${this.pickedRezident.koef.so}`;
                            this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                            this.formulSn = `расчёт: СН = (ЗП ${this.zp} - ОПВ ${this.opv} - ВОСМС ${this.vosms}) * ${this.pickedRezident.koef.sn} - СО ${this.so}`
                        }
                        this.result = Math.round(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                        this.formulResult = `расчёт: ЗП = (ЗП ${this.zp} - ИПН ${this.ipn} - ОПВ ${this.opv} - ВОСМС ${this.vosms})`
                    }
                    if (this.pickedRezident.name == "Нерезидент") {
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.formulOpv = `расчёт: ОПВ = ЗП ${this.zp} * ${this.pickedRezident.koef.opv}`;
                        this.vosms = Math.round(this.zp * this.pickedRezident.koef.vosms);
                        this.formulVosms = `расчёт: ВОСМС = ЗП ${this.zp} * ${this.pickedRezident.koef.vosms}`;
                        this.kor90 = 0;
                        this.formulKor90 = `расчёт: КОР90 = 0`;
                        this.ipn = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.formulOpv = `расчёт: ИПН = ЗП ${this.zp} * ${this.pickedRezident.koef.opv}`;
                        this.oosms = Math.round(this.zp * this.pickedRezident.koef.oosms);
                        this.formulOosms = `расчёт: ООСМС = ЗП ${this.zp} * ${this.pickedRezident.koef.oosms}`;
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.formulSo = `расчёт: СО = МЗП ${this.mzp} * ${this.pickedRezident.koef.so}`;
                        this.sn = Math.round(this.mrp14 * 0.095 - this.so);
                        this.formulSn = `расчёт: СН = МРП14 ${this.mrp14} * ${this.pickedRezident.koef.sn} - СО ${this.so}`;

                        if (this.zp >= 48740) {
                            this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                            this.formulSn = `расчёт: СН = (ЗП ${this.zp} - ОПВ ${this.opv} - ВОСМС ${this.vosms}) * ${this.pickedRezident.koef.sn} - СО ${this.so}`
                        }

                        if (this.zp >= this.mzp) {
                            this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                            this.formulSo = `расчёт: СО = МЗП ${this.mzp} * ${this.pickedRezident.koef.so}`;
                            this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                            this.formulSn = `расчёт: СН = (ЗП ${this.zp} - ОПВ ${this.opv} - ВОСМС ${this.vosms}) * ${this.pickedRezident.koef.sn} - СО ${this.so}`
                        }

                        if (this.zp >= 66670) {
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                            this.formulSo = `расчёт: СО = (ЗП ${this.zp} - ОПВ ${this.opv}) * ${this.pickedRezident.koef.so}`
                            this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                            this.formulSn = `расчёт: СН = (ЗП ${this.zp} - ОПВ ${this.opv} - ВОСМС ${this.vosms}) * ${this.pickedRezident.koef.sn} - СО ${this.so}`
                        }

                        if (this.zp >= 466667) { //76576
                            this.kor90 = 0;
                            this.formulKor90 = `расчёт: КОР90 = 0`;
                            this.so = Math.round(420000 * this.pickedRezident.koef.so);
                            this.formulSo = `расчёт: СО = (420000 * ${this.pickedRezident.koef.so}`;
                            this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                            this.formulSn = `расчёт: СН = (ЗП ${this.zp} - ОПВ ${this.opv} - ВОСМС ${this.vosms}) * ${this.pickedRezident.koef.sn} - СО ${this.so}`
                        }

                        this.result = Math.round(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                        this.formulResult = `расчёт: ЗП = (ЗП ${this.zp} - ИПН ${this.ipn} - ОПВ ${this.opv} - ВОСМС ${this.vosms})`
                    }

                }
            }

            if (this.selected.title == "ТОО на ОУР студент") {
                if (this.pickedMzp.titleMzp == "Без вычета МЗП") {
                    if (this.pickedRezident.name == "Резидент") {
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.formulOpv = `расчёт: ОПВ = ЗП ${this.zp} * ${this.pickedRezident.koef.opv}`;
                        this.vosms = Math.round(this.zp * this.pickedRezident.koef.vosms);
                        this.formulVosms = `расчёт: ВОСМС = ЗП ${this.zp} * ${this.pickedRezident.koef.vosms}`;
                        this.kor90 = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.kor90);
                        this.formulKor90 = `расчёт: КОР90 = (ЗП ${this.zp} - ОПВ ${this.opv} - ВОСМС ${this.vosms}) * ${this.pickedRezident.koef.kor90}`;
                        this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.opv);
                        this.formulIpn = `расчёт: ИПН = (ЗП ${this.zp} - ОПВ ${this.opv} - КОР90 ${this.kor90} - 0 - ВОСМС ${this.vosms}) * ${this.pickedRezident.koef.opv}`
                        this.oosms = Math.round(this.zp * this.pickedRezident.koef.oosms);
                        this.formulOosms = `расчёт: ООСМС = ЗП ${this.zp} * ${this.pickedRezident.koef.oosms}`;
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.formulSo = `расчёт: СО = МЗП ${this.mzp} * ${this.pickedRezident.koef.so}`;
                        this.sn = Math.round(this.mrp14 * this.pickedRezident.koef.sn - this.so);
                        this.formulSn = `расчёт: СН = МРП14 ${this.mrp14} * ${this.pickedRezident.koef.sn} - СО ${this.so}`;
                        if (this.zp >= 48740) {
                            this.kor90 = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.kor90);
                            this.formulKor90 = `расчёт: КОР90 = (ЗП ${this.zp} - ОПВ ${this.opv} - ВОСМС ${this.vosms}) * ${this.pickedRezident.koef.kor90}`;
                            this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                            this.formulSo = `расчёт: СО = МЗП ${this.mzp} * ${this.pickedRezident.koef.so}`;
                            this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                            this.formulSn = `расчёт: СН = (ЗП ${this.zp} - ОПВ ${this.opv} - ВОСМС ${this.vosms}) * ${this.pickedRezident.koef.sn} - СО ${this.so}`
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.ipn);
                            this.formulIpn = `расчёт: ИПН = (ЗП ${this.zp} - ОПВ ${this.opv} - КОР90 ${this.kor90} - 0 - ВОСМС ${this.vosms}) * ${this.pickedRezident.koef.opv}`
                        }
                        if (this.zp >= this.mzp) {
                            this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                            this.formulSo = `расчёт: СО = МЗП ${this.mzp} * ${this.pickedRezident.koef.so}`;
                            this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                            this.formulSn = `расчёт: СН = (ЗП ${this.zp} - ОПВ ${this.opv} - ВОСМС ${this.vosms}) * ${this.pickedRezident.koef.sn} - СО ${this.so}`
                        }
                        if (this.zp >= 66670) {
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                            this.formulSo = `расчёт: СО = (ЗП ${this.zp} - ОПВ ${this.opv}) * ${this.pickedRezident.koef.so}`
                            this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                            this.formulSn = `расчёт: СН = (ЗП ${this.zp} - ОПВ ${this.opv} - ВОСМС ${this.vosms}) * ${this.pickedRezident.koef.sn} - СО ${this.so}`
                        }
                        if (this.zp >= 76576) {
                            this.kor90 = 0;
                            this.formulKor90 = `расчёт: КОР90 = 0`;
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.opv);
                            this.formulIpn = `расчёт: ИПН = (ЗП ${this.zp} - ОПВ ${this.opv} - КОР90 ${this.kor90} - 0 - ВОСМС ${this.vosms}) * ${this.pickedRezident.koef.opv}`
                        }
                        if (this.zp >= 466668) {
                            this.kor90 = 0;
                            this.formulKor90 = `расчёт: КОР90 = 0`;
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.opv);
                            this.formulIpn = `расчёт: ИПН = (ЗП ${this.zp} - ОПВ ${this.opv} - КОР90 ${this.kor90} - 0 - ВОСМС ${this.vosms}) * ${this.pickedRezident.koef.opv}`
                            this.so = Math.round(420000 * this.pickedRezident.koef.so);
                            this.formulSo = `расчёт: СО = (420000 * ${this.pickedRezident.koef.so}`;
                            this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                            this.formulSn = `расчёт: СН = (ЗП ${this.zp} - ОПВ ${this.opv} - ВОСМС ${this.vosms}) * ${this.pickedRezident.koef.sn} - СО ${this.so}`
                        }
                        this.result = Math.round(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                        this.formulResult = `расчёт: ЗП = (ЗП ${this.zp} - ИПН ${this.ipn} - ОПВ ${this.opv} - ВОСМС ${this.vosms})`
                    }
                    if (this.pickedRezident.name == "Нерезидент") {
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.vosms = Math.round(this.zp * this.pickedRezident.koef.vosms);
                        this.kor90 = 0;
                        this.ipn = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.oosms = Math.round(this.zp * this.pickedRezident.koef.oosms);
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.sn = Math.round(this.mrp14 * this.pickedRezident.koef.sn - this.so);
                        if (this.zp >= 48735) { // 42882
                            console.log(123123123)
                            this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                        }
                        if (this.zp >= 66670) {
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                            this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                        }
                        if (this.zp >= 466668) {
                            this.kor90 = 0;
                            this.ipn = Math.round(this.zp * this.pickedRezident.koef.opv);
                            this.so = Math.round(420000 * this.pickedRezident.koef.so);
                            this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                        }
                        this.result = Math.floor(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                }

                if (this.pickedMzp.titleMzp == "С вычетом МЗП") {
                    if (this.pickedRezident.name == "Резидент") {
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.vosms = Math.round(this.zp * this.pickedRezident.koef.vosms);
                        this.ipn = 0;
                        this.kor90 = 0;
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.sn = Math.round(this.mrp14 * 0.095 - this.so);
                        this.oosms = Math.round(this.zp * this.pickedRezident.koef.oosms);
                        if (this.zp >= 48731) {
                            // this.vosms = 0;
                            this.kor90 = Math.round((this.zp - this.opv - this.mrp14 - this.vosms) * this.pickedRezident.koef.kor90);
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - this.mrp14 - this.vosms) * this.pickedRezident.koef.ipn);
                            this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                        }
                        if (this.zp >= 66670) {
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                            this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                        }
                        if (this.zp >= 76576) {
                            this.kor90 = 0;
                            this.ipn = Math.round((this.zp - this.opv - this.mrp14 - this.vosms) * this.pickedRezident.koef.ipn);
                        }
                        if (this.zp >= 466667) { //76576
                            this.kor90 = 0;
                            this.so = Math.round(420000 * this.pickedRezident.koef.so);
                            this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                        }
                        this.result = Math.round(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                    if (this.pickedRezident.name == "Нерезидент") {
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.vosms = Math.round(this.zp * this.pickedRezident.koef.vosms);
                        this.kor90 = 0;
                        this.ipn = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.oosms = Math.round(this.zp * this.pickedRezident.koef.oosms);
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.sn = Math.round(this.mrp14 * 0.095 - this.so);

                        if (this.zp >= 48740) {
                            this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                        }

                        if (this.zp >= this.mzp) {
                            this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                            this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                        }

                        if (this.zp >= 66670) {
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                            this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                        }

                        if (this.zp >= 466667) { //76576
                            this.kor90 = 0;
                            this.so = Math.round(420000 * this.pickedRezident.koef.so);
                            this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                        }

                        this.result = Math.round(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }

                }
            }

            if (this.selected.title == "ТОО на ОУР пенсионер") {
                if (this.pickedMzp.titleMzp == "Без вычета МЗП") {
                    if (this.pickedRezident.name == "Резидент") {
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.vosms = Math.round(this.zp * this.pickedRezident.koef.vosms);
                        this.kor90 = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.kor90);
                        this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * 0.1);
                        this.oosms = this.zp * this.pickedRezident.koef.oosms;
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.sn = Math.round(this.mrp14 * 0.095 - this.so);
                        if (this.zp >= 76576) {
                            this.kor90 = 0;
                            this.ipn = Math.round((this.zp - this.opv - 0 - this.vosms) * this.pickedRezident.koef.ipn);
                        }

                        if (this.zp >= 48731) {
                            this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                        }

                        if (this.zp >= 66670) {
                            this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                        }
                        this.result = Math.floor(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }

                    if (this.pickedRezident.name == "Нерезидент") {
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.vosms = Math.round(this.zp * this.pickedRezident.koef.vosms);
                        this.kor90 = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.kor90);
                        this.ipn = Math.round(this.zp * 0.1);
                        this.oosms = this.zp * this.pickedRezident.koef.oosms;
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.sn = Math.round(this.mrp14 * 0.095 - this.so);

                        if (this.zp >= this.mrp14) {
                            this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                        }

                        if (this.zp >= 76576) {
                            this.kor90 = 0;
                            this.ipn = Math.round((this.zp - this.opv - 0 - this.vosms) * this.pickedRezident.koef.ipn);
                        }



                        if (this.zp >= 66670) {
                            this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                        }
                        this.result = Math.floor(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                }
                if (this.pickedMzp.titleMzp == "С вычетом МЗП") {
                    if (this.pickedRezident.name == "Резидент") {
                        this.kor90 = 0;
                        this.opv = 0;
                        this.vosms = Math.round(this.zp * this.pickedRezident.koef.vosms);
                        this.ipn = 0;
                        this.oosms = this.zp * this.pickedRezident.koef.oosms;
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.sn = Math.round(this.mrp14 * 0.095 - this.so);
                        if (this.zp >= 42883) {
                            this.kor90 = Math.round((this.zp - this.opv - this.mrp14 - 0) * this.pickedRezident.koef.kor90);
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - this.mrp14 - 0) * this.pickedRezident.koef.ipn);
                            this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                        }
                        if (this.zp >= 76576) {
                            this.kor90 = 0;
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - this.mrp14 - 0) * this.pickedRezident.koef.ipn);
                        }
                        this.result = Math.round(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                    if (this.pickedRezident.name == "Нерезидент") {
                        this.opv = this.zp * this.pickedRezident.koef.opv;
                        this.vosms = this.zp * this.pickedRezident.koef.vosms;
                        this.kor90 = (this.zp - this.opv - this.vosms) * this.pickedRezident.koef.kor90;
                        this.ipn = Math.round(this.zp * 0.1);
                        this.oosms = this.zp * this.pickedRezident.koef.oosms;
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.sn = Math.round(this.mrp14 * 0.095 - this.so);

                        if (this.zp >= this.mrp14) {
                            this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                        }
                        this.result = Math.round(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                }
            }

            if (this.selected.title == "ТОО на СНР") {
                if (this.pickedMzp.titleMzp == "Без вычета МЗП") {
                    if (this.pickedRezident.name == "Резидент") {
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.vosms = Math.round(this.zp * this.pickedRezident.koef.vosms);
                        this.kor90 = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.kor90);
                        this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.opv);
                        this.oosms = Math.round(this.zp * this.pickedRezident.koef.oosms);
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.sn = 0;
                        if (this.zp >= 48740) {
                            this.kor90 = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.kor90);
                            this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                            this.sn = 0;
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.ipn);
                        }
                        if (this.zp >= this.mzp) {
                            this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                            this.sn = 0;
                        }
                        if (this.zp >= 66670) {
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                            this.sn = 0;
                        }
                        if (this.zp >= 76576) { //76576
                            this.kor90 = 0;
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.opv);
                        }
                        if (this.zp >= 466668) {
                            this.kor90 = 0;
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.opv);
                            this.so = Math.round(420000 * this.pickedRezident.koef.so);
                            this.sn = 0;
                        }
                        this.result = Math.round(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                    if (this.pickedRezident.name == "Нерезидент") {
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.vosms = Math.round(this.zp * this.pickedRezident.koef.vosms);
                        this.kor90 = 0;
                        this.ipn = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.oosms = Math.round(this.zp * this.pickedRezident.koef.oosms);
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.sn = 0;
                        if (this.zp >= 48735) { // 42882
                            console.log(123123123)
                            this.sn = 0;
                        }
                        if (this.zp >= 66670) {
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                            this.sn = 0;
                        }
                        if (this.zp >= 466668) {
                            this.kor90 = 0;
                            // this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.opv);
                            this.ipn = Math.round(this.zp * this.pickedRezident.koef.ipn);
                            this.so = Math.round(420000 * this.pickedRezident.koef.so);
                            this.sn = 0;
                        }
                        this.result = Math.floor(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                }

                if (this.pickedMzp.titleMzp == "С вычетом МЗП") {
                    if (this.pickedRezident.name == "Резидент") {
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.vosms = Math.round(this.zp * this.pickedRezident.koef.vosms);
                        this.ipn = 0;
                        this.kor90 = 0;
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.sn = 0;
                        this.oosms = Math.round(this.zp * this.pickedRezident.koef.oosms);
                        if (this.zp >= 48731) {
                            this.kor90 = Math.round((this.zp - this.opv - this.mrp14 - this.vosms) * this.pickedRezident.koef.kor90);
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - this.mrp14 - this.vosms) * this.pickedRezident.koef.ipn);
                            this.sn = 0;
                        }
                        if (this.zp >= 66670) {
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                            this.sn = 0;
                        }
                        if (this.zp >= 76576) {
                            this.kor90 = 0;
                            this.ipn = Math.round((this.zp - this.opv - this.mrp14 - this.vosms) * this.pickedRezident.koef.ipn);
                        }
                        if (this.zp >= 466667) { //76576
                            this.kor90 = 0;
                            this.so = Math.round(420000 * this.pickedRezident.koef.so);
                            this.sn = 0;
                        }
                        this.result = Math.round(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                    if (this.pickedRezident.name == "Нерезидент") {
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.vosms = Math.round(this.zp * this.pickedRezident.koef.vosms);
                        this.kor90 = 0;
                        this.ipn = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.oosms = Math.round(this.zp * this.pickedRezident.koef.oosms);
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.sn = 0;

                        if (this.zp >= 48740) {
                            this.sn = 0;
                        }

                        if (this.zp >= this.mzp) {
                            this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                            this.sn = 0;
                        }

                        if (this.zp >= 66670) {
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                            this.sn = 0;
                        }

                        if (this.zp >= 466667) { //76576
                            this.kor90 = 0;
                            this.so = Math.round(420000 * this.pickedRezident.koef.so);
                            this.sn = 0;
                        }

                        this.result = Math.round(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }

                }

            }

            if (this.selected.title == "ТОО на СНР студент") {
                if (this.pickedMzp.titleMzp == "Без вычета МЗП") {
                    if (this.pickedRezident.name == "Резидент") {
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.vosms = Math.round(this.zp * this.pickedRezident.koef.vosms);
                        this.kor90 = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.kor90);
                        this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.opv);
                        this.oosms = Math.round(this.zp * this.pickedRezident.koef.oosms);
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.sn = 0;
                        if (this.zp >= 48740) {
                            this.kor90 = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.kor90);
                            this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                            this.sn = 0;
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.ipn);
                        }
                        if (this.zp >= this.mzp) {
                            this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                            this.sn = 0;
                        }
                        if (this.zp >= 66670) {
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                            this.sn = 0;
                        }
                        if (this.zp >= 76576) { //76576
                            this.kor90 = 0;
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.opv);
                        }
                        if (this.zp >= 466668) {
                            this.kor90 = 0;
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.opv);
                            this.so = Math.round(420000 * this.pickedRezident.koef.so);
                            this.sn = 0;
                        }
                        this.result = Math.round(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                    if (this.pickedRezident.name == "Нерезидент") {
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.vosms = Math.round(this.zp * this.pickedRezident.koef.vosms);
                        this.kor90 = 0;
                        this.ipn = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.oosms = Math.round(this.zp * this.pickedRezident.koef.oosms);
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.sn = 0;
                        if (this.zp >= 48735) { // 42882
                            console.log(123123123)
                            this.sn = 0;
                        }
                        if (this.zp >= 66670) {
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                            this.sn = 0;
                        }
                        if (this.zp >= 466668) {
                            this.kor90 = 0;
                            // this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.opv);
                            this.ipn = Math.round(this.zp * this.pickedRezident.koef.ipn);
                            this.so = Math.round(420000 * this.pickedRezident.koef.so);
                            this.sn = 0;
                        }
                        this.result = Math.floor(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                }

                if (this.pickedMzp.titleMzp == "С вычетом МЗП") {
                    if (this.pickedRezident.name == "Резидент") {
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.vosms = Math.round(this.zp * this.pickedRezident.koef.vosms);
                        this.ipn = 0;
                        this.kor90 = 0;
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.sn = 0;
                        this.oosms = Math.round(this.zp * this.pickedRezident.koef.oosms);
                        if (this.zp >= 47700) {
                            this.kor90 = Math.round((this.zp - this.opv - this.mrp14 - 0) * this.pickedRezident.koef.kor90);
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - this.mrp14 - this.vosms) * this.pickedRezident.koef.ipn);
                            this.sn = 0;
                        }
                        if (this.zp >= 66670) {
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                            this.sn = 0;
                        }
                        if (this.zp >= 76576) {
                            this.kor90 = 0;
                            this.ipn = Math.round((this.zp - this.opv - this.mrp14 - this.vosms) * this.pickedRezident.koef.ipn);
                        }
                        if (this.zp >= 466667) { //76576
                            this.kor90 = 0;
                            this.so = Math.round(420000 * this.pickedRezident.koef.so);
                            this.sn = 0;
                        }
                        this.result = Math.round(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                    if (this.pickedRezident.name == "Нерезидент") {
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.vosms = Math.round(this.zp * this.pickedRezident.koef.vosms);
                        this.kor90 = 0;
                        this.ipn = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.oosms = Math.round(this.zp * this.pickedRezident.koef.oosms);
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.sn = 0;

                        if (this.zp >= 48740) {
                            this.sn = 0;
                        }

                        if (this.zp >= this.mzp) {
                            this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                            this.sn = 0;
                        }

                        if (this.zp >= 66670) {
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                            this.sn = 0;
                        }

                        if (this.zp >= 466667) { //76576
                            this.kor90 = 0;
                            this.so = Math.round(420000 * this.pickedRezident.koef.so);
                            this.sn = 0;
                        }

                        this.result = Math.round(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }

                }

            }

            if (this.selected.title == "ТОО на СНР пенсионер") {
                if (this.pickedMzp.titleMzp == "Без вычета МЗП") {
                    if (this.pickedRezident.name == "Резидент") {
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.vosms = Math.round(this.zp * this.pickedRezident.koef.vosms);
                        this.kor90 = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.kor90);
                        this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * 0.1);
                        this.oosms = this.zp * this.pickedRezident.koef.oosms;
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.sn = 0;

                        if (this.zp >= 76576) {
                            this.kor90 = 0;
                            this.ipn = Math.round((this.zp - this.opv - 0 - this.vosms) * this.pickedRezident.koef.ipn);
                        }

                        // if (this.zp >= 48731) {
                        //     this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                        // }

                        // if (this.zp >= 66670) {
                        //     this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                        // }

                        this.result = Math.floor(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }

                    if (this.pickedRezident.name == "Нерезидент") {
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.vosms = Math.round(this.zp * this.pickedRezident.koef.vosms);
                        this.kor90 = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.kor90);
                        this.ipn = Math.round(this.zp * 0.1);
                        this.oosms = this.zp * this.pickedRezident.koef.oosms;
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.sn = 0;

                        // if (this.zp >= this.mrp14) {
                        //     this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                        // }

                        if (this.zp >= 76576) {
                            this.kor90 = 0;
                            this.ipn = Math.round((this.zp - this.opv - 0 - this.vosms) * this.pickedRezident.koef.ipn);
                        }



                        // if (this.zp >= 66670) {
                        //     this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                        // }
                        this.result = Math.floor(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                }
                if (this.pickedMzp.titleMzp == "С вычетом МЗП") {
                    if (this.pickedRezident.name == "Резидент") {
                        this.kor90 = 0;
                        this.opv = 0;
                        this.vosms = Math.round(this.zp * this.pickedRezident.koef.vosms);
                        this.ipn = 0;
                        this.oosms = this.zp * this.pickedRezident.koef.oosms;
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.sn = 0;
                        if (this.zp >= 42883) {
                            this.kor90 = Math.round((this.zp - this.opv - this.mrp14 - 0) * this.pickedRezident.koef.kor90);
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - this.mrp14 - 0) * this.pickedRezident.koef.ipn);
                            this.sn = 0;
                        }
                        if (this.zp >= 76576) {
                            this.kor90 = 0;
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - this.mrp14 - 0) * this.pickedRezident.koef.ipn);
                        }

                        this.result = Math.round(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                    if (this.pickedRezident.name == "Нерезидент") {
                        this.opv = this.zp * this.pickedRezident.koef.opv;
                        this.vosms = this.zp * this.pickedRezident.koef.vosms;
                        this.kor90 = (this.zp - this.opv - this.vosms) * this.pickedRezident.koef.kor90;
                        this.ipn = Math.round(this.zp * 0.1);
                        this.oosms = this.zp * this.pickedRezident.koef.oosms;
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.sn = 0;

                        if (this.zp >= this.mrp14) {
                            this.sn = 0;
                        }
                        this.result = Math.round(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                }
            }

            if (this.selected.title == "ИП на ОУР") {
                if (this.pickedMzp.titleMzp == "Без вычета МЗП") {
                    if (this.pickedRezident.name == "Резидент") {
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.vosms = Math.round(this.zp * this.pickedRezident.koef.vosms);
                        this.kor90 = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.kor90);
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.sn = Math.round(3063 - this.so);
                        this.oosms = Math.round(this.zp * this.pickedRezident.koef.oosms);
                        this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.ipn);

                        if (this.zp >= 66650) {
                            this.kor90 = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.kor90);
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.ipn);
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                            this.sn = Math.round(3063 - this.so);
                        }

                        if (this.zp >= 76550) {
                            this.kor90 = 0;
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.ipn);
                        }

                        if (this.zp >= 97207) {
                            this.kor90 = 0;
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.ipn)
                            this.sn = 0;
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                        }

                        if (this.zp >= 466668) {
                            this.so = Math.round(420000 * this.pickedRezident.koef.so);
                        }

                        this.result = Math.round(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                    if (this.pickedRezident.name == "Нерезидент") {
                        this.kor90 = 0;
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.vosms = Math.round(this.zp * this.pickedRezident.koef.vosms);
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.sn = Math.round(3063 - this.so);
                        this.oosms = Math.round(this.zp * this.pickedRezident.koef.oosms);
                        this.ipn = Math.round(this.zp * this.pickedRezident.koef.ipn);

                        if (this.zp >= 66650) {
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                            this.sn = Math.round(3063 - this.so);
                        }

                        if (this.zp >= 97207) {
                            this.kor90 = 0;
                            this.ipn = Math.round(this.zp * this.pickedRezident.koef.ipn)
                            this.sn = 0;
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                        }

                        if (this.zp >= 466668) {
                            this.so = Math.round(420000 * this.pickedRezident.koef.so);
                        }

                        this.result = Math.round(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                }
                if (this.pickedMzp.titleMzp == "С вычетом МЗП") {
                    if (this.pickedRezident.name == "Резидент") {
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.vosms = Math.round(this.zp * this.pickedRezident.koef.vosms);
                        this.kor90 = 0;
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.sn = Math.round(3063 - this.so);
                        this.oosms = Math.round(this.zp * this.pickedRezident.koef.oosms);
                        this.ipn = 0;

                        if (this.zp >= 48700) {
                            this.kor90 = Math.round((this.zp - this.opv - this.mrp14 - this.vosms) * this.pickedRezident.koef.kor90);
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - this.mrp14 - this.vosms) * this.pickedRezident.koef.ipn);
                        }

                        if (this.zp >= 66650) {
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                            this.sn = Math.round(3063 - this.so);
                        }

                        if (this.zp >= 76550) {
                            this.kor90 = 0;
                            this.ipn = Math.round((this.zp - this.opv - this.mrp14 - this.vosms) * this.pickedRezident.koef.ipn);
                        }

                        if (this.zp >= 97207) {
                            this.kor90 = 0;
                            this.ipn = Math.round((this.zp - this.opv - this.mrp14 - this.vosms) * this.pickedRezident.koef.ipn)
                            this.sn = 0;
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                        }

                        if (this.zp >= 466668) {
                            this.so = Math.round(420000 * this.pickedRezident.koef.so);
                        }

                        this.result = Math.round(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                    if (this.pickedRezident.name == "Нерезидент") { // НАЧИНАТЬ ОТ СЮДА
                        this.kor90 = 0;
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.vosms = Math.round(this.zp * this.pickedRezident.koef.vosms);
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.sn = Math.round(3063 - this.so);
                        this.oosms = Math.round(this.zp * this.pickedRezident.koef.oosms);
                        this.ipn = Math.round(this.zp * this.pickedRezident.koef.ipn);

                        if (this.zp >= 66650) {
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                            this.sn = Math.round(3063 - this.so);
                        }

                        if (this.zp >= 97207) {
                            this.kor90 = 0;
                            this.ipn = Math.round(this.zp * this.pickedRezident.koef.ipn)
                            this.sn = 0;
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                        }

                        if (this.zp >= 466668) {
                            this.so = Math.round(420000 * this.pickedRezident.koef.so);
                        }

                        this.result = Math.round(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                }
            }

            if (this.selected.title == "ИП на ОУР студент") {
                if (this.pickedMzp.titleMzp == "Без вычета МЗП") {
                    if (this.pickedRezident.name == "Резидент") {
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.vosms = 0;
                        this.kor90 = Math.round((this.zp - this.opv - 0) * this.pickedRezident.koef.kor90);
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.sn = Math.round(3063 - this.so);
                        this.oosms = 0;
                        this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.ipn);

                        if (this.zp >= 66650) {
                            this.kor90 = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.kor90);
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.ipn);
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                            this.sn = Math.round(3063 - this.so);
                        }

                        if (this.zp >= 76550) {
                            this.kor90 = 0;
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.ipn);
                        }

                        if (this.zp >= 97207) {
                            this.kor90 = 0;
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.ipn)
                            this.sn = 0;
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                        }

                        if (this.zp >= 466668) {
                            this.so = Math.round(420000 * this.pickedRezident.koef.so);
                        }

                        this.result = Math.round(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }

                    if (this.pickedRezident.name == "Нерезидент") {
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.vosms = 0;
                        this.kor90 = 0;
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.sn = Math.round(3063 - this.so);
                        this.oosms = 0;
                        this.ipn = Math.round(this.zp * this.pickedRezident.koef.ipn);

                        if (this.zp >= 76550) {
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                            this.sn = Math.round(3063 - this.so);
                        }

                        if (this.zp >= 97207) {
                            this.sn = 0;
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                        }

                        if (this.zp >= 466668) {
                            this.so = Math.round(420000 * this.pickedRezident.koef.so);
                        }

                        this.result = Math.round(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }

                }
                if (this.pickedMzp.titleMzp == "С вычетом МЗП") {
                    if (this.pickedRezident.name == "Резидент") {
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.vosms = 0;
                        this.kor90 = 0;
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.sn = Math.round(3063 - this.so);
                        this.oosms = 0;
                        this.ipn = 0;

                        if (this.zp >= 48731) {
                            this.kor90 = Math.round((this.zp - this.opv - this.mrp14 - this.vosms) * this.pickedRezident.koef.kor90);
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - this.mrp14 - this.vosms) * this.pickedRezident.koef.ipn);
                            // this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                        }

                        if (this.zp >= 66650) {
                            this.kor90 = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.kor90);
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.ipn);
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                            this.sn = Math.round(3063 - this.so);
                        }

                        if (this.zp >= 76550) {
                            this.kor90 = 0;
                            this.ipn = Math.round((this.zp - this.opv - this.mrp14 - 0) * this.pickedRezident.koef.ipn);
                        }

                        if (this.zp >= 97207) {
                            this.kor90 = 0;
                            // this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.ipn)
                            this.sn = 0;
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                        }

                        if (this.zp >= 466668) {
                            this.so = Math.round(420000 * this.pickedRezident.koef.so);
                        }

                        this.result = Math.round(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }

                    if (this.pickedRezident.name == "Нерезидент") {
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.vosms = 0;
                        this.kor90 = 0;
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.sn = Math.round(3063 - this.so);
                        this.oosms = 0;
                        this.ipn = Math.round(this.zp * this.pickedRezident.koef.ipn);

                        if (this.zp >= 97207) {
                            this.kor90 = 0;
                            this.sn = 0;
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                        }

                        if (this.zp >= 466668) {
                            this.so = Math.round(420000 * this.pickedRezident.koef.so);
                        }

                        this.result = Math.round(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                }
            }

            if (this.selected.title == "ИП на ОУР пенсионер") {
                if (this.pickedMzp.titleMzp == "Без вычета МЗП") {
                    if (this.pickedRezident.name == "Резидент") {
                        this.opv = 0;
                        this.vosms = 0;
                        this.kor90 = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.kor90);
                        this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * 0.1);
                        this.oosms = 0;
                        this.so = 0;
                        this.sn = Math.round(3063 - this.so);
                        if (this.zp >= 76576) {
                            this.kor90 = 0;
                            this.ipn = Math.round((this.zp - this.opv - 0 - this.vosms) * this.pickedRezident.koef.ipn);
                        }
                        this.result = Math.floor(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }

                    if (this.pickedRezident.name == "Нерезидент") {
                        this.opv = 0;
                        this.vosms = 0;
                        this.kor90 = 0;
                        this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * 0.1);
                        this.oosms = 0;
                        this.so = 0;
                        this.sn = Math.round(3063 - this.so);
                        this.result = Math.floor(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                }

                if (this.pickedMzp.titleMzp == "С вычетом МЗП") {
                    if (this.pickedRezident.name == "Резидент") {
                        this.opv = 0;
                        this.vosms = 0;
                        this.kor90 = 0;
                        this.ipn = 0;
                        this.oosms = 0;
                        this.so = 0;
                        this.sn = Math.round(3063 - this.so);
                        if (this.zp >= 48731) {
                            this.kor90 = Math.round((this.zp - this.opv - this.mrp14 - this.vosms) * this.pickedRezident.koef.kor90);
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - this.mrp14 - this.vosms) * this.pickedRezident.koef.ipn);
                        }
                        if (this.zp >= 76576) {
                            this.kor90 = 0;
                            this.ipn = Math.round((this.zp - this.opv - this.mrp14 - this.vosms) * this.pickedRezident.koef.ipn);
                        }
                        this.result = Math.floor(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }

                    if (this.pickedRezident.name == "Нерезидент") {
                        this.opv = 0;
                        this.vosms = 0;
                        this.kor90 = 0;
                        this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * 0.1);
                        this.oosms = 0;
                        this.so = 0;
                        this.sn = Math.round(3063 - this.so);
                        this.result = Math.floor(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                }
            }

            if (this.selected.title == "ИП на СНР") {
                if (this.pickedMzp.titleMzp == "Без вычета МЗП") {
                    if (this.pickedRezident.name == "Резидент") {
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.vosms = Math.round(this.zp * this.pickedRezident.koef.vosms);
                        this.kor90 = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.kor90);
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.sn = 0;
                        this.oosms = Math.round(this.zp * this.pickedRezident.koef.oosms);
                        this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.ipn);

                        if (this.zp >= 66650) {
                            this.kor90 = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.kor90);
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.ipn);
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                            // this.sn = Math.round(3063 - this.so);
                        }

                        if (this.zp >= 76550) {
                            this.kor90 = 0;
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.ipn);
                        }

                        if (this.zp >= 97207) {
                            this.kor90 = 0;
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.ipn)
                            // this.sn = 0;
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                        }

                        if (this.zp >= 466668) {
                            this.so = Math.round(420000 * this.pickedRezident.koef.so);
                        }

                        this.result = Math.round(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                    if (this.pickedRezident.name == "Нерезидент") {
                        this.kor90 = 0;
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.vosms = Math.round(this.zp * this.pickedRezident.koef.vosms);
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.sn = 0;
                        this.oosms = Math.round(this.zp * this.pickedRezident.koef.oosms);
                        this.ipn = Math.round(this.zp * this.pickedRezident.koef.ipn);

                        if (this.zp >= 66650) {
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                            // this.sn = Math.round(3063 - this.so);
                        }

                        if (this.zp >= 97207) {
                            this.kor90 = 0;
                            this.ipn = Math.round(this.zp * this.pickedRezident.koef.ipn)
                            // this.sn = 0;
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                        }

                        if (this.zp >= 466668) {
                            this.so = Math.round(420000 * this.pickedRezident.koef.so);
                        }

                        this.result = Math.round(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                }
                if (this.pickedMzp.titleMzp == "С вычетом МЗП") {
                    if (this.pickedRezident.name == "Резидент") {
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.vosms = Math.round(this.zp * this.pickedRezident.koef.vosms);
                        this.kor90 = 0;
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        // this.sn = Math.round(3063 - this.so);
                        this.oosms = Math.round(this.zp * this.pickedRezident.koef.oosms);
                        this.ipn = 0;

                        if (this.zp >= 48700) {
                            this.kor90 = Math.round((this.zp - this.opv - this.mrp14 - this.vosms) * this.pickedRezident.koef.kor90);
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - this.mrp14 - this.vosms) * this.pickedRezident.koef.ipn);
                        }

                        if (this.zp >= 66650) {
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                            // this.sn = Math.round(3063 - this.so);
                        }

                        if (this.zp >= 76550) {
                            this.kor90 = 0;
                            this.ipn = Math.round((this.zp - this.opv - this.mrp14 - this.vosms) * this.pickedRezident.koef.ipn);
                        }

                        if (this.zp >= 97207) {
                            this.kor90 = 0;
                            this.ipn = Math.round((this.zp - this.opv - this.mrp14 - this.vosms) * this.pickedRezident.koef.ipn)
                            // this.sn = 0;
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                        }

                        if (this.zp >= 466668) {
                            this.so = Math.round(420000 * this.pickedRezident.koef.so);
                        }

                        this.result = Math.round(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                    if (this.pickedRezident.name == "Нерезидент") { // НАЧИНАТЬ ОТ СЮДА
                        this.kor90 = 0;
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.vosms = Math.round(this.zp * this.pickedRezident.koef.vosms);
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        // this.sn = Math.round(3063 - this.so);
                        this.oosms = Math.round(this.zp * this.pickedRezident.koef.oosms);
                        this.ipn = Math.round(this.zp * this.pickedRezident.koef.ipn);

                        if (this.zp >= 66650) {
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                            // this.sn = Math.round(3063 - this.so);
                        }

                        if (this.zp >= 97207) {
                            this.kor90 = 0;
                            this.ipn = Math.round(this.zp * this.pickedRezident.koef.ipn)
                            // this.sn = 0;
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                        }

                        if (this.zp >= 466668) {
                            this.so = Math.round(420000 * this.pickedRezident.koef.so);
                        }

                        this.result = Math.round(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                }
            }

            if (this.selected.title == "ИП на СНР студент") {
                if (this.pickedMzp.titleMzp == "Без вычета МЗП") {
                    if (this.pickedRezident.name == "Резидент") {
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.vosms = 0;
                        this.kor90 = Math.round((this.zp - this.opv - 0) * this.pickedRezident.koef.kor90);
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.sn = 0;
                        this.oosms = 0;
                        this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.ipn);

                        if (this.zp >= 66650) {
                            this.kor90 = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.kor90);
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.ipn);
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                            this.sn = 0;
                        }

                        if (this.zp >= 76550) {
                            this.kor90 = 0;
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.ipn);
                        }

                        if (this.zp >= 97207) {
                            this.kor90 = 0;
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.ipn)
                            this.sn = 0;
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                        }

                        if (this.zp >= 466668) {
                            this.so = Math.round(420000 * this.pickedRezident.koef.so);
                        }

                        this.result = Math.round(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }

                    if (this.pickedRezident.name == "Нерезидент") {
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.vosms = 0;
                        this.kor90 = 0;
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.sn = 0;
                        this.oosms = 0;
                        this.ipn = Math.round(this.zp * this.pickedRezident.koef.ipn);

                        if (this.zp >= 76550) {
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                            this.sn = 0;
                        }

                        if (this.zp >= 97207) {
                            this.kor90 = 0;
                            this.sn = 0;
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                            // this.ipn = Math.round((this.zp - this.opv - 0 - 0) * this.pickedRezident.koef.ipn);
                        }

                        if (this.zp >= 466668) {
                            this.so = Math.round(420000 * this.pickedRezident.koef.so);
                        }

                        this.result = Math.round(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }

                }
                if (this.pickedMzp.titleMzp == "С вычетом МЗП") {
                    if (this.pickedRezident.name == "Резидент") {
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.vosms = 0;
                        this.kor90 = 0;
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.sn = 0;
                        this.oosms = 0;
                        this.ipn = 0;

                        if (this.zp >= 48731) {
                            this.kor90 = Math.round((this.zp - this.opv - this.mrp14 - this.vosms) * this.pickedRezident.koef.kor90);
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - this.mrp14 - this.vosms) * this.pickedRezident.koef.ipn);
                            // this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                        }

                        if (this.zp >= 66650) {
                            this.kor90 = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.kor90);
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.ipn);
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                            this.sn = 0;
                        }

                        if (this.zp >= 76550) {
                            this.kor90 = 0;
                            this.ipn = Math.round((this.zp - this.opv - this.mrp14 - 0) * this.pickedRezident.koef.ipn);
                        }

                        if (this.zp >= 97207) {
                            this.kor90 = 0;
                            // this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * this.pickedRezident.koef.ipn)
                            this.sn = 0;
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                        }

                        if (this.zp >= 466668) {
                            this.so = Math.round(420000 * this.pickedRezident.koef.so);
                        }

                        this.result = Math.round(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }

                    if (this.pickedRezident.name == "Нерезидент") {
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.vosms = 0;
                        this.kor90 = 0;
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.sn = 0;
                        this.oosms = 0;
                        this.ipn = Math.round(this.zp * this.pickedRezident.koef.ipn);

                        if (this.zp >= 97207) {
                            this.kor90 = 0;
                            this.sn = 0;
                            this.so = Math.round((this.zp - this.opv) * this.pickedRezident.koef.so);
                        }

                        if (this.zp >= 466668) {
                            this.so = Math.round(420000 * this.pickedRezident.koef.so);
                        }

                        this.result = Math.round(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                }
            }

            if (this.selected.title == "ИП на СНР пенсионер") {
                if (this.pickedMzp.titleMzp == "Без вычета МЗП") {
                    if (this.pickedRezident.name == "Резидент") {
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.vosms = Math.round(this.zp * this.pickedRezident.koef.vosms);
                        this.kor90 = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.kor90);
                        this.ipn = Math.round((this.zp - this.opv - this.kor90 - 0 - this.vosms) * 0.1);
                        this.oosms = this.zp * this.pickedRezident.koef.oosms;
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.sn = 0;
                        if (this.zp >= 76576) {
                            this.kor90 = 0;
                            this.ipn = Math.round((this.zp - this.opv - 0 - this.vosms) * this.pickedRezident.koef.ipn);
                        }

                        this.result = Math.floor(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                    if (this.pickedRezident.name == "Нерезидент") {
                        this.opv = Math.round(this.zp * this.pickedRezident.koef.opv);
                        this.vosms = Math.round(this.zp * this.pickedRezident.koef.vosms);
                        this.kor90 = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.kor90);
                        this.ipn = Math.round(this.zp * 0.1);
                        this.oosms = this.zp * this.pickedRezident.koef.oosms;
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.sn = 0;


                        if (this.zp >= 76576) {
                            this.kor90 = 0;
                            this.ipn = Math.round((this.zp - this.opv - 0 - this.vosms) * this.pickedRezident.koef.ipn);
                        }

                        this.result = Math.floor(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                }
                if (this.pickedMzp.titleMzp == "С вычетом МЗП") {
                    if (this.pickedRezident.name == "Резидент") {
                        this.kor90 = 0;
                        this.opv = 0;
                        this.vosms = Math.round(this.zp * this.pickedRezident.koef.vosms);
                        this.ipn = 0;
                        this.oosms = this.zp * this.pickedRezident.koef.oosms;
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.sn = 0;
                        if (this.zp >= 42883) {
                            this.kor90 = Math.round((this.zp - this.opv - this.mrp14 - 0) * this.pickedRezident.koef.kor90);
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - this.mrp14 - 0) * this.pickedRezident.koef.ipn);
                            // this.sn = Math.round((this.zp - this.opv - this.vosms) * this.pickedRezident.koef.sn - this.so);
                        }
                        if (this.zp >= 76576) {
                            this.kor90 = 0;
                            this.ipn = Math.round((this.zp - this.opv - this.kor90 - this.mrp14 - 0) * this.pickedRezident.koef.ipn);
                        }
                        this.result = Math.round(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                    if (this.pickedRezident.name == "Нерезидент") {
                        this.opv = this.zp * this.pickedRezident.koef.opv;
                        this.vosms = this.zp * this.pickedRezident.koef.vosms;
                        this.kor90 = 0;
                        this.ipn = Math.round(this.zp * 0.1);
                        this.oosms = this.zp * this.pickedRezident.koef.oosms;
                        this.so = Math.round(this.mzp * this.pickedRezident.koef.so);
                        this.sn = 0;
                        this.result = Math.round(this.zp - this.ipn - this.opv - this.vosms) + ' тенге';
                    }
                }
            }

            if (this.selected == '') {
                this.styleWarningSelect.display = 'inline-block';
            } else {
                this.styleWarningSelect.display = 'none';
                // this.calculator__box.display = 'flex'

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

            if (this.zp == '') {
                this.styleWarningZp.display = 'inline-block';
                this.formul.display = 'none';

            } else {
                this.styleWarningZp.display = 'none';
                this.formul.display = 'inline-block';
            }


            if (this.selected == '' ||
                this.pickedMzp == '' ||
                this.pickedRezident == '' ||
                this.zp == '') {
                this.total.display = 'none';
            } else {
                this.total.display = 'block';
            }

        },





    },

    async mounted() {
        await this.getJson();
    }
})