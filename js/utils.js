/* =========================
   AMS Utilities
========================= */

const Utils = {

    /* =========================
       Employee ID Generator
    ========================= */

    generateEmployeeId(
        staffData = []
    ){

        let id;

        do{

            id =
                CONFIG.EMPLOYEE.PREFIX +

                Math.floor(

                    1000 +

                    Math.random() *

                    9000

                );

        }while(

            staffData.some(

                emp =>

                    emp.id === id
            )
        );

        return id;
    },

    /* =========================
       Calculate Days
    ========================= */

    calculateDays(

        fromDate,
        toDate

    ){

        const start =
            new Date(
                fromDate
            );

        const end =
            new Date(
                toDate
            );

        const diff =
            end - start;

        const days =
            Math.floor(

                diff /

                (
                    1000 *
                    60 *
                    60 *
                    24
                )

            ) + 1;

        return days > 0
            ? days
            : 1;
    },

    /* =========================
       Format Date
    ========================= */

    formatDate(date){

        if(!date){

            return '-';
        }

        return new Date(
            date
        ).toLocaleDateString(
            'en-IN'
        );
    },

    /* =========================
       Currency
    ========================= */

    formatCurrency(
        amount
    ){

        return
        '₹' +

        Number(
            amount
        ).toLocaleString(
            'en-IN'
        );
    },

    /* =========================
       Random Number
    ========================= */

    randomId(){

        return Date.now();
    }

,

    /* UID */
    uid(){
        return 'ID' + Date.now() + Math.floor(Math.random()*1000);
    },

    /* Toast */
    toast(message,type='info'){
        if(typeof showToast==='function'){
            showToast(message,type);
        }else{
            alert(message);
        }
    }

};