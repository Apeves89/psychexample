function openModal(){
    document.getElementById('pfo').style.display = 'flex'
}
function closeModal(){
    document.getElementById('pfo').style.display = 'none'
}

const btn = document.getElementById('addProvider')
btn.addEventListener('click',openModal)

const form = document.getElementById('providerForm')
// form.addEventListener('submit', closeModal)