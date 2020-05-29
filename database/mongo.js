


   (async () => {
      await client.connect();
      const databse = client.db("bookstore");
      collection = databse.collection("book");
      
      const result = await collection.insertOne({
         "isbn": "9781593275846",
         "title": "Eloquent JavaScript, Second Edition",
         "subtitle": "A Modern Introduction to Programming",
         "author": "Marijn Haverbeke",
         "published": "12/14/2014",
         "publisher": "No Starch Press",
         "edition": "3rd",
         "price": 25.00,
         "pages": 472,
         "format": "pdf",
         "description": "JavaScript lies at the heart of almost every modern web application, from social apps to the newest browser-based games. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
         "image": "https://images-na.ssl-images-amazon.com/images/I/51-5ZXYtcML._SX377_BO1,204,203,200_.jpg",
         "website": "http://eloquentjavascript.net/"
      });
      console.log(result.insertedId);
      client.close();
   })();