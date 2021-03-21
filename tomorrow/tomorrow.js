const hourlys = document.querySelectorAll('.hour');
hourlys.forEach(hour =>{
  hour.addEventListener('pointerenter', () =>{
    hour.classList.add('poop');
  })
})
hourlys.forEach(hour =>{
  hour.addEventListener('pointerleave', () =>{
    hour.classList.remove('poop');
  })
})