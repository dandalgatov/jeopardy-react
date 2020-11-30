import axios from 'axios'

const URL = "https://jservice.io/api/"
const CATEGORIES_URL = URL + "categories?count=13&offset="
const CLUES_URL = URL + "clues?category="
const RAND_URL = URL + "random?count=100"



export const fetchCategories = async (offset) => {
    try {
        const response = await axios.get(CATEGORIES_URL + offset)
        return response.data
    } catch (error) {
        throw error
    }
}

export const fetchClues = async (category_id) => {
    try {
        const response = await axios.get(CLUES_URL + category_id)
        return response.data
    } catch (error) {
        throw error
    }
}


export const fetchRand = async (setRandomAnswers) => {
    try {
        const response = await makeGetRequest()
        const answerArray = response.map(item => item.answer)
        return answerArray
    } catch (error) {
        throw error
    }
}

function makeGetRequest() {
    return new Promise(function (resolve, reject) {
        axios.get(RAND_URL).then(
            (response) => {
                const result = response.data;
                resolve(result);
            },
                (error) => {
                reject(error);
            }
        );
    });
}
