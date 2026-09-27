/* =========================================================
   ECODRIVE EV - FRONTEND JAVASCRIPT
========================================================= */


/*
   IMPORTANT:

   After deploying app.py to a public server such as Render,
   Railway or another Flask-compatible hosting service,
   replace the URL below with your backend URL.

   Example:

   const API_URL =
       "https://ecodrive-api.onrender.com/api/chat";

   During local testing:

   http://127.0.0.1:5000/api/chat
*/

const API_URL =
    "http://127.0.0.1:5000/api/chat";


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle =
    document.getElementById("menuToggle");

const mainNav =
    document.getElementById("mainNav");


if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

        mainNav.classList.toggle("active");

    });

}


/*
   Mobile dropdown behaviour.
*/

document
    .querySelectorAll(".nav-dropdown > .nav-link")
    .forEach(link => {

        link.addEventListener("click", event => {

            if (window.innerWidth <= 900) {

                const parent =
                    link.parentElement;

                const menu =
                    parent.querySelector(".dropdown-menu");

                if (menu) {

                    event.preventDefault();

                    parent.classList.toggle("open");

                }

            }

        });

    });


/*
   Close mobile menu after selecting
   a submenu link.
*/

document
    .querySelectorAll(".dropdown-menu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            if (mainNav) {

                mainNav.classList.remove("active");

            }

        });

    });


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target
                            .classList
                            .add("visible");

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        observer.observe(element);

    });

} else {

    revealElements.forEach(element => {

        element.classList.add("visible");

    });

}


/* =========================================================
   CHATBOT
========================================================= */

const chatbot =
    document.getElementById("chatbot");

const chatLauncher =
    document.getElementById("chatLauncher");

const closeChat =
    document.getElementById("closeChat");

const chatForm =
    document.getElementById("chatForm");

const chatInput =
    document.getElementById("chatInput");

const chatMessages =
    document.getElementById("chatMessages");


function openChat() {

    if (!chatbot) return;

    chatbot.classList.add("open");

    if (chatInput) {

        setTimeout(() => {

            chatInput.focus();

        }, 200);

    }

}


function closeChatWindow() {

    if (!chatbot) return;

    chatbot.classList.remove("open");

}


if (chatLauncher) {

    chatLauncher.addEventListener(
        "click",
        openChat
    );

}


if (closeChat) {

    closeChat.addEventListener(
        "click",
        closeChatWindow
    );

}


/*
   Agent Support buttons.
*/

document
    .querySelectorAll("[data-open-chat]")
    .forEach(button => {

        button.addEventListener(
            "click",
            openChat
        );

    });


/* =========================================================
   CHAT MESSAGE UI
========================================================= */

function addMessage(
    message,
    sender = "bot"
) {

    if (!chatMessages) return;

    const messageElement =
        document.createElement("div");

    messageElement.className =
        sender === "user"
            ? "user-message"
            : "bot-message";

    messageElement.textContent =
        message;

    chatMessages.appendChild(
        messageElement
    );

    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}


/* =========================================================
   CHATBOT API
========================================================= */

async function sendChatMessage(message) {

    /*
       Try Flask backend first.
    */

    try {

        const response =
            await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    message: message
                })

            });


        if (!response.ok) {

            throw new Error(
                "Backend unavailable"
            );

        }


        const data =
            await response.json();


        if (data.response) {

            return data.response;

        }


        throw new Error(
            "Invalid backend response"
        );


    } catch (error) {

        /*
           Frontend fallback allows the
           website to remain usable when
           the Flask server is not running.
        */

        return localChatResponse(message);

    }

}


/* =========================================================
   LOCAL FALLBACK RESPONSES
========================================================= */

function localChatResponse(message) {

    const text =
        message.toLowerCase();


    if (
        text.includes("hi") ||
        text.includes("hello") ||
        text.includes("hey")
    ) {

        return (
            "Welcome to EcoDrive Agent Support! " +
            "How may I help you?"
        );

    }


    if (
        text.includes("ecodrive") ||
        text.includes("overview")
    ) {

        return (
            "EcoDrive EV is a fictional educational " +
            "concept demonstrating futuristic electric " +
            "mobility, smart technology and connected charging."
        );

    }


    if (
        text.includes("feature") ||
        text.includes("performance") ||
        text.includes("technology")
    ) {

        return (
            "EcoDrive focuses on instant electric performance, " +
            "energy efficiency, connected technology, digital " +
            "interfaces and smart mobility."
        );

    }


    if (
        text.includes("charg") ||
        text.includes("battery")
    ) {

        return (
            "EcoDrive's concept includes 11 kW home charging " +
            "and a fictional fast-charging capability of up to " +
            "80% in approximately 30 minutes."
        );

    }


    if (
        text.includes("test drive") ||
        text.includes("test-drive") ||
        text.includes("drive")
    ) {

        return (
            "You can book a demonstration test drive from " +
            "the Contact page. Open Contact → Book a Test Drive."
        );

    }


    if (
        text.includes("contact") ||
        text.includes("support")
    ) {

        return (
            "Visit the Contact page for the demonstration " +
            "test-drive form and EcoDrive Agent Support."
        );

    }


    if (
        text.includes("help")
    ) {

        return (
            "I can help with EcoDrive, Features, Charging, " +
            "Test Drive and Contact information."
        );

    }


    return (
        "I can help with EcoDrive, Features, Charging, " +
        "Test Drive, Contact and Help. Please ask me about " +
        "one of these topics."
    );

}


/* =========================================================
   CHAT FORM
========================================================= */

if (chatForm) {

    chatForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const message =
                chatInput.value.trim();


            if (!message) return;


            addMessage(
                message,
                "user"
            );


            chatInput.value = "";


            addMessage(
                "EcoDrive Agent is thinking...",
                "bot"
            );


            const response =
                await sendChatMessage(
                    message
                );


            /*
               Remove temporary message.
            */

            const messages =
                chatMessages.querySelectorAll(
                    ".bot-message"
                );


            if (messages.length > 0) {

                const last =
                    messages[messages.length - 1];

                if (
                    last.textContent ===
                    "EcoDrive Agent is thinking..."
                ) {

                    last.remove();

                }

            }


            addMessage(
                response,
                "bot"
            );

        }
    );

}


/* =========================================================
   QUICK CHAT BUTTONS
========================================================= */

document
    .querySelectorAll("[data-question]")
    .forEach(button => {

        button.addEventListener(
            "click",
            async () => {

                const question =
                    button.dataset.question;


                openChat();


                addMessage(
                    question,
                    "user"
                );


                addMessage(
                    "EcoDrive Agent is thinking...",
                    "bot"
                );


                const response =
                    await sendChatMessage(
                        question
                    );


                const messages =
                    chatMessages.querySelectorAll(
                        ".bot-message"
                    );


                if (messages.length > 0) {

                    const last =
                        messages[messages.length - 1];


                    if (
                        last.textContent ===
                        "EcoDrive Agent is thinking..."
                    ) {

                        last.remove();

                    }

                }


                addMessage(
                    response,
                    "bot"
                );

            }
        );

    });


/* =========================================================
   CHARGING SIMULATOR
========================================================= */

const chargeButton =
    document.getElementById(
        "chargeButton"
    );

const progressFill =
    document.getElementById(
        "progressFill"
    );

const batteryValue =
    document.getElementById(
        "batteryValue"
    );

const chargeStatus =
    document.getElementById(
        "chargeStatus"
    );


if (
    chargeButton &&
    progressFill &&
    batteryValue &&
    chargeStatus
) {

    chargeButton.addEventListener(
        "click",
        () => {

            let battery = 20;


            chargeButton.disabled =
                true;

            chargeButton.textContent =
                "Charging...";

            chargeStatus.textContent =
                "ACTIVE";


            const timer =
                setInterval(() => {

                    battery += 2;


                    progressFill.style.width =
                        `${battery}%`;


                    batteryValue.textContent =
                        `${battery}%`;


                    if (battery >= 80) {

                        clearInterval(timer);


                        chargeButton.disabled =
                            false;

                        chargeButton.textContent =
                            "Simulate Again";

                        chargeStatus.textContent =
                            "CHARGING COMPLETE";

                    }

                }, 100);

        }
    );

}


/* =========================================================
   CONTACT TEST DRIVE FORM
========================================================= */

const testDriveForm =
    document.getElementById(
        "testDriveForm"
    );

const testDriveMessage =
    document.getElementById(
        "testDriveMessage"
    );


if (
    testDriveForm &&
    testDriveMessage
) {

    testDriveForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document.getElementById(
                    "fullName"
                ).value.trim();


            testDriveMessage.textContent =
                `Thank you, ${name}. ` +
                `Your fictional EcoDrive test-drive ` +
                `request has been recorded for this demonstration.`;


            testDriveForm.reset();

        }
    );

}
