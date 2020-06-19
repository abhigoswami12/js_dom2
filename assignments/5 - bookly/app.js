const inputForm = document.querySelector('#add-book');
let sst = localStorage.getItem('bookly') ? JSON.parse(localStorage.getItem('bookly')) : [];
const ul = document.querySelector('ul');
let inputAdd =  document.querySelector('.input-add');



function addBook(event){
    console.log(event.target);
    event.preventDefault();
    if (inputAdd.value.trim()) {
        let book = inputAdd.value;
        sst.push(book);
        createUI();
        localStorage.setItem('bookly', JSON.stringify(sst));
        inputAdd.value = "";
    }
}



function createUI(data = sst, root = ul) {
    root.innerHTML = "";
    data.forEach((book, index) => {
        let li = document.createElement('li');
        let p = document.createElement('p');
        p.innerText = book;
        let span = document.createElement('span');
        span.innerText = "X";
        span.setAttribute('data-id', index);
        // span.addEventListener('click', deleteBook);
        root.append(li);
        li.append(p, span);
        span.classList.add('delete')
        p.classList.add("name")
       
    })
}

function deleteBook(event) {
    console.log(event.target);
    let id = event.target.dataset.id;
    sst.splice(id,1);
    localStorage.setItem('bookly', JSON.stringify(sst));
    createUI();
}

// searching book name
const searchForm = document.querySelector('.search');

function searchBook(event) {
    if (event.target.value.trim()) {
        let bookName = searchForm.value;
        var searchedBook = sst.filter(book => book.toUpperCase().includes(bookName.toUpperCase()));
        createUI(searchedBook);
        
    }
}

function searchBooks(event) {
    if (event.keyCode === 13) {
        searchForm.value = "";
    }
 }




//checkbox for hide
let hide = document.getElementById('hide');

// function hideBooks(event) {
//     if(event.target.checked){
//         var a = sst.filter(e=> e ="");
//         createUI(a);
//     }else {
//         createUI();
//     }
// }
function hideBooks(){
    ul.classList.toggle('add-toggle');
}

createUI();



inputForm.addEventListener('click', addBook);
searchForm.addEventListener('keyup', searchBook);
hide.addEventListener('click', hideBooks);
searchForm.addEventListener('keyup', searchBooks);
ul.addEventListener('click', deleteBook);//event delegation

