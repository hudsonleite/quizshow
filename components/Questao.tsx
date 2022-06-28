import QuestaoModel from "../model/questao";
import styles from "../styles/Questao.module.css"
import Enunciado from "./Enunciado";
import Resposta from "./Resposta";
import Temporizador from "./Temporizador";

const letras = [
    {valor: 'A', cor: '#F2C866'},
    {valor: 'B', cor: '#F266BA'},
    {valor: 'C', cor: '#85D4F2'},
    {valor: 'D', cor: '#BCE596'},
]

interface QuestaoProps {
    valor: QuestaoModel
    tempoPraResposta?: number
    respostaFornecida: (index: number) => void
    tempoEsgotado: () => void
}

export default function Questao(props: QuestaoProps) {
    const questao = props.valor

    function renderizarResposta() {
        return questao.respostas.map((resp, i) => {
            return <Resposta 
                key={i}
                valor={resp}
                indice={i}
                letra={letras[i].valor}
                corFundoLetra={letras[i].cor}
                respostaFornecida={props.respostaFornecida}
            />
        })
    }
    return (
        <div className={styles.Questao}>
            <Enunciado texto={questao.enunciado}/>
            <Temporizador duracao={props.tempoPraResposta ?? 10} 
                tempoEsgotado={props.tempoEsgotado}/>
            {renderizarResposta()}
        </div>
    )
}