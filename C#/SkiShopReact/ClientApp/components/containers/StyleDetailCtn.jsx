import { connect } from 'react-redux';

import StyleDetail from '../StyleDetail';

const mapStateToProps = (state) => {
    return {
        detail: state.styleDetail
        }
    };

const StyleDetailCtn = connect(mapStateToProps)(StyleDetail);

export default StyleDetailCtn;


