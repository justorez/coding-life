class UserCard extends HTMLElement {
    constructor() {
        super()
        const templateElem = document.querySelector('#userCardTemplate')
        const content = templateElem.content.cloneNode(true)
        const avatarElem = content.querySelector('img')
        const nameElem = content.querySelector('.container>.name')
        const emailElem = content.querySelector('.container>.email')
        const button = content.querySelector('.container>button')

        avatarElem.setAttribute('src', this.getAttribute('avatar'))
        nameElem.innerText = this.getAttribute('name')
        emailElem.innerText = this.getAttribute('email')

        button.addEventListener('click', () => {
            alert('Try to follow')
        })

        const shadow = this.attachShadow({ mode: 'closed' })
        shadow.appendChild(content)
        templateElem.remove()
    }
}

const template = /*template*/`
<template id="userCardTemplate">
    <img class="avatar" />
    <div class="container">
        <p class="name"></p>
        <p class="email"></p>
        <button class="button">Follow John</button>
    </div>
    <style>
        /* Selects a shadow root host */
        :host {
            display: flex;
            align-items: center;
            width: 450px;
            height: 180px;
            background-color: #d4d4d4;
            border: 1px solid #d5d5d5;
            box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
            border-radius: 3px;
            overflow: hidden;
            padding: 10px;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
        }
        .avatar {
            flex: 0 0 auto;
            width: 160px;
            height: 160px;
            vertical-align: middle;
            border-radius: 5px;
        }
        .container {
            box-sizing: border-box;
            padding: 20px;
            height: 160px;
        }
        .container > .name {
            font-size: 20px;
            font-weight: 600;
            line-height: 1;
            margin: 0;
            margin-bottom: 5px;
        }
        .container > .email {
            font-size: 12px;
            opacity: 0.75;
            line-height: 1;
            margin: 0;
            margin-bottom: 15px;
        }
        .container > .button {
            padding: 10px 25px;
            font-size: 12px;
            border-radius: 5px;
            text-transform: uppercase;
        }
    </style>
</template>`

document.addEventListener('DOMContentLoaded', () => {
    const el = document.createElement('div')
    el.innerHTML = template
    document.body.appendChild(el.firstElementChild)
    // el.removeChild(el.childNodes[0])

    window.customElements.define('user-card', UserCard)
})
