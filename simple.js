// $(document).ready(function(){
 
//     $('.modal').modal();
 
//   })
 
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  var dropdown = document.querySelectorAll('select');
  var instances = M.Modal.init(elems,dropdown);
  M.FormSelect.init(dropdown);
});