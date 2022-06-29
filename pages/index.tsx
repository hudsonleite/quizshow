import { useEffect, useState } from 'react'
import Questionario from '../components/Questionario'
import QuestaoModel from '../model/questao'
import { useRouter } from '../node_modules/next/router'

const BASE_URL = 'http://localhost:3000/api'

export default function Home() {
  const router = useRouter()

  const [idsDasQuestoes, setIdsDasQuestoes] = useState<number[]>([])
  const [questao, setQuestao] = useState<QuestaoModel>()
  const [qtdeRespostaCertas, setqtdeRespostaCertas] = useState<number>(0)

  // Carregamento de todos os id de questão Não condicionado a nenhum argumento
  useEffect(() => {
    carregarIdsDasQuestoes()   
  }, []);  

  async function carregarIdsDasQuestoes() {
     const resp = await fetch(`${BASE_URL}/questionario`)
     const idsDasQuestoesLocal = await resp.json()
     setIdsDasQuestoes(idsDasQuestoesLocal)
  }

  async function CarregarQuestao(idQuestao: number) {
     const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`)
     const jsonQuestao = await resp.json()
     const novaQuestao = QuestaoModel.criarUsandoObjeto(jsonQuestao);         
     setQuestao(novaQuestao) 
  }

  // Carregamento de todos de questão Sendo Condicionado ao idQuestao existir
  useEffect(() => {
      idsDasQuestoes.length > 0 && CarregarQuestao(idsDasQuestoes[0])  
  }, [idsDasQuestoes.length > 0])  

  function questaoRespondida(questaoRespondida: QuestaoModel) {
    setQuestao(questaoRespondida)
    const acertouResposta = questaoRespondida.acertou;
    setqtdeRespostaCertas(qtdeRespostaCertas + (acertouResposta ? 1 : 0 ))
  }
  function ProximoIDPergunta() {
      if (questao) {
        //Localizar o proximo index das Questões
        const proxIndex = idsDasQuestoes.indexOf(questao.id) + 1     
        //Localizar o proximo id das Questões
        return idsDasQuestoes[proxIndex]    
      }
  }
  function irPraProximoPasso() {
      const proxId = ProximoIDPergunta()
      proxId ? CarregarQuestao(proxId) : Finalizar()
  }

  function Finalizar() {
    router.push({
      pathname: "/resultado",
      query: {
         qtdTotal: idsDasQuestoes.length,
         qtdCertas: qtdeRespostaCertas
      }
    })
  }

  return (
    <Questionario
        questao={questao}
        ultimaQuestao={ProximoIDPergunta() === undefined}
        questaoRespondida={questaoRespondida}
        irPraProximoPasso={irPraProximoPasso}
    />  
  )
}
