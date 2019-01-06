import { ADD_ARTICLE } from "../constants/action-types.js"

export function addArticle(payload) {
    return {type: ADD_ARTICLE, payload}
};