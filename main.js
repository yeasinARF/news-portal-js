
// category 
const catagoryUrl = 'https://openapi.programming-hero.com/api/news/categories';


const allcatagory = async() => {
    try{
        const response = await fetch(catagoryUrl);
        const data = await response.json();

        const allData = data.data.news_category;
        const allList = document.getElementById('pills-tab');
        
        allData.forEach((element) => {
            const li = document.createElement('li');
            li.classList.add('nav-item');
            li.setAttribute('role', 'presentation');
            li.innerHTML = `<button class="nav-link" id="pills-profile-tab" onclick="loadNews('${element.category_id}');toogleSpinner(true)" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">${element.category_name}</button>`

            allList.appendChild(li);
        })
    }
    catch(error){
        console.log(error);
    }
}
// load news 
const loadNews = (category_id) =>
{
    const url = ` https://openapi.programming-hero.com/api/news/category/${category_id}`
    try{
        fetch(url)
    .then(res => res.json())
    .then(res => displayNews(res.data))
    }
    catch(error)
    {
        console.log('error');
    }
}

function compare(a, b){ 
    if(a.total_view < b.total_view)return 1; 
    else if(a.total_view > b.total_view)return -1; 
    else return 0; 
}

const displayNews =(data)=>{
    const phonesContainer =document.getElementById('news-container');
    phonesContainer.innerHTML = '';
    const totalItem=document.getElementById('result');
    if(data.length>0){
        totalItem.innerText=data.length + ' items found';

    }
    else{
        totalItem.innerText='No results found';
        toogleSpinner(false);
    }
    data.sort(compare);
    

    for(let datas of data){
        let newDiv = document.createElement('div');
        newDiv.classList.add('row');
        newDiv.innerHTML = `
        <div class="col-md-4">
            <img src="${datas.thumbnail_url}" class=" rounded w-100 h-100 py-3" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body pt-4">
              <h5 class="card-title">${datas.title}</h5>
              <p class="card-text">${datas.details}</p>
              <div class="d-flex pt-5 justify-content-between">
                <div class="author-details">
                  <img class="rounded-circle" src="${datas.author.img}" alt="">
                  <span class="text-primary">${datas.author.name !=null ? datas.author.name: "no author found"}</span>
                  <p class="date">${datas.author.published_date !=null ? datas.author.published_date: "no date found"}</p>
                </div>
                <div class="view pt-4">
                  <i class="fas fa-eye"></i>
                  <span class="text-primary">${datas.total_view != null ? datas.total_view : "no view"}</span>

                </div>
                <div class="readMore pt-3">
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary detailsBtn" onclick="newsDetails('${datas._id}')" data-bs-toggle="modal" data-bs-target="#exampleModal">
                      Read Deatils
                    </button>
                    
                
                    
                </div>
              </div>
            </div>
        </div>

                
        `;
        phonesContainer.appendChild(newDiv);
        toogleSpinner(false);
    }
}
// spiner 
const toogleSpinner=isLoading=>{
    const loader=document.getElementById('loader');
    if(isLoading){
        loader.classList.remove('d-none')
    }
    else{
        loader.classList.add('d-none')
    }
}
//news details

const newsDetails=(news_id)=>{
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`
    try{
        fetch(url)
    .then(res => res.json())
    .then(res => displayNewsDetails(res.data[0]))
    }
    catch(error){
        console.log('error');
    }
    
}
let displayNewsDetails = (id) =>{
    let modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = id.title;
    let modalImage=document.getElementById('m_img');
    modalImage.src=id.image_url;
    let modalDetails = document.getElementById('m_details');
    modalDetails.innerText = id.details;
    let authorImage = document.getElementById('author-img');
    authorImage.src=id.author.img;
    let authorTitle=document.getElementById('author-name');
    authorTitle.innerText=id.author.name;
    let publishedDate = document.getElementById('published-date');
    publishedDate.innerText=id.author.published_date;
    let totalViwers = document.getElementById('viwers')
    totalViwers.innerText=id.total_view;

}

