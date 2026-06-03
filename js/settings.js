/* =========================
   Default Settings
========================= */

let settingsData =

Storage.get(
    CONFIG.KEYS.SETTINGS
);

if(

    !settingsData ||

    Object.keys(
        settingsData
    ).length === 0

){

    settingsData = {

        username:'Admin',

        email:'admin@gmail.com',

        password:'12345',

        theme:'light',

        compactSidebar:false,

        workingHours:9,

        otLimit:2,

        currency:'INR',

        profileImage:
        'https://i.pravatar.cc/200'
    };

    Storage.set(

        CONFIG.KEYS.SETTINGS,

        settingsData
    );
}


/* =========================
   Elements
========================= */

const username =
document.getElementById(
    'username'
);

const email =
document.getElementById(
    'email'
);

const password =
document.getElementById(
    'password'
);

const confirmPassword =
document.getElementById(
    'confirmPassword'
);

const workingHours =
document.getElementById(
    'workingHours'
);

const otLimit =
document.getElementById(
    'otLimit'
);

const currency =
document.getElementById(
    'currency'
);

const darkModeToggle =
document.getElementById(
    'darkModeToggle'
);

const compactSidebarToggle =
document.getElementById(
    'compactSidebarToggle'
);

const saveSettingsBtn =
document.getElementById(
    'saveSettingsBtn'
);

const profilePreview =
document.getElementById(
    'profilePreview'
);

const profileUpload =
document.getElementById(
    'profileUpload'
);


/* =========================
   Load Settings
========================= */

function loadSettings(){

    username.value =
        settingsData.username;

    email.value =
        settingsData.email;

    password.value =
        settingsData.password;

    confirmPassword.value =
        settingsData.password;

    workingHours.value =
        settingsData.workingHours;

    otLimit.value =
        settingsData.otLimit;

    currency.value =
        settingsData.currency;

    profilePreview.src =
        settingsData.profileImage;

    /* Profile */

    document
    .getElementById(
        'profileName'
    )
    .innerText =

    settingsData.username;

    /* Theme */

    if(

        settingsData.theme ===
        'dark'

    ){

        document.body
        .classList.add(
            'dark-mode'
        );

        darkModeToggle.checked =
            true;
    }

    else{

        document.body
        .classList.remove(
            'dark-mode'
        );
    }

    /* Compact Sidebar */

    if(
        settingsData.compactSidebar
    ){

        compactSidebarToggle.checked =
            true;

        document.body
        .classList.add(
            'compact-sidebar'
        );
    }

    else{

        document.body
        .classList.remove(
            'compact-sidebar'
        );
    }
}


/* =========================
   Save Settings
========================= */

saveSettingsBtn
?.addEventListener(

    'click',

    saveSettings
);

function saveSettings(){

    if(

        password.value !==

        confirmPassword.value

    ){

        showToast(

            'Passwords do not match',

            'error'
        );

        return;
    }

    settingsData = {

        username:
            username.value,

        email:
            email.value,

        password:
            password.value,

        theme:

            darkModeToggle.checked

            ?

            'dark'

            :

            'light',

        compactSidebar:

            compactSidebarToggle.checked,

        workingHours:
            Number(
                workingHours.value
            ),

        otLimit:
            Number(
                otLimit.value
            ),

        currency:
            currency.value,

        profileImage:
            profilePreview.src
    };

    Storage.set(

        CONFIG.KEYS.SETTINGS,

        settingsData
    );

    /* Update Profile */

    document
    .getElementById(
        'profileName'
    )
    .innerText =

    settingsData.username;

    showToast(

        'Settings Saved',

        'success'
    );
}

/* =========================
   Dark Mode
========================= */

darkModeToggle
?.addEventListener(

    'change',

    () => {

        document.body
        .classList.toggle(

            'dark-mode',

            darkModeToggle.checked
        );
    }
);


/* =========================
   Compact Sidebar
========================= */

compactSidebarToggle
?.addEventListener(

    'change',

    () => {

        document.body
        .classList.toggle(

            'compact-sidebar',

            compactSidebarToggle.checked
        );
    }
);


/* =========================
   Profile Upload
========================= */

profileUpload
?.addEventListener(

    'change',

    uploadProfileImage
);

function uploadProfileImage(e){

    const file =

        e.target.files[0];

    if(
        !file
    ) return;

    const reader =

        new FileReader();

    reader.onload =
    function(event){

        profilePreview.src =

            event.target.result;
    };

    reader.readAsDataURL(
        file
    );
}


/* =========================
   Toast
========================= */

function showToast(
    message,
    type
){

    const toast =

    document.createElement(
        'div'
    );

    toast.className =

        `toast ${type}`;

    toast.innerText =
        message;

    document.body
    .appendChild(
        toast
    );

    setTimeout(
        () => {

        toast.classList.add(
            'show'
        );

    },100);

    setTimeout(
        () => {

        toast.classList.remove(
            'show'
        );

        setTimeout(
            () => {

            toast.remove();

        },300);

    },2500);
}


/* =========================
   Toast Style
========================= */

const style =

document.createElement(
    'style'
);

style.innerHTML = `

.toast{

    position:fixed;

    top:30px;
    right:30px;

    padding:16px 24px;

    border-radius:16px;

    color:white;

    font-size:14px;
    font-weight:500;

    transform:
        translateX(120%);

    transition:.35s;

    z-index:9999;
}

.toast.show{

    transform:
        translateX(0);
}

.toast.success{

    background:#22c55e;
}

.toast.error{

    background:#ef4444;
}
`;

document.head.appendChild(
    style
);


/* =========================
   Initial Load
========================= */

loadSettings();

const payrollSettings = Storage.get(CONFIG.KEYS.PAYROLL_SETTINGS)||{holidayOTMultiplier:2,weekOffRule:'double_ot',lopEnabled:true};
document.getElementById('weekOffRule') && (document.getElementById('weekOffRule').value=payrollSettings.weekOffRule);
document.getElementById('lopEnabled') && (document.getElementById('lopEnabled').checked=payrollSettings.lopEnabled);
document.getElementById('savePayrollRulesBtn')?.addEventListener('click',()=>{
 const data={holidayOTMultiplier:2,weekOffRule:document.getElementById('weekOffRule').value,lopEnabled:document.getElementById('lopEnabled').checked};
 Storage.set(CONFIG.KEYS.PAYROLL_SETTINGS,data);
 showToast('Payroll rules saved','success');
});
