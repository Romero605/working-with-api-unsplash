const input = document.getElementById('input');
const grid = document.getElementsByClassName('grid')[0];

window.addEventListener('load', dayNightMode());


input.addEventListener('keydown', function(event){
    if (event.key == 'Enter')
    {
        loadIMG();
    }
})


//this app retreives the images from the API and adds them onto the web page.
function loadIMG(){
    removeIMG();
    const url = 'https://api.unsplash.com/search/photos/?query='+input.value+'&per_page=9&client_id=f7PLPXKdhb_lIa6lYbkpbXNxTuJtLFlJxoRRywG34Ks';
    
    fetch(url)

    .then(response =>{
        if (response.ok)
        {
            return response.json();

        }
        else{
            alert(response.status);
        }
    })

    .then(data => {
        const imageNodes = [];

        for (let i = 0; i < data.results.length; i++)
        {
            imageNodes[i] = document.createElement('div');
            imageNodes[i].className = 'img';
            imageNodes[i].style.backgroundImage = 'url('+data.results[i].urls.raw+')';
            imageNodes[i].addEventListener('dblclick', function(){
                window.open(data.results[i].links.download, '_blank');
            })
            grid.appendChild(imageNodes[i]);;
        }
    })
}

//this function removes all images.
function removeIMG()
{
    grid.innerHTML = '';
}


//this function changes the background colors of the app depending on the time.
function dayNightMode()
{
    const date = new Date();
    const hour = date.getHours();

    if (hour >= 7 && hour <= 19)
    {
        document.body.style.backgroundColor = 'lightblue';
        document.body.style.color = 'white';
    }
    else{
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
    }
}