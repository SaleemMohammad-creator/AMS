/* =========================
   AMS Storage Manager
========================= */

const Storage = {

    /* =========================
       Get
    ========================= */

    get(key){

        try{

            return JSON.parse(
                localStorage.getItem(
                    key
                )
            ) || [];

        }catch(error){

            console.error(
                'Storage GET Error:',
                error
            );

            return [];
        }
    },

    /* =========================
       Set
    ========================= */

    set(
        key,
        value
    ){

        try{

            localStorage.setItem(
                key,
                JSON.stringify(
                    value
                )
            );

        }catch(error){

            console.error(
                'Storage SET Error:',
                error
            );
        }
    },

    /* =========================
       Remove
    ========================= */

    remove(key){

        localStorage.removeItem(
            key
        );
    },

    /* =========================
       Clear
    ========================= */

    clear(){

        localStorage.clear();
    }

};