const straightFrom = document.querySelector('.straight .from');
const backFrom = document.querySelector('.back .from');
const straightTo = document.querySelector('.straight .to');
const backTo = document.querySelector('.back .to');
const straightValue = document.querySelector('.straight .value');
const backValue = document.querySelector('.back .value');
const straightInput = document.querySelector('.straight input');
const backInput = document.querySelector('.back input');
const allstraightExch = document.querySelectorAll('.straight .exchange li');
const allbackExch = document.querySelectorAll('.back .exchange li');
let from = 'RUB';
let  to = 'USD';


const exchange = async (from, to) => {
   const response = await fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`)
   const data = await response.json()
   return Object.values(data.rates)[0]
}
function straight () { backInput.value = numberMask(+(straightInput.value.split(' ').join('')) * +straightValue.textContent) }
function back () { straightInput.value = numberMask(+(backInput.value.split(' ').join('')) * +backValue.textContent) }




allstraightExch.forEach(item =>{
   item.addEventListener('click', (event) => {
       allstraightExch.forEach(item => item.classList.remove("default"))
       event.target.classList.add("default")
       from = event.target.textContent
       allData(false)
   })
})
allbackExch.forEach(item =>{
   item.addEventListener('click', (event) => {
       allbackExch.forEach(item => item.classList.remove("default"))
       event.target.classList.add("default")
       to = event.target.textContent
       allData(true)
   })
})

function allData(side) {
   exchange(from, to, side).then(ratio => {
       straightFrom.textContent = from
       straightTo.textContent = to
       straightValue.textContent = ratio.toFixed(4)
       backFrom.textContent = to
       backTo.textContent = from
       backValue.textContent = (1 / ratio).toFixed(4)
       if (side == true) straight()
       else if (side == false) back()
   })
   } allData()


function numberMask (number) {
   string = number.toString()
   if (string.length == 2 && string[0] == '0' && string[1] != '.') string = string.replace('0', '')
   if (string.indexOf('.') == -1) return string.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
   let parts = string.split('.')
   parts[0] = parts[0].replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
   return (parts[0] + '.' + parts[1]).replace(/(\.\d{4}).*/g, '$1')
}

straightInput.addEventListener('input', (event) => {
   event.target.value = event.target.value.replace(/[^0-9.,]/g, '').replace(/,/g, '.').replace(/(\..*)\./g, '$1')
   straight()
   event.target.value = numberMask(event.target.value)
})
backInput.addEventListener('input', (event) => {
   event.target.value = event.target.value.replace(/[^0-9.,]/g, '').replace(/,/g, '.').replace(/(\..*)\./g, '$1')    
   back()
   event.target.value = numberMask(event.target.value)    
})
