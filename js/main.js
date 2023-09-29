((doc, win) => {
    'use strict';

    const btn_view = Array.from(doc.querySelectorAll('.btn')),
        modal = doc.querySelector('.modal'),
        modal_image = doc.querySelector('.modal .image'),
        close_modal = doc.querySelector('.close'),
        upload = doc.querySelector('.add-photo');
    const getBlobURL = (win.URL && URL.createObjectURL.bind(URL)) || (win.webkitURL && webkitURL.createObjectURL.bind(webkitURL)) || win.createObjectURL;
    

    btn_view.forEach((btn) => {
        btn.onclick = (e) => {
            const children = []
            for (let path of e.path) {
                children.push(path.children)
            }
            modal_image.src = children['2']['0'].src;
            modal.classList.add('fadin')
        }
    })

    close_modal.onclick = () => {
        modal.classList.remove('fadin');
    }


    upload.ondragenter = (e) => {
        upload.classList.add('shadow');
    }
    upload.ondragleave = (e) => {
        upload.classList.remove('shadow')
    }
    upload.ondragover = (e) => false;

    upload.ondrop = (e) => {
        const files = e.dataTransfer.files;

        for (let file of files) {
            if (file.type.substring(0, 6) != 'image/') continue

            const divPhoto = doc.createElement('div'),
                image = doc.createElement('img');


            image.src = getBlobURL(file)
            image.onload = () => {
                divPhoto.setAttribute('class', 'photo')
                divPhoto.appendChild(image)
                doc.querySelector('.galery').appendChild(divPhoto)

            }
        }
        upload.classList.remove('shadow')
        return false;
    }
})(document, window)