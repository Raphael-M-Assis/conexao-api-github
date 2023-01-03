// As funcionalidades deverão ser implementadas neste arquivo
let input = $('.form-control');
let button = $('.btn-primary');

function hideInformation(){
    $('#profile-info').hide(); 
    $('#info').hide(); 
    $('.text-danger').hide(); 
    $('.information').hide(); 
}

$(function initialize(){
    hideInformation()
})

$(function keyboardCapture(){
    input.keypress(function(key){
                
        if(key.originalEvent.key === 'Enter'){

            fetchApi(input.val());
            input.val('');
        }        
    }); 
});

$(function buttonCapture(){
    button.click(function(){

        fetchApi(input.val());
        input.val('');    

    }); 
});

function fetchApi(user){

    //Mostrando a mensagem de "Aguarde"
    $('#info').show(); 

    let url = 'https://api.github.com/users/' + user;

    fetch(url, {
        method: 'GET',
        })
        .then(response => {
            
            response.json()
                .then(data => {
                    constructPage(data);
                })
                .catch(e => {
                    console.log(e); 
                    $('.text-danger').show(); 
                })
        
        })
        .catch(e => {
            console.log(e);
            $('.text-danger').show(); 
        }
    )

    hideInformation();
};

function constructPage(data){
    
    $('.img-thumbnail').attr('src', data.avatar_url)

    $('#name').text(data.name)
    $('#login').text(data.login)
    $('#url').text(data.html_url)
    $('#location').text(data.location)
    $('#public-repos').text(data.public_repos)

    let dataCriacao = data.created_at.split('T')[0]
    dataCriacao = dataCriacao.split('-').reverse().join('/');

    let dataUpdate = data.updated_at.split('T')[0]    
    dataUpdate = dataUpdate.split('-').reverse().join('/');
    
    $('#created-at').text(dataCriacao)
    $('#updated-at').text(dataUpdate)

    //Escondendo a mensagem de "Aguarde"
    $('#info').hide(); 
    $('.information').show();
    $('#profile-info').show();
}