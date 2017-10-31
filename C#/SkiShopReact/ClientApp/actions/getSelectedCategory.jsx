export const GET_SELECTEDCATEGORY = "GET_SELECTEDCATEGORY";

const getSelectedCategory = (category = '') => {
    return {
        type: GET_SELECTEDCATEGORY,
        category
    }
}

export default getSelectedCategory;