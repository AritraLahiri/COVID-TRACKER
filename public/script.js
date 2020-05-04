//Counting Numbers Logic
$('.count').counterUp({
delay:10,
time:3000
});
//ScrollBar Show/Hide Logic
button = document.getElementById('myBtn');
window.onscroll = function() {scrollFucntion()} ;
function scrollFucntion(){
if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100 ){
button.style.display = 'block';
}
else{
button.style.display = 'none';
}
}
//ScrollBar  Logic
function topFunc(){
document.body.scrollTop = 0;
document.documentElement.scrollTop = 0;
button.style.transition = '0.9s ease';
}