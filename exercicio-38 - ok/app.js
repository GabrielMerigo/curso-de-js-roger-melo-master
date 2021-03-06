/*
  01

  - Crie um objeto com um método getColor. Este método deve retornar o valor da
    propriedade 'color' dos objetos descritos abaixo;
  - Crie 2 novos objetos que representem dois carros. Na criação dos objetos, 
    faça o objeto com o método getColor ser prototype desses dois carros;
  - Após criar os carros, crie neles as propriedades 'color'. Atribua valores 
    diferentes para a propriedade color de cada carro;
  - Teste o método getColor do prototype dos carros.
*/

const carProto = {
  getColor() {
    return this.color
  }
}


const sandero = Object.create(carProto)
sandero.color = 'azul'

// console.log(sandero.getColor());


// class Obj {
//   getColor () {
//     return this.color
//   }
// }

// class Car extends Obj {
//   constructor (color) {
//     super(color)
//     this.color = color
//   }
// }



// const car = new Car('Amarelo')
// console.log(car.getColor());

/*
  02

  - No código abaixo, a invocação da função 'getSummary' está retornando 
    "undefined foi dirigido por undefined e tem undefined no papel principal.";
  - Faça a invocação da função retornar a string com os valores esperados 
    (ao invés de undefined's);
  - Não modifique o objeto 'movie' e a declaração da função 'getSummary';
  - Após fazer o código funcionar, você pode refatorar a declaração da função, 
    se necessário.
*/

const movie = {
  title: 'Forrest Gump',
  director: 'Robert Zemeckis',
  starringRole: 'Tom Hanks'
}

function getSummary() {
  const { title, director, starringRole } = this
  return `${title} foi dirigido por ${director} e tem ${starringRole} no papel principal.`
}

// console.log(getSummary.call(movie));
/*
  03

  - A invocação da função abaixo deve retornar este objeto:
    {
      prop1: 'value1',
      prop2: 'value2',
      prop3: 'value3' 
    }
  - Descomente o código e crie a função.
*/

const createObj = (acc, [key, value]) => {
  acc[key] = value
  return acc
}

const arrayToObj = array => array.reduce(createObj, {})

// console.log(
//   arrayToObj([
//     ['prop1', 'value1'],
//     ['prop2', 'value2'],
//     ['prop3', 'value3']
//   ])
// )


/*
  04

  - Refatore as classes abaixo para factory functions.
*/

// const formatTimeUnits = units => units
//   .map(unit => unit < 10 ? `0${unit}` : unit)


const formatTimeUnits = (units) => {
  const validadeIfUnitIsBiggerThen10 = unit => unit < 10 ? `0${unit}` : unit
  return units.map(validadeIfUnitIsBiggerThen10)
}


const getTime = () => {
  const date = new Date()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  return [hours, minutes, seconds]
}

const getFormattedTime = template => {
  const [hours, minutes, seconds] = getTime()
  const formattedTime = formatTimeUnits([hours, minutes, seconds])
  const getTimeAsArray = (_, index) => formattedTime[index];

  return template
    .split(':')
    .map(getTimeAsArray)
    .join(':')
}

const makeClock = ({ template }) => ({
  template,
  render() {
    const formattedTime = getFormattedTime(this.template)
    console.log(formattedTime);
  },
  stop() {
    clearInterval(this.timer)
  }
})

const makeExtendedClock = ({ template, precision }) => ({
  precision,
  ...makeClock({ template }),
  start() {
    this.render()
    this.timer = setInterval(() => this.render(), this.precision)
  }
})


const clock = makeExtendedClock({ template: 'h:m:s', precision: 1000 })
// clock.start()



// clock.start()

// class ExtendedClock extends Clock {
//   constructor (options) {
//     super(options)

//     const { precision = 1000 } = options
//     this.precision = precision
//   }

//   start () {
//     this.render()
//     this.timer = setInterval(() => this.render(), this.precision)
//   }
// }

// const clock = new ExtendedClock({ template: 'h:m:s', precision: 1000 })


/*
  05

  - No index.html, descomente:
    - A div com a classe "container" que contém uma tabela e um botão;
    - A tag link (no head) que carrega os estilos CSS do Bootstrap.
  - Seu desafio neste exercício é exportar as células da tabela HTML para um
    arquivo CSV que pode ser aberto no Excel ou Google Planilhas;

  Passo a passo para alcançar este resultado
    - Quando um click no botão "Exportar para CSV" acontecer, faça o seguinte:
      - Gere um array com todas as referências dos elementos <tr> da tabela;
      - À partir do array de referências das <tr>, gere uma string CSV:
        - Uma string CSV contém, em cada linha, separados por vírgula, o
          conteúdo textual de uma célula da <tr> (seja a célula um <th> ou
          <td>). Ou seja, a string CSV deve ter a formatação abaixo, incluindo
          as quebras de linha:

          #,Jogo do Ano,Desenvolvedora,Data da premiação
          1,The Last of Us Part II,Naughty Dog,10 de dezembro de 2020
          2,Sekiro: Shadows Die Twice,FromSoftware,12 de dezembro de 2019
          3,God of War,SIE Santa Monica Studio,6 de dezembro de 2018
          4,The Legend of Zelda: Breath...,Nintendo...,7 de dezembro de 2017
          5,Overwatch,Blizzard Entertainment,1 de dezembro de 2016

        - Dicas:
          - O elemento <tr> contém uma propriedade 'cells'.
          - Para quebrar linha, você pode usar dentro da string o caractere
            especial '\n';
          - É possível gerar a string usando o método reduce. Porém, neste caso,
            o código fica mais legível (e menos complicado) com o map.
      - Após gerar a string CSV, insira 2 atributos no botão:
        - href, com o valor
          `data:text/csvcharset=utf-8,${encodeURIComponent(SUA_STRING_CSV)}`.
          encodeURIComponent é um método do window que precisa receber a string
          CSV que você criou;
        - download, com o valor 'table.csv'.
*/
// const btnExportCSV = document.querySelector('[data-js="export-table-btn"]')

// const setCSVDownload = CSV => {
//   const CSVURI = `data:text/csvcharset=utf-8,${encodeURIComponent(CSV)}`

//   btnExportCSV.setAttribute(
//     'href',
//     CSVURI
//   )
//   btnExportCSV.download = 'table.csv'
// }

// const generateCSVFile = () => {
//   const tableRows = Array.from(document.querySelectorAll('tr'))
//   let CSV = '';
//   const iterableForArray = tr => {
//     let arrayElements = Array.from(tr.cells)

//     const iterateThroughItemsTheseArrays = (item, index, array) => {
//       const lastItemArray = index === array.length - 1;
//       const itemArray = item.textContent;
//       const verifyIfLastItem = lastItemArray ? `${itemArray}\n` : `${itemArray},`
//       CSV += verifyIfLastItem
//     }

//     arrayElements.map(iterateThroughItemsTheseArrays)
//   }

//   setCSVDownload(CSV)

//   tableRows.forEach(iterableForArray)
// }

// btnExportCSV.addEventListener('click', generateCSVFile)

/*
  06

  - Na Weather Application, refatore para uma factory function o código que
    executa os requests e obtém as informações do clima da cidade;
  - Se ao fazer o request, uma mensagem "Access to fetch at 'http://...' from
    origin 'http://...'"... for exibida no console, crie uma nova app na
    plataforma da accuweather e pegue uma nova chave:
    https://developer.accuweather.com/;
  - O procedimento é o mesmo mostrado nas aulas da etapa em que construímos essa
    aplicação.
*/



/*
  07

  - No index.html, comente a div com a classe "container" que contém a tabela;
  - Descomente:
    - A <div> com a classe "container" abaixo da div que você acabou de
      comentar;
    - A <link> que importa o style.css;
  - Construa uma aplicação de conversão de conversão de moedas. O HTML e CSS
    são os que você está vendo no browser (após salvar os arquivos);
  - Você poderá modificar a marcação e estilos da aplicação depois. No momento,
    concentre-se em executar o que descreverei abaixo;
    - Quando a página for carregada:
      - Popule os <select> com tags <option> que contém as moedas que podem ser
        convertidas. "BRL" para real brasileiro, "EUR" para euro, "USD" para
        dollar dos Estados Unidos, etc.
      - O option selecionado por padrão no 1º <select> deve ser "USD" e o option
        no 2º <select> deve ser "BRL";
      - O parágrafo com data-js="converted-value" deve exibir o resultado da
        conversão de 1 USD para 1 BRL;
      - Quando um novo número for inserido no input com
        data-js="currency-one-times", o parágrafo do item acima deve atualizar
        seu valor;
      - O parágrafo com data-js="conversion-precision" deve conter a conversão
        apenas x1. Exemplo: 1 USD = 5.0615 BRL;
      - O conteúdo do parágrafo do item acima deve ser atualizado à cada
        mudança nos selects;
      - O conteúdo do parágrafo data-js="converted-value" deve ser atualizado à
        cada mudança nos selects e/ou no input com data-js="currency-one-times";
      - Para que o valor contido no parágrafo do item acima não tenha mais de
        dois dígitos após o ponto, você pode usar o método toFixed:
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
    - Para obter as moedas com os valores já convertidos, use a Exchange rate
      API: https://www.exchangerate-api.com/;
      - Para obter a key e fazer requests, você terá que fazer login e escolher
        o plano free. Seus dados de cartão de crédito não serão solicitados.
*/

const selectOneEl = document.querySelector('[data-js="currency-one"]');
const selectTwoEl = document.querySelector('[data-js="currency-two"]');
const convertedValue = document.querySelector('[data-js="converted-value"]');
const precision = document.querySelector('[data-js="conversion-precision"]')
const input = document.querySelector('[data-js="currency-one-times"]')
const currenciesContainer = document.
  querySelector('[data-js="currencies-container"]')

const showAlert = err => {
  const div = document.createElement('div')
  const button = document.createElement('button')

  div.textContent = err.message
  div.classList.add('alert', 'alert-warning', 'alert-dismissible', 'fade', 'show')
  div.setAttribute('role', 'alert')

  button.classList.add('btn-close')
  button.setAttribute('type', 'button')
  button.setAttribute('aria-label', 'Close')

  const removeAlert = () => div.remove()
  button.addEventListener('click', removeAlert)

  div.appendChild(button)

  currenciesContainer.insertAdjacentElement('afterend', div)
}

const state = (() => {
  let exchangeRate = {}
  return {
    getExchangeRate: () => exchangeRate,
    setExchangeRate: newExchangeRate => {
      if (!newExchangeRate.conversion_rates) {
        showAlert(
          { message: 'O objeto precisa ter uma propriedade convertion_rates.' }
        );
        return
      }

      exchangeRate = newExchangeRate
      return exchangeRate
    }
  }
})()

const APIKey = 'd6bb5c15a71d91efbeed0f95';

const fetchCoin = value =>
  fetch(`https://v6.exchangerate-api.com/v6/${APIKey}/latest/${value}`)

const getErrorMessage = errorType => ({
  'unsupported-code': 'O tipo de moeda é inválido.',
  'malformed-request': 'A estrutura do request está inválida.',
  'invalid-key': 'A sua API KEY não é válida.',
  'inactive-account': 'Seu e-mail não foi confirmado.',
  'quota-reached': 'Você atingiu o limite de solicitações pelo seu plano.'
})[errorType] || 'Não foi possível obter os dados'

const getCoin = async typeCoin => {
  try {
    const response = await fetchCoin(typeCoin);
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Sua conexão falhou. Não foi possível obter essas informações.')
    }

    if (data.result === 'error') {
      const errorMessage = getErrorMessage(data['error-type']);
      throw new Error(errorMessage)
    }

    return data
  } catch (err) {
    showAlert(err)
  }
}

const getInitialOptions = (conversion_rates) => {
  const getOptions = selectedCurrency =>
    Object.keys(conversion_rates)
      .map(moeda => `<option ${moeda === selectedCurrency ? 'selected' : ''}>${moeda}</option>`)
      .join('')
  return getOptions
}

const showInitialInfo = (conversion_rates, getOptions) => {
  selectOneEl.innerHTML = getOptions('USD')
  selectTwoEl.innerHTML = getOptions('BRL')
  convertedValue.textContent = conversion_rates.BRL.toFixed(2)
  precision.textContent = `1 USD = ${conversion_rates.BRL} BRL`
}

const init = async () => {
  const getExchangeRate = await getCoin('USD');
  const exchangeRate = state.setExchangeRate(getExchangeRate)

  if (exchangeRate && exchangeRate.conversion_rates.USD) {
    showInitialInfo(exchangeRate.conversion_rates,
      getInitialOptions(exchangeRate.conversion_rates)
    )
  }
}

const getMultipliedExchangeRate = conversion_rates => {
  const currencyTwo = conversion_rates[selectTwoEl.value];
  return (input.value * currencyTwo).toFixed(2)
}

const getNotRoundedExchangeRate = conversion_rates => {
  const currencyTwo = conversion_rates[selectTwoEl.value];
  return `1 ${selectOneEl.value} = ${currencyTwo.toFixed(2)} ${selectTwoEl.value}`
}

const showUptadedRate = ({ conversion_rates }) => {
  convertedValue.textContent = getMultipliedExchangeRate(conversion_rates)
  precision.textContent = getNotRoundedExchangeRate(conversion_rates)
}

const handleCurrencyOneElInput = async e => {
  const getTypeExchangeRate = await getCoin(e.target.value)
  const exchangeRate = state.setExchangeRate(getTypeExchangeRate)

  showUptadedRate(exchangeRate)
}

const handleCurrencyTwoElInput = async () => {
  const exchangeRate = state.getExchangeRate()
  showUptadedRate(exchangeRate)
}

const mudancaNoInput = () => {
  const { conversion_rates } = state.getExchangeRate()
  convertedValue.textContent = getMultipliedExchangeRate(conversion_rates)
}

selectOneEl.addEventListener('input', handleCurrencyOneElInput)
selectTwoEl.addEventListener('input', handleCurrencyTwoElInput)
input.addEventListener('input', mudancaNoInput)

init()


