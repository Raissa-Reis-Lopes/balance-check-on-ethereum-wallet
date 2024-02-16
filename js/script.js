
const apiKey = 'CSJ9Y7KVPKI5XVRWAEXVJFIC9JS3AZ5SCK'; 
const button = document.querySelector("button");
const result = document.getElementById("result");

button.addEventListener("click", function(){
    result.innerHTML="";

    const address = document.getElementById("address").value;
   
    

    //Fui procurar um regex para verificar se o endereço é válido pois ele é um alfanumérico de 40 dígitos

    // Verifica se o endereço tem o formato válido de um endereço Ethereum
    const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(address);

    if (isValidAddress) {

        const apiUrl = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`;

        fetch(apiUrl)
        .then(response => response.json())   //Ficaria aqui no primeiro com o 200
        .then(data => {   
        //Se o status for 1 ele foi bem sucedido,pelo que entendi é como aquele 200 "ok" mas aqui eles usam assim
        if (data.status === '1') {
            console.log(data);
            console.log(data.status);
        const balanceWei = data.result;

        //O saldo vem em wei então fui pesquisar como converter de wei para eth e achei essa conversão
 
        // Para converter o saldo da carteira Ethereum de wei para Ether, você precisa dividir o saldo em wei pelo valor 1e18. Isso ocorre porque 1 Ether é equivalente a 1e18 wei 
        const balanceEth = balanceWei / 1e18;

        console.log(`Saldo da carteira ${address}: ${balanceEth} eth`);

        result.innerHTML = `<span class="message"> O seu saldo é de: </span> <span class="balance">${balanceEth} eth</span>`
    } else {
        result.innerHTML = `<span class="warning"> Erro na solicitação: ${data.message} </span>`
    }
    })
    .catch(error => {
        result.innerHTML = `<span class="warning"> Erro na solicitação: ${error} </span>`
    });
    } else{
        result.innerHTML = `<span class="warning"> Digite uma carteira válida </span>`
    }
 
    
})




