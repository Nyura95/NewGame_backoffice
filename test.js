const obj = {id: ''}

const test = { id2: [] }



console.log(Object.keys({ ...obj, ...test }).reduce((accumulator, key) => ({...accumulator, [key]: ''})))