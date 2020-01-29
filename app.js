/* ================ INICIO DO APP ============= */

/*  Objeto Despesa */
	
	class Despesa {
		constructor(ano,mes,dia,tipo,descricao,valor){
			this.ano = ano
			this.mes = mes
			this.dia = dia
			this.tipo = tipo
			this.descricao = descricao
			this.valor = valor
		}
		validarDados(){

			for(let i in this){
				if (this[i] == undefined || this[i] == '' || this[i] == null) {
					return false
				}
			}
			return true

		}
	}

	// Objeto BD - Local Storage
	class Bd{

		constructor(){
			let id = localStorage.getItem('id')
			if (id === null) {

				localStorage.setItem('id', 0)
			}
		}

		getProximoId() {
			let proximoId = localStorage.getItem('id')
			 return (parseInt(proximoId) + 1) 
		}
		gravar(d){
			let id = this.getProximoId()
			localStorage.setItem('id',id)
			localStorage.setItem(id, JSON.stringify(d)) // 2 parâmetros ( nome do objeto) (JSON)

		}

		recuperarTodosRegistros(){
		// Array de despesas 	
		let despesas = Array()	

		let id = localStorage.getItem('id')

		// Recuperar todas as despesas cadastradas em LocalStorage	
		  for(let i = 1; i <= id; i++){

		  	// Recuperar despesa
		  	let despesa = JSON.parse(localStorage.getItem(i))

		  	//existe a possibilidade de haver indices que foram pulados/removidos
		  	// nestes casos vamos pular esses indices.
		  	if (despesa === null) {
		  		continue
		  	}

		  	despesas.push(despesa)

		  	
		  }
		  return despesas
		}

		pesquisar(despesa){
			let despesasFiltradas = Array()
			despesasFiltradas =  this.recuperarTodosRegistros()
			console.log(despesasFiltradas)


			//ano
			   if (despesa.ano != '') {	
			   console.log('Filtro de ano')		
			   despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano )
			   }		
			//mes
				if (despesa.mes != '') {			
			   despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes )
			   }		

			// dia
				if (despesa.dia != '') {			
			   despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia )
			   }		
			//tipo
				if (despesa.tipo != '') {			
			   despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo )
			   }		
			//descricao
				if (despesa.descricao != '') {			
			   despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao )
			   }		

			//valor
				if (despesa.valor != '') {			
			   despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor )
			   }

			   return despesasFiltradas		 

		}
	}

	let bd = new Bd()

function cadastrarDespesa(){
	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')

	let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value,valor.value)
	
	if (despesa.validarDados()) {
		bd.gravar(despesa)

		

		//Incluindo Modal de Forma programática
		document.getElementById('modal_color_titulo').className = "modal-header text-success"
		document.getElementById('modal_conteudo').innerHTML = 'Registro efetuado com sucesso'
		document.getElementById('conteudo_modal').innerHTML = 'Dados da despesa cadastrados com sucesso'
		document.getElementById('modal_btn').className = "btn btn-success"
		document.getElementById('modal_btn').innerHTML = 'Voltar'

		$('#modalGravarDespesa').modal('show')

		//Lógica para limpar os campos após a gravação
		ano.value = ''
		mes.value = ''
		dia.value = ''
		tipo.value = ''
		descricao.value = ''
		valor.value = ''

	} else {
		//Incluindo Modal de Forma programática
		document.getElementById('modal_color_titulo').className = "modal-header text-danger"
		document.getElementById('modal_conteudo').innerHTML = 'Houve um erro na gravação dos dados'
		document.getElementById('conteudo_modal').innerHTML = 'Existem campos que precisam ser preenchidos'
		document.getElementById('modal_btn').className = "btn btn-danger"
		document.getElementById('modal_btn').innerHTML = 'Voltar e Corrigir'

		$('#modalGravarDespesa').modal('show')
	}

}


	function carregaListaDespesas(despesas = Array()){
	   if (despesas.length == 0) {
	   despesas = bd.recuperarTodosRegistros()
	   }

	   let listaDespesas = document.getElementById('listaDespesas')
	   listaDespesas.innerHTML = ''


	   despesas.forEach(function(d) {

		let linha = listaDespesas.insertRow()

		linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
		

		switch(d.tipo){
			case '1' : d.tipo = 'Alimentação'
				break
			case '2' : d.tipo = 'Educação'
				break
			case '3' : d.tipo = 'Lazer'
				break
			case '4' : d.tipo = 'Saúde'
				break
			case '5' : d.tipo = 'Transporte'
				break
		}

		linha.insertCell(1).innerHTML = d.tipo
		linha.insertCell(2).innerHTML = d.descricao
		linha.insertCell(3).innerHTML = d.valor

	   })
	}

	function pesquisarDespesas(){
		let ano = document.getElementById('ano').value 
		let mes = document.getElementById('mes').value 
		let dia = document.getElementById('dia').value 
		let tipo = document.getElementById('tipo').value 
		let descricao = document.getElementById('descricao').value 
		let valor = document.getElementById('valor').value 

		let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

		let despesas = bd.pesquisar(despesa)

		this.carregaListaDespesas(despesas)
	}

	

