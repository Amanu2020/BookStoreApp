var $  = require( 'jquery' );
var dt = require( 'datatables.net' )();
$(document).ready(function () {
   $('#book_table').DataTable({
  paginate: false,
  scrollY: 300
   });
});