const points4 = [16, 23, 7, 11, 3, 14];
const points5 =[4, 13, 8, 9, 7, 1]

function descendingSort(list){
let result = [];
let listDescending = list.sort(function(a,b){return b-a});
let len= parseInt(list.length/2)
let j=0;
for(let i=0;i<len;i++){
result[i]=listDescending[j];
result[list.length-i-1]=listDescending[j+1];
j+=2;
}
if(!(list.length % 2 == 0)){result[len]=Math.min(...list) };
return result;
}
console.log(descendingSort(points5));