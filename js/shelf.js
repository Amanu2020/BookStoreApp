$(document).ready(() => {
    const url = "../data/book.json";

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data.books);
            //let b = Object.getOwnPropertyNames(data.books[0]);
            //console.log(b);
            let list = "";
            $.each(data.books, (key, value) => {
                //console.log(key);
                //console.log(value.isbn);
                list += "<div class='col-sm-12 col-md py-2'>";
                list += "<ul class='list - unstyled border shadow p-4'>";
                list += "<li class='media'>";
                list += "<img class='img-fluid mr-5' src='" + value.image + "'width='150'  height='170'>";
                list += "<div class='media-body'>"
                list += "<p class='mt-0 font-weight-bold text-success'>" + value.title + "<br><small class='mt-0 text-secondary'>" + value.subtitle + "</small></p>";
                list += "<ul class='list-unstyled my-2'>";
                list += "<li class='mt-0'><span class='font-weight-bold'>Author: </span>" + value.author + "</li>";
                list += "<li class='mt-0'><span class='font-weight-bold'>Edition: </span>" + value.edition + "</li>";
                list += "<li class='mt-0'><span class='font-weight-bold'>Pages: </span>" + value.pages + "</li>";
                list += "<li class='mt-0'><span class='font-weight-bold'>Format: </span>" + value.format + "</li>";
                list += "<li class='mt-0'><span class='font-weight-bold'>Price: $</span><span class='font-weight-bold text-danger'>" + value.price + "</span> USD</li>";
                list += "</ul>"
                list += "<button type='button' class='btn btn-outline-secondary mr-3 px-5 my-3'>Rent</button>";
                list += "<button type='button' class='btn btn-outline-danger mr-3 px-5'>Buy</button>";
                list += "</div>"
                list += "</li>"
                list += "</ul>"
                list += "</div>";
            });
            $('#list').append(list);

        }).catch(err => {
            console.log('The request failed!');
        });
});