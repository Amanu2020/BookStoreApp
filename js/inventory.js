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
            let list = ' ';

            $.each(data.books, (key, value) => {
                //console.log(key);
               //console.log(value.isbn); 
               key++;
                list += '<tr>';
                list += '<th scope = "row">' + key + '</th>';
                list += '<td class="text-sm">' + value.isbn + '</td>';
                list += '<td class="text-sm">' + value.title + '</td>';
                list += '<td class="text-sm">' + value.author + '</td>';
                list += '<td class="text-sm">' + value.published + '</td>';
                list += '<td class="text-sm">' + value.publisher + '</td>';
                list += '<td class="text-sm">' + value.edition + '</td>';
                list += '<td class="text-sm">' + value.format + '</td>';
                list += '<td class="text-sm">' + value.pages + '</td>';
                list += '</tr>';
            });
            $('#books_list').append(list);

        }).catch(err => {
            console.log('The request failed!');
        });
});