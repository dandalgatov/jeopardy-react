import { fetchCategories, fetchClues } from './apiConfig'

const createBoard = async (setBoard, offset) => {
    const randomCategories = await fetchCategories(offset)
    const categories = randomCategories.map(async category => {

        const clues =[]
        const cluesArray = await fetchClues(category.id)
        for (let i = 0; i < 5; i++) {
            clues.push({
                question: cluesArray[i].question.toUpperCase(),
                answer: cluesArray[i].answer.toUpperCase()
            })
        }
        return {
            title: category.title.toUpperCase(),
            clues: clues
        }
    })
    Promise.all(categories).then(result =>  {
        const board1=result.slice(0,6)
        const board2 = result.slice(6, 12)
        const board3 = result.slice(12, 13)
        setBoard( [board1,board2,board3] )})
}

export default createBoard
