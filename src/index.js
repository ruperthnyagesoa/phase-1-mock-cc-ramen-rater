// write your code here
function info(){
    fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then(data => nav(data))
}

function nav(data){
    let div = document.querySelector('#ramen-menu')
    data.forEach(ramen => {
        let img = document.createElement('img')
        img.src = ramen["image"]
        img.id = ramen['id']
        div.appendChild(img)
        //clickNav
        document.querySelector('div').addEventListener('click', e => {
            let img = document.querySelector('.detail-image')
            console.log(e.target)
            img.src = e.target.src
            img.id = e.target.id
            let info = data.filter(id => id.id == img.id)
            let title = document.querySelector('.name')
            title.textContent = `${info[0].name}`
            let rest = document.querySelector('.restaurant')
            rest.textContent = `${info[0].restaurant}`
            let rate = document.querySelector('#rating-display')
            rate.textContent = info[0].rating
            let comment = document.querySelector('#comment-display')
            comment.textContent = info[0].comment

    });
    })
}
 function clickNav(data){
//     document.querySelector('img').addEventListener('click', e => {
//         let img = document.querySelector('.detail-image')
//         img.src = e.target.src
//         img.id = e.target.id
//         let info = data.filter(id => id.id == img.id)
//         let title = document.querySelector('.name')
//         title.textContent = `${info[0].name}`
//         let rest = document.querySelector('.restaurant')
//         rest.textContent = `${info[0].restaurant}`
//         let rate = document.querySelector('#rating-display')
//         rate.textContent = info[0].rating
//         let comment = document.querySelector('#comment-display')
//         comment.textContent = info[0].comment
//     })
}

function Theform(){
    let form = document.querySelector('#new-ramen')

    form.addEventListener('submit', (e) =>{
        e.preventDefault()
        let comment = e.target['new-comment'].value
        let rate = e.target['new-comment'].value
        let name = e.target['name'].value
        let restaurant = e.target['restaurant'].value
        let img = e.target['image'].value
        let newRamen = {
            name: name,
            restaurant: restaurant,
            image: img,
            rating: rate,
            comment: comment
        }
        const reqOptions = {
            headers: {"Content-Type": "application/json"}, //this header is required whenever you send data POST or PATCH
            method: "POST", // method must match the type of req
            body: JSON.stringify(newRamen) //the new object must be "stringified"
         }

       fetch('http://localhost:3000/ramens', reqOptions) //for a POST req the url must be this, and the second arg is an object containing "options"
       .then(r => r.json())
       .then(newRamen => {console.log(newRamen) // if the POST req is successful the server send back the new entity, which will now have an id
       window.location.reload()
       })
    })
}
Theform()
info()
