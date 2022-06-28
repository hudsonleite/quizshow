import styles from '../styles/Questionario.module.css'
import QuestaoModel from "../model/questao"
import Questao from './Questao'
import Botao from './botao'

interface QuestionarioProps {
    questao: QuestaoModel
    ultimaQuestao: boolean
    questaoRespondida: (questao: QuestaoModel) => void
    irPraProximoPasso: () => void
}

export default function Questionario(props: QuestionarioProps) {
    
    function respostaFornecida(indice: number) {
        console.log(indice)
        if(props.questao.naoRespondida) {
            props.questaoRespondida(props.questao.responderCom(indice))
        }
    }

    return (
        <div className={styles.questionario}>
            {props.questao ? 
                <Questao 
                    valor={props.questao}
                    tempoPraResposta={6}
                    respostaFornecida={respostaFornecida}
                    tempoEsgotado={props.irPraProximoPasso}
                /> : false
            }
            <Botao 
                texto={props.ultimaQuestao ? 'Finalizar': 'Próxima'}
                onClick={props.irPraProximoPasso}/>
        </div>
    )
}