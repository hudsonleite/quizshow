import { useEffect, useState } from 'react'
import Questionario from '../components/Questionario'
import QuestaoModel from '../model/questao'
import RespostaModel from '../model/resposta'

const questaoMock = new QuestaoModel(500,'Qual a Melhor cor?', [
  RespostaModel.errada('Verde'),
  RespostaModel.errada('Amarela'),
  RespostaModel.errada('Azul'),
  RespostaModel.certa('Preta'),
], false)

const BASE_URL = 'http://localhost:3000/api'

export default function Home() {
  const [idsDasQuestoes, setIdsDasQuestoes] = useState<number[]>([])
  const [questao, setQuestao] = useState<QuestaoModel>(questaoMock)

  // Carregamento de todos os id de questão Não condicionado a nenhum argumento
  useEffect(() => {
    console.log("useEffect sendo executado mais de uma vez")
    carregarIdsDasQuestoes()   
  }, []);  

  async function carregarIdsDasQuestoes() {
     const resp = await fetch(`${BASE_URL}/questionario`)
     const idsDasQuestoesLocal = await resp.json()
    //  console.log(idsDasQuestoesLocal)
     setIdsDasQuestoes(idsDasQuestoesLocal)
  }

  async function CarregarQuestao(idQuestao: number) {
     const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`)
     const jsonQuestao = await resp.json()
     const novaQuestao = QuestaoModel.criarUsandoObjeto(jsonQuestao);
    //  console.log(QuestaoModel.criarUsandoOjecto(jsonQuestao))         
     setQuestao(novaQuestao) 
  }
  // Carregamento de todos de questão Sendo Condicionado ao idQuestao existir
  useEffect(() => {
      idsDasQuestoes.length > 0 && CarregarQuestao(idsDasQuestoes[0])
    }, [idsDasQuestoes.length > 0])  

  function questaoRespondida(questaoRespondida: QuestaoModel) {
    setQuestao(questaoRespondida)
  }

  function irPraProximoPasso() {

  }

  return (
    <Questionario
        questao={questao}
        ultimaQuestao={false}
        questaoRespondida={questaoRespondida}
        irPraProximoPasso={irPraProximoPasso}
    />  
  )
}
