import questoes from '../bdQuestao';

export default(req, res) => {
    const idSelecionado = +req.query.id
    const questao = questoes.filter(questao => questao.id === idSelecionado)
    if (questao.length === 1) {
        const questaoSelecioada = questao[0].embaralharResposta()
        const obj = questaoSelecioada.paraObjeto()
        res.status(200).json( obj )
    } else {
        res.status(204).json()
    }
}