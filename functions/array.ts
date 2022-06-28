export function arrayEmbaralhar(elementos: any[]): any[] {
    return elementos.map(value => ({value, sort: Math.random()})) //Gerando um novo Array {Value, Sort}
                    .sort((obj1, obj2) => obj1.sort - obj2.sort) //Ordenando o Novo Array pela coluna sort
                    .map(({value}) => value) //retornando o array com a coluna value apenas   
}