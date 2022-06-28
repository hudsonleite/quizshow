import { arrayEmbaralhar } from "../../../functions/array"
import questoes from "../bdQuestao"

export default (req, res) => {
    const arrayQuestao = arrayEmbaralhar(questoes.map(questao => questao.id));
    res.status(200).json(arrayQuestao)
}