import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { stringify } from 'qs';
import { Button, ButtonGroup } from 'reactstrap'

import { getCategoryDetailAsync } from '../actions/getCategoryDetail';
import StylesByCategory2Ctn from './containers/StylesByCategory2Ctn';
import getSelectedCategory from '../actions/getSelectedCategory';
import PageBtnGroup from './PageBtnGroup';

const itemsPerPage = 6;

class StylesByCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            skiArray: this.getInitial(this.props.styles, this.props.sort,
                this.props.filterGender, this.props.filterIdealFor,
                this.props.selectedPage),
            pages: this.getPages(this.getStylesFiltered(this.props.styles,
                this.props.filterGender, this.props.filterIdealFor)), 
            genders: this.getGenders(this.props.styles),
            idealFors: this.getIdealFors(this.props.styles),
            genderSelectd: this.getSelected(this.props.filterGender), 
            idealForSelected: this.getSelected(this.props.filterIdealFor)
        }

        this.onGenderSelected = this.onGenderSelected.bind(this);
        this.onIdealForSelected = this.onIdealForSelected.bind(this);
    }

    getInitial(styleArray, sort, genders, idealFors, page) {
        if (styleArray.length > 0) {
            return this.processStyles(styleArray, sort, genders, idealFors, page);
        }
        return [];
    }

    getPages(styleArray) {
        let length = styleArray.length;
        if (length > 0) {
            let pages = [];
            for (let i = 0; i <= length / itemsPerPage; i++) {
                pages.push(i+1);
            }
            return pages;
        }
        return [];
    }

    getGenders(styleArray) {
        if (styleArray.length > 0) {
            let scorer = {
                "Men's": 0, "Women's": 1, "Unisex": 2,
                "Kids' - Children": 3, "Kids' - Children to Youths": 4,
                "Kids' - Youths": 5
            }

            return styleArray.map(s => s.gender)
                .filter((c, index, array) => array.indexOf(c) === index)
                .sort((a, b) => {
                    return scorer[a] - scorer[b];
                }).slice();
        }
        return [];
    }

    getIdealFors(styleArray) {
        if (styleArray.length > 0) {
            let list = [];
            styleArray.map(s => {
                s.idealFors.map(i => {
                    list.push(i);
                });
            });

            return list.filter((c, index, array) => array.indexOf(c) === index)
                .sort().slice();
        }
        return [];
    }

    getSelected (stringList) {
        if (stringList !== undefined && stringList !== null && stringList.length > 0) {
            let list = stringList.slice();
            return list;
        }
        return [];
    }

    onGenderSelected(selected) {
        const index = this.state.genderSelectd.indexOf(selected);
        if (index < 0) {
            this.state.genderSelectd.push(selected);
        } else {
            this.state.genderSelectd.splice(index, 1);
        }
        this.setState({
            genderSelectd: [...this.state.genderSelectd]
        });
    }

    onIdealForSelected(selected) {
        const index = this.state.idealForSelected.indexOf(selected);
        if (index < 0) {
            this.state.idealForSelected.push(selected);
        } else {
            this.state.idealForSelected.splice(index, 1);
        }
        this.setState({
            idealForSelected: [...this.state.idealForSelected]
        });
    }

    componentDidMount() {
        const { dispatch, category } = this.props;
        if (this.props.styles.length < 1) {
            //console.log('updateing from didMount');

            dispatch(getCategoryDetailAsync(category))
                .then(() => {
                    dispatch(getSelectedCategory(category));
                    this.setState({
                        skiArray: this.processStyles(this.props.styles,
                            this.props.sort, this.props.filterGender,
                            this.props.filterIdealFor, this.props.selectedPage),
                        pages: this.getPages(this.getStylesFiltered(this.props.styles,
                            this.props.filterGender, this.props.filterIdealFor)),
                        genders: this.getGenders(this.props.styles),
                        idealFors: this.getIdealFors(this.props.styles)
                });
                });
        } else {
            dispatch(getSelectedCategory(category));
        }
    }

    componentWillReceiveProps(nextProps) {
        const { dispatch } = this.props;
        //console.log('updating from willReceiveProps');
        if (nextProps.category !== this.props.category) {
            dispatch(getSelectedCategory(nextProps.category));
            if (this.props.categoryList.findIndex(category => category === nextProps.category) > -1) {
                //console.log('updating state by fecthing from the store');
                this.setState({
                    skiArray: this.processStyles(nextProps.styles, nextProps.sort,
                        nextProps.filterGender, nextProps.filterIdealFor,
                        nextProps.selectedPage),
                    pages: this.getPages(this.getStylesFiltered(nextProps.styles,
                        nextProps.filterGender, nextProps.filterIdealFor)),
                    genders: this.getGenders(nextProps.styles),
                    idealFors: this.getIdealFors(nextProps.styles),
                    genderSelectd: this.getSelected(nextProps.filterGender),
                    idealForSelected: this.getSelected(nextProps.filterIdealFor)
                });
            } else {
                dispatch(getCategoryDetailAsync(nextProps.category))
                    .then(() => {
                        //console.log('updating state by fecthing from the server');
                        this.setState({
                            skiArray: this.processStyles(this.props.styles,
                                nextProps.sort, nextProps.filterGender,
                                nextProps.filterIdealFor, nextProps.selectedPage), // dipatch here changes this.props
                            pages: this.getPages(this.getStylesFiltered(this.props.styles,
                                nextProps.filterGender, nextProps.filterIdealFor)),
                            genders: this.getGenders(this.props.styles),
                            idealFors: this.getIdealFors(this.props.styles),
                            genderSelectd: this.getSelected(nextProps.filterGender),
                            idealForSelected: this.getSelected(nextProps.filterIdealFor)
                    });
                    });
            }
        } else {
            //console.log('updating for other props');
            this.setState({
                skiArray: this.processStyles(this.props.styles, nextProps.sort,
                    nextProps.filterGender, nextProps.filterIdealFor,
                    nextProps.selectedPage),
                pages: this.getPages(this.getStylesFiltered(this.props.styles,
                    nextProps.filterGender, nextProps.filterIdealFor)),
                genderSelectd: this.getSelected(nextProps.filterGender),
                idealForSelected: this.getSelected(nextProps.filterIdealFor)
        });
        }
    }

    componentWillUnmount() {
        const { dispatch } = this.props;

        dispatch(getSelectedCategory());
    }

    getGenderFiltered(styles, genders) {
        if (genders !== undefined && genders !== null && genders.length > 0) {
            return styles.filter(s => genders.indexOf(s.gender) > -1).slice();
        }
        return styles.slice();
    }

    getIdealForFiltered(styles, idealFors) {
        if (idealFors !== undefined && idealFors !== null && idealFors.length > 0) {
            return styles.filter(s => s.idealFors
                .some(i=>idealFors.indexOf(i) > -1)).slice();
        }
        return styles.slice();
    }

    getStylesFiltered(styles, genders, idealFors) {
        let s= this.getGenderFiltered(styles, genders).slice();
        s = this.getIdealForFiltered(s, idealFors).slice();
        return s;
    }

    getStylesSorted(styles, sort) {
        switch (sort) {
            case 'Price Low to High':
                return styles.slice().sort((a, b) => {
                    return a.priceCurrent - b.priceCurrent;
                });
            case 'Price High to Low':
                return styles.slice().sort((a, b) => {
                    return b.priceCurrent - a.priceCurrent;
                });
            default:
                return styles.slice();
        }
    }

    processStyles(styleArray, sort, genders, idealFors, page) {
        let styles = styleArray.slice();
        let stylesFiltered = this.getStylesFiltered(styles, genders, idealFors).slice();
        let stylesSorted = this.getStylesSorted(stylesFiltered, sort).slice();
        return stylesSorted.slice( itemsPerPage * (page - 1), itemsPerPage * page);
    }

    countGender(gender) {
        return this.getIdealForFiltered(this.props.styles, this.state.idealForSelected)
            .filter(s => s.gender === gender).length;
    }

    counterIdealFor(idealFor) {
        return this.getGenderFiltered(this.props.styles, this.state.genderSelectd)
            .filter(s => s.idealFors.indexOf(idealFor) > -1).length;
    }

    render() {
        //console.log(this.props.styles);
        //console.log(this.state.skiArray);

        if (this.state.skiArray.length > 0 && this.state.pages.length > 0) {
            return (
            <div className="container-fluid row" style={{fontSize: '0.80rem'}}>
                <div className="col-3 bg-faded">
                    <p className="pt-3 mb-0 pb-0 pl-2" style={{fontWeight: 'bold'}}>
                        SORT
                    </p>
                    <div className="btn-group-vertical pl-2 mt-0 pt-0">
                        <label className={`mb-0 pl-0 ${this.props.sort === 'Price Low to High' ? 'bg-primary' : ''}`} >
                            <Link to={{
                                pathname: this.props.pathname,
                                search: stringify(Object.assign({}, this.props.search,
                                    {
                                        page: '1',
                                        sort: 'Price Low to High',
                                        gender: this.state.genderSelectd,
                                        idealFor: this.state.idealForSelected
                                    }))
                            }} className="nav-link">
                                <span style={{ fontWeight: '500', color: `${this.props.sort === 'Price Low to High' ? 'white' : 'black'}` }} >
                                    Price Low to High
                                </span>
                            </Link>
                        </label>
                        <label className={`mt-0 ${this.props.sort === 'Price High to Low' ? 'bg-primary' : ''}`}>
                            <Link to={{
                                pathname: this.props.pathname,
                                search: stringify(Object.assign({},
                                    this.props.search,
                                    {
                                        page: '1',
                                        sort: 'Price High to Low',
                                        gender: this.state.genderSelectd,
                                        idealFor: this.state.idealForSelected
                                    }))
                            }} className="nav-link" >
                                <span style={{ fontWeight: '500', color: `${this.props.sort === 'Price High to Low' ? 'white' : 'black'}` }}>
                                    Price High to Low
                                </span>
                            </Link>
                        </label>
                    </div>

                    <p className="pl-2 mt-2 mb-1" style={{ fontWeight: 'bold' }}>
                        FILTER
                    </p>
                    <p className="mb-0 mt-0 pl-3" style={{ fontWeight: 'bold' }}>
                        Gender &nbsp;
                        <Link to={{
                                pathname: this.props.pathname,
                                search: stringify(Object.assign({},
                                    this.props.search,
                                    {
                                        page: '1',
                                        sort: this.props.sort,
                                        gender: this.state.genderSelectd,
                                        idealFor: this.state.idealForSelected
                                    }))
                            }} >
                            <img src="/image/go.png" style={{ width: '12%'}} className="pb-1" alt="Go" />
                        </Link>
                    </p>
                    <ButtonGroup className="btn-group-vertical" >
                            {this.state.genders.map(gender =>
                                <Button size="sm"
                                    className={`border-0 text-left ml-2 ${this.state.genderSelectd.includes(gender) ? 'bg-primary text-white' : 'bg-faded'}`}
                                    style={{ fontSize: '0.80rem' }}
                                    onClick={()=>this.onGenderSelected(gender)}
                                    key={gender}>
                                    {gender} ({this.countGender(gender)})
                                </Button>
                            )}
                    </ButtonGroup>

                    <p className="mb-0 mt-1 pl-3" style={{ fontWeight: 'bold' }}>
                        Ideal For &nbsp;
                        <Link to={{
                            pathname: this.props.pathname,
                            search: stringify(Object.assign({},
                                this.props.search,
                                {
                                    page: '1',
                                    sort: this.props.sort,
                                    gender: this.state.genderSelectd,
                                    idealFor: this.state.idealForSelected
                                }))
                        }} >
                            <img src="/image/go.png" style={{ width: '12%' }} className="pb-1" alt="Go" />
                        </Link>
                    </p>
                    <ButtonGroup className="btn-group-vertical" >
                        {this.state.idealFors.map(idealFor =>
                            <Button size="sm"
                                className={`border-0 text-left ml-2 ${this.state.idealForSelected.includes(idealFor) ? 'bg-primary text-white' : 'bg-faded'}`}
                                style={{ fontSize: '0.80rem' }}
                                onClick={() =>this.onIdealForSelected(idealFor)}
                                key={idealFor}>
                                {idealFor} ({this.counterIdealFor(idealFor)})
                            </Button>
                        )}
                    </ButtonGroup>
                </div>

                <div className="col-9">
                    <StylesByCategory2Ctn skiArray={this.state.skiArray} />
                    <PageBtnGroup pages={this.state.pages}
                        selectedPage={this.props.selectedPage}
                        pathname={this.props.pathname}
                        search={this.props.search}/>
                </div>
            </div>
        );
        } else {
            return null;
        }
        

    }
}

StylesByCategory.propTypes = {
    styles: PropTypes.arrayOf(PropTypes.shape({
        styleNo: PropTypes.string,
        styleName: PropTypes.string,
        categoryName: PropTypes.string,
        brandName: PropTypes.string,
        gender: PropTypes.string,
        priceCurrent: PropTypes.number,
        priceRegular: PropTypes.number,
        imageSmall: PropTypes.string,
        idealFors: PropTypes.arrayOf(PropTypes.string)
    })),
    category: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.object,
    categoryList: PropTypes.arrayOf(PropTypes.string),
    selectedPage: PropTypes.number,
    sort: PropTypes.string,
    filterGender: PropTypes.arrayOf(PropTypes.string),
    filterIdealFor: PropTypes.arrayOf(PropTypes.string)
}

export default StylesByCategory;

