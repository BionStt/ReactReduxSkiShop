import { connect } from 'react-redux';

import StylesByCategory from '../StylesByCategory';

const findCategoryDetail = (detailList, category) => {
    let index = detailList.findIndex(detail => detail.category === category);
    return index > -1 ? detailList[index].styles.slice() : [];
}

const getCategoryList = (detailList) => {
    let categories = [];
    detailList.map(detail => categories.push(detail.category));
    return categories;
}

const mapStateToProps = (state, ownProps) => {
    return {
        styles: findCategoryDetail(state.categoryDetail, ownProps.category),
        categoryList: getCategoryList(state.categoryDetail)
}
};

const StylesByCategoryCtn = connect(mapStateToProps)(StylesByCategory);

export default StylesByCategoryCtn;
