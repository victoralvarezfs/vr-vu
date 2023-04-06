import "@needle-tools/engine";
import { EventStream } from "./scripts/interfaces/Stream";
import API from "./scripts/services/API";
import TestLogin from "./scripts/interfaces/TestLogin";

import user from "../assets/imgs/user.svg";
import avatar from "../assets/imgs/18_Boy.png";
import touchCommand from "../assets/imgs/noun-touch-884207.png";
import touchRotate from "../assets/imgs/noun-rotate-110472.png";
import touchGesture from "../assets/imgs/noun-gesture-2771732.png";
import desktopImg from "../assets/imgs/tutorial-desktop.png";

const api = new API();
const test = new TestLogin();
const credentials = { email: test.email, password: test.pass };

let logSuccess = false;

localStorage.clear();

if (!localStorage.token) {
  await api
    .login(credentials)
    .then((response) => {
      console.log("Login successful!");
      console.log(`Full response: ${response.data}`);
      logSuccess = true;
    })
    .catch((err) => {
      console.log(`Error while logging: ${err}`);
    });
}

if (logSuccess) {
  const stream = await api.getStream(test.id);

  if (stream != undefined) {
    console.log(`Stream found! Playback Link: ${stream.playbackLink}`);
  }
}

const welcome = `
  <div id="tooltip-content-welcome" class="flex flex-col justify-center items-center">
    <h2 class="text-white text-4xl font-bold text-center">
      Welcome to the VR Room
    </h2>
    <p class="text-lg text-gray-400 text-center max-w-xl p-10">
      Welcome to the VR room where you can enjoy the event while meeting
      other people. You can also check out the experience in 360!
    </p>
    <button id="btn-start" class="tooltip-button px-8">
      Start
    </button>
  </div>`;

//<!-- hidden xl:grid -->
const avatarDiv = `
         <div id="tooltip-content-avatar" class="hidden grid-cols-1 gap-y-6 gap-x-3 sm:grid-cols-2 items-center justify-center">
            <div class="col-span-1 px-20">
              <img src=${avatar} class="object-center"/>
            </div>
            <div class="col-span-1 items-center justify-center">
              <h2 class="text-xl font-bold text-white text-center">Welcome user, please choose the color of your avatar</h2>              
              <section aria-labelledby="options-heading" class="mt-12 px-12">
                <div id="color-radio">
                  <!-- Colors -->
                    <legend class="sr-only">Choose a color</legend>
                    <span class="flex items-center space-x-4">

                      <label class="relative flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400">
                        <input type="radio" checked name="color-choice" value="Red" class="sr-only" aria-labelledby="color-choice-0-label">
                        <span id="color-choice-0-label" class="sr-only"> Red </span>
                        <span aria-hidden="true" class="h-8 w-8 bg-[#FF0505] rounded-full border border-black border-opacity-10"></span>
                      </label>

                      <label class="relative flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400">
                        <input type="radio" name="color-choice" value="Blue" class="sr-only" aria-labelledby="color-choice-1-label">
                        <span id="color-choice-1-label" class="sr-only"> Blue </span>
                        <span aria-hidden="true" class="h-8 w-8 bg-[#0047FF] rounded-full border border-black border-opacity-10"></span>
                      </label>

                      <label class="relative flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-900">
                        <input type="radio" name="color-choice" value="Yellow" class="sr-only" aria-labelledby="color-choice-2-label">
                        <span id="color-choice-2-label" class="sr-only"> Yellow </span>
                        <span aria-hidden="true" class="h-8 w-8 bg-[#FFCE1F] rounded-full border border-black border-opacity-10"></span>
                      </label>

                      <label class="relative flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400">
                        <input type="radio" name="color-choice" value="Magenta" class="sr-only" aria-labelledby="color-choice-0-label">
                        <span id="color-choice-0-label" class="sr-only"> Magenta </span>
                        <span aria-hidden="true" class="h-8 w-8 bg-[#A90BAC] rounded-full border border-black border-opacity-10"></span>
                      </label>

                      <label class="relative flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400">
                        <input type="radio" name="color-choice" value="Green" class="sr-only" aria-labelledby="color-choice-0-label">
                        <span id="color-choice-0-label" class="sr-only"> Green </span>
                        <span aria-hidden="true" class="h-8 w-8 bg-[#4ECB23] rounded-full border border-black border-opacity-10"></span>
                      </label>

                      <label class="relative flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400">
                        <input type="radio" name="color-choice" value="Purple" class="sr-only" aria-labelledby="color-choice-0-label">
                        <span id="color-choice-0-label" class="sr-only"> Purple </span>
                        <span aria-hidden="true" class="h-8 w-8 bg-[#6366BD] rounded-full border border-black border-opacity-10"></span>
                      </label>

                      <label class="relative flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400">
                        <input type="radio" name="color-choice" value="Indigo" class="sr-only" aria-labelledby="color-choice-0-label">
                        <span id="color-choice-0-label" class="sr-only"> Indigo </span>
                        <span aria-hidden="true" class="h-8 w-8 bg-[#07D2FF] rounded-full border border-black border-opacity-10"></span>
                      </label>

                      <label class="relative flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400">
                        <input type="radio" name="color-choice" value="Orange" class="sr-only" aria-labelledby="color-choice-0-label">
                        <span id="color-choice-0-label" class="sr-only"> Orange </span>
                        <span aria-hidden="true" class="h-8 w-8 bg-[#FF5106] rounded-full border border-black border-opacity-10"></span>
                      </label>
                    </span>
                  </div>
                  <div class="block fixed pl-24 m-4 justify-center items-center">
                    <button id="btn-ready" class="tooltip-button px-16">
                      Ready
                    </button>
                  </div>
                </div>
              </section>
            </div>`;

const spanPos = `
  <div id="position" class="flex items-center space-x-3">
    <label id="label-0" class="relative flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400 border-2 border-solid border-white">
      <input disabled type="radio" checked id="tutorial-0" name="tutorial-0" value="0" class="sr-only" aria-labelledby="label-0">
      <span aria-hidden="true" class="h-4 w-4 selected rounded-full"></span>
    </label>
    <label id="label-1" class="relative flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-900 border-2 border-solid border-white">
      <input disabled type="radio" id="tutorial-1" name="tutorial-1" value="1" class="sr-only" aria-labelledby="label-1">
      <span aria-hidden="true" class="h-4 w-4 bg-tooltip-black rounded-full"></span>
    </label>
    <label id="label-2" class="relative flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-900 border-2 border-solid border-white">
      <input disabled type="radio" id="tutorial-2" name="tutorial-2" value="2" class="sr-only" aria-labelledby="label-2">
      <span aria-hidden="true" class="h-4 w-4 bg-tooltip-black rounded-full"></span>
    </label>
  </div>`;

//<!--  flex xl:hidden -->
const tutorialTouch = `
<div id="tooltip-content-tutorial-touch" class="hidden flex-col items-center justify-center">
  <h2 class="text-white text-4xl font-bold text-center">
      Tutorial
  </h2>
  <div class="relative">
    <div id="touch-0" class="slide relative mx-auto">
      <img src=${touchCommand} class="object-center object-cover m-auto w-260 h-260"/>
      <p class="text-lg text-gray-400 text-center max-w-xl p-4">
        To move, tap on a spot on the floor within the room
      </p>
    </div>
    <div id="touch-1" class="slide relative mx-auto hidden">
      <img src=${touchRotate} class="object-center object-cover m-auto w-260 h-260"/>
      <p class="text-lg text-gray-400 text-center max-w-xl p-4 ">
          To rotate, touch and drag with a single finger
      </p>
    </div>
    <div id="touch-2" class="slide relative mx-auto hidden">
      <img src=${touchGesture} class="object-center object-cover m-auto py-9.5"/>
      <p class="text-lg text-gray-400 text-center max-w-xl p-4">
        To change from third person to first person view, use two fingers to zoom in and zoom out
      </p>
    </div>
  </div>
  <!-- Touch Radio -->
  ${spanPos}
  <!-- End of Touch Radio -->
  <div class="col-span-2 m-6 pt-4">
    <button id="btn-back" class="text-white bg-tooltip-black p-4">
      Back
    </button>
    <button id="btn-next" class="tooltip-button px-8">
      Next
    </button>
  </div>
</div>`;

// xl:flex xl:flex-col
const tutorialDesktop = `
<div id="tooltip-content-tutorial-desktop" class="hidden m-auto items-center justify-center">
  <h2 class="text-white text-4xl font-bold text-center p-10">
      Tutorial
  </h2>
  <div class="z-0">
    <img src=${desktopImg} class="object-center mx-20"/>
  </div>
  <p class="z-50 text-sm text-white text-center max-w-xl fixed pb-8">
    Walk forward
  </p>
  <p class="z-50 text-sm text-white text-center max-w-xl fixed top-11/20 left-52.5 lg:ml-3 lg:mt-4 xl:mt-0 xl:px-8 xl:ml-1">
    Walk left
  </p>
  <p class="z-50 text-sm text-white text-center max-w-xl fixed top-11/20 lg:mt-4 xl:mt-0">
    Walk backwards
  </p>
  <p class="z-50 text-sm text-white text-center max-w-xl fixed top-11/20 right-52.5 lg:mr-3 lg:mt-4 xl:mt-0 xl:px-8 xl:mr-1 ">
    Walk right
  </p>
  <div class="col-span-2 m-6 pt-8">
    <button id="btn-start" class="tooltip-button px-8">
      Next
    </button>
  </div>
</div>`;

const sidebar360 = `
<div class="flex relative">
<!-- drawer init and show -->
  <!-- <div class="top-1/2 left-0">
    <button id="sidebar-toggle" class="sidebar-toggle">
      >
    </button>
  </div> -->
  <div id="drawer-navigation" class="drawer-navigation -translate-x-full" aria-labelledby="drawer-navigation-label">
      <button type="button" class= "w-56 text-white hover:bg-gray-200 rounded-lg overflow-y-auto text-md p-1 inline-flex items-center text-center justify-center bg-gradient-to-br from-[#C228A7] via-[#D33397] to-[#E53F86] border-solid border-2 border-white hover:border-black" >
        <svg width="20" height="20" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_22_46)"><path d="M10.3706 17.6407C10.9164 17.6407 11.394 18.0964 11.394 18.6172L11.394 23.1093L24.3571 23.1093L24.3571 3.96912L11.394 3.96912L11.394 8.46116C11.394 8.98196 10.9164 9.43771 10.3706 9.43771C9.82484 9.43771 9.34722 8.98196 9.34722 8.46116L9.34722 2.99261C9.34722 2.47172 9.82484 2.01605 10.3706 2.01605L25.3804 2.01605C25.9262 2.01605 26.4038 2.47172 26.4038 2.99261L26.4038 24.087C26.4038 24.6078 25.9262 25.0636 25.3804 25.0636L10.3706 25.0636C9.82484 25.0636 9.34722 24.6078 9.34722 24.087L9.34722 18.6185C9.34722 18.0325 9.82484 17.6418 10.3706 17.6418L10.3706 17.6407Z" fill="white"/><path d="M0.000287455 14.0598L0.000287472 13.8646L0.000287483 13.7343L0.000287495 13.6041C0.0002875 13.539 0.0685305 13.539 0.0685305 13.4738L0.136777 13.4087L0.136777 13.3436L5.66305 8.00522C6.07242 7.61459 6.68645 7.61459 7.09582 8.00522C7.50518 8.39584 7.50518 8.98177 7.09582 9.3724L3.41163 13.0181L17.8755 13.0182C18.4213 13.0182 18.8989 13.4739 18.8989 13.9947C18.8989 14.5155 18.4213 14.9713 17.8755 14.9713L3.47985 14.9713L7.16402 18.617C7.57339 19.0076 7.57339 19.5935 7.16402 19.9842C6.95938 20.1794 6.68641 20.2446 6.48176 20.2446C6.20888 20.2446 5.93597 20.1143 5.73126 19.919L0.341403 14.6458C0.341403 14.6458 0.341403 14.5806 0.27316 14.5806L0.27316 14.5155C0.204915 14.4504 0.204914 14.3853 0.136672 14.3202L0.136672 14.2551C0.136672 14.19 0.0684294 14.1249 0.0684294 14.0598L0.000287455 14.0598Z" fill="white"/></g><defs><clipPath id="clip0_22_46"><rect width="26.4036" height="25.1949" fill="white" transform="matrix(-1 -8.74228e-08 -8.74228e-08 1 26.4038 0.941711)"/></clipPath></defs></svg>
        <span class="m-2">Leave Event</span>
      </button>
      <div class="flex flex-col items-center justify-center p-4/10">
        <button type="button" class= "w-24 text-gray-400 bg-tooltip-black hover:bg-gray-600 hover:text-white; rounded-lg overflow-y-auto text-md p-1 inline-flex items-center text-center justify-center border-solid border-2 border:white hover:border-[#D33397]" >
          <span class="text-white m-2">Back to VR</span>
        </button>
      </div>
    <div class="fixed top-3/5">
        <ul class="space-y-2">
          <li>
            <a href="#" class= "w-56 text-gray-400 hover:text-white rounded-lg overflow-y-auto text-md p-1 inline-flex items-center text-center justify-center bg-tooltip-black border-solid border-2 border-white hover:border-[#D33397]" >
              <span class="text-white m-2">Behind Stage</span>
            </a>
          </li>
          <li>
            <a href="#" class= "w-56 text-gray-400 hover:text-white rounded-lg overflow-y-auto text-md p-1 inline-flex items-center text-center justify-center bg-tooltip-black border-solid border-2 border-white hover:border-[#D33397]" >
              <span class="text-white m-2">Front Stage</span>
            </a>
          </li>
          <li>
            <a href="#" class= "w-56 text-gray-400 hover:text-white rounded-lg overflow-y-auto text-md p-1 inline-flex items-center text-center justify-center bg-tooltip-black border-solid border-2 border-white hover:border-[#D33397]">
              <span class="text-white m-2">General</span>
            </a>
          </li>
        </ul>
    </div>
  </div>
</div>
`;

const mobile360 = ``;

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<div id="webxr-ui" class="min-w-screen min-h-screen grid grid-cols-1 p-8">
  <!-- 360 Room UI -->
  <button id="button-leave" type="button" class="hidden button-leave">
    <svg width="20" height="20" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_22_46)"><path d="M10.3706 17.6407C10.9164 17.6407 11.394 18.0964 11.394 18.6172L11.394 23.1093L24.3571 23.1093L24.3571 3.96912L11.394 3.96912L11.394 8.46116C11.394 8.98196 10.9164 9.43771 10.3706 9.43771C9.82484 9.43771 9.34722 8.98196 9.34722 8.46116L9.34722 2.99261C9.34722 2.47172 9.82484 2.01605 10.3706 2.01605L25.3804 2.01605C25.9262 2.01605 26.4038 2.47172 26.4038 2.99261L26.4038 24.087C26.4038 24.6078 25.9262 25.0636 25.3804 25.0636L10.3706 25.0636C9.82484 25.0636 9.34722 24.6078 9.34722 24.087L9.34722 18.6185C9.34722 18.0325 9.82484 17.6418 10.3706 17.6418L10.3706 17.6407Z" fill="white"/><path d="M0.000287455 14.0598L0.000287472 13.8646L0.000287483 13.7343L0.000287495 13.6041C0.0002875 13.539 0.0685305 13.539 0.0685305 13.4738L0.136777 13.4087L0.136777 13.3436L5.66305 8.00522C6.07242 7.61459 6.68645 7.61459 7.09582 8.00522C7.50518 8.39584 7.50518 8.98177 7.09582 9.3724L3.41163 13.0181L17.8755 13.0182C18.4213 13.0182 18.8989 13.4739 18.8989 13.9947C18.8989 14.5155 18.4213 14.9713 17.8755 14.9713L3.47985 14.9713L7.16402 18.617C7.57339 19.0076 7.57339 19.5935 7.16402 19.9842C6.95938 20.1794 6.68641 20.2446 6.48176 20.2446C6.20888 20.2446 5.93597 20.1143 5.73126 19.919L0.341403 14.6458C0.341403 14.6458 0.341403 14.5806 0.27316 14.5806L0.27316 14.5155C0.204915 14.4504 0.204914 14.3853 0.136672 14.3202L0.136672 14.2551C0.136672 14.19 0.0684294 14.1249 0.0684294 14.0598L0.000287455 14.0598Z" fill="white"/></g><defs><clipPath id="clip0_22_46"><rect width="26.4036" height="25.1949" fill="white" transform="matrix(-1 -8.74228e-08 -8.74228e-08 1 26.4038 0.941711)"/></clipPath></defs></svg>
    <span class="m-2">Leave Event</span>
  </button>
  ${sidebar360}
  ${mobile360}
  <!-- End of 360 Room UI -->

  <!-- Lobby Room UI -->
  <div id="tooltip" class="tooltip">
    ${welcome}
    ${avatarDiv}
    ${tutorialDesktop}
    ${tutorialTouch}
  </div>
  <div id="div-360" class="button-360">
    <button id="btn-360" class="tooltip-button">
      Watch in 360
    </button>
  </div>
  <button id="mic-button" class="hidden xl:block fixed bottom-10 left-4/10 xl:left-47.5 mic-button">
    <span class="material-symbols-outlined text-white text-5xl leading-none">mic</span>
  </button>
  <div id="user-btn" class="hidden fixed xl:left-9/10 xl:bottom-9/10 rounded-full w-20 h-20 bg-gradient-to-br from-[#C228A7] via-[#D33397] to-[#E53F86]">
    <div class="rounded-full w-18 h-18 m-1 bg-black">
      <img class="px-4 py-4" src="${user}">
    </div>
  </div>
  <!-- End of Lobby Room UI -->
</div>`;

window.onload = () => {
  let btnWelcome = document.getElementById("btn-start");
  let btnAvatar = document.getElementById("btn-ready");
  let btnTutDesk = document.getElementById("tooltip-content-tutorial-desktop");
  let btnBack = document.getElementById("btn-back");
  let btNext = document.getElementById("btn-next");

  btnWelcome!.addEventListener("click", () =>
    showNextScreen("tooltip-content-welcome")
  );
  btnAvatar!.addEventListener("click", () =>
    showTutorialDesktop("tooltip-content-avatar")
  );
  btnTutDesk!.addEventListener("click", () => closeTooltip());
  btnBack!.addEventListener("click", () => returnOneScreen());
  btNext!.addEventListener("click", () => advanceOneScreen());

  /*
  // 360 room Sidebar
  let sidebar = document.querySelector(".drawer-navigation");
  let sidebarToggle = document.querySelector("#sidebar-toggle");
  sidebarToggle!.addEventListener("click", () => {
    if (sidebar) {
      if (sidebar.classList.contains("drawer-open")) {
        sidebar.classList.remove('drawer-open');
        sidebar.classList.add('drawer-closed');
        sidebarToggle!.classList.remove("drawer-open");
        sidebarToggle!.classList.add("drawer-closed");
        sidebarToggle!.innerHTML = '>';
      } else {
        sidebar.classList.remove('drawer-closed');
        sidebar.classList.add('drawer-open');
        sidebarToggle!.classList.remove("drawer-closed");
        sidebarToggle!.classList.add("drawer-open");
        sidebarToggle!.innerHTML = '<';
      }
    }
  });
  */
};

function showNextScreen(welcomeTtp: string) {
  const isMobile = window.innerHeight <= 768;
  let currentTooltip = document.getElementById(welcomeTtp);
  currentTooltip!.classList.add("hidden");
  if (!isMobile) {
    showAvatar();
  } else {
    showTutorialMobile("tooltip-content-tutorial-touch");
  }
}

function showAvatar() {
  let avatarTtp = document.getElementById("tooltip-content-avatar");
  avatarTtp!.classList.add("xl:grid");
}

function showTutorialMobile(mobTutTtp: string) {
  let newTooltip = document.getElementById(mobTutTtp);
  newTooltip!.classList.remove("hidden");
  newTooltip!.classList.add("flex", "xl:hidden");
}

function returnOneScreen() {
  let pos = document.querySelectorAll(
    '#position input[type="radio"]'
  ) as NodeListOf<HTMLInputElement>;
  let passed = false;
  pos.forEach((radio) => {
    if (radio.checked) {
      let place = Number(radio.value);
      console.log(`value: ${radio.value}`);
      if (place == 0 && !passed) {
        document
          .getElementById("tooltip-content-tutorial-touch")!
          .classList.remove("flex", "xl:hidden");
        document
          .getElementById("tooltip-content-tutorial-touch")!
          .classList.add("hidden");
        document
          .getElementById("tooltip-content-welcome")!
          .classList.remove("hidden");
      } else {
        if (!passed) {
          radio.checked = false;
          let label = document.getElementById(`label-${place}`);
          let nxLabel = document.getElementById(`label-${place - 1}`);
          label!.classList.remove("selected");
          label!.classList.add("bg-tooltip-black");
          radio.classList.remove("selected");
          radio.classList.add("bg-tooltip-black");
          let tutScreen = document.getElementById(`touch-${place}`);
          let nextTutScr = document.getElementById(`touch-${place - 1}`);
          let nextScrRadio = document.getElementById(
            `tutorial-${place - 1}`
          ) as HTMLInputElement;
          tutScreen!.classList.add("hidden");
          nextTutScr!.classList.remove("hidden");
          nextScrRadio!.checked = true;
          nxLabel!.classList.remove("bg-tooltip-black");
          nxLabel!.classList.add("selected");
          passed = true;
        }
      }
    }
  });
}

function advanceOneScreen() {
  let pos = document.querySelectorAll(
    '#position input[type="radio"]'
  ) as NodeListOf<HTMLInputElement>;
  let passed = false;
  pos.forEach((radio) => {
    if (radio.checked) {
      let place = Number(radio.value);
      console.log(`value: ${radio.value}`);
      if (place == 2 && !passed) {
        document
          .getElementById("tooltip-content-tutorial-touch")!
          .classList.remove("flex", "xl:hidden");
        document
          .getElementById("tooltip-content-tutorial-touch")!
          .classList.add("hidden");
        closeTooltip();
      } else {
        if (!passed) {
          radio.checked = false;
          let label = document.getElementById(`label-${place}`);
          let nxLabel = document.getElementById(`label-${place + 1}`);
          label!.classList.remove("selected");
          label!.classList.add("bg-tooltip-black");
          let tutScreen = document.getElementById(`touch-${place}`);
          let nextTutScr = document.getElementById(`touch-${place + 1}`);
          let nextScrRadio = document.getElementById(
            `tutorial-${place + 1}`
          ) as HTMLInputElement;
          tutScreen!.classList.add("hidden");
          nextTutScr!.classList.remove("hidden");
          nextScrRadio!.checked = true;
          nxLabel!.classList.remove("bg-tooltip-black");
          nxLabel!.classList.add("selected");
          passed = true;
        }
      }
    }
  });
}

function showTutorialDesktop(avatarTtp: string) {
  let colorRadio = document.querySelectorAll(
    '#color-radio input[type="radio"]'
  ) as NodeListOf<HTMLInputElement>;

  colorRadio.forEach((radio) => {
    if (radio.checked) {
      console.log(`Color chosen: ${radio.value}`);
    }
  });

  let currentTooltip = document.getElementById(avatarTtp);
  currentTooltip!.classList.remove("xl:grid");
  let desktopTutTtp = document.getElementById(
    "tooltip-content-tutorial-desktop"
  );
  desktopTutTtp!.classList.add("xl:flex", "xl:flex-col");
}

function closeTooltip() {
  // Close the tooltip showing in the middle of the screen
  let tooltip = document.getElementById("tooltip");
  tooltip!.classList.add("hidden");

  // Shows leave event button
  let btnLeave = document.getElementById("button-leave");
  btnLeave!.classList.remove("hidden");
  //btnLeave!.classList.add("button-leave");

  // If mobile, shows watch in 360 button
  if (window.innerHeight <= 768) {
    let btn360 = document.getElementById("div-360");
    btn360!.classList.remove("hidden", "button-360");
    btn360!.classList.add("button-360-mobile");
  }
}
