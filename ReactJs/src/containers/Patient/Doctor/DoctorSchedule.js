import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import {getDetailInfoDoctor} from '../../../services/userService';
import {LANGUAGES} from '../../../utils';
import Select from 'react-select';
import moment from 'moment';
import localization from 'moment/locale/vi'
import {getScheduleDoctorByDate} from '../../../services/userService'

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDay: [],
            allAvaiableTimes: [],
        }
    }

    async componentDidMount() {
        let {language} = this.props;

       this.setArrDay(language);

    }

    componentDidUpdate(prevProps,prevState,snapshot) {
        if(prevProps.language !== this.props.language){
            this.setArrDay(this.props.language);
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    setArrDay = (language) => {
        let arrDay = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if(language === LANGUAGES.VI ){
                let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM'); // format ngay TV, add them ... ngay theo vong for
                object.label = this.capitalizeFirstLetter(labelVi);
            }
            else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format("ddd - DD/MM"); // format ngay TV, add them ... ngay theo vong for    
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf(); // startOf day de lay gio =0, valueof de lay kieu unix tim
            arrDay.push(object);
        }
        // console.log(arrDay);
        this.setState({
            arrDay: arrDay
        })
    }

    handleOnChangSelect = async (event) => {
        if(this.props.detailDoctorFromParent && this.props.detailDoctorFromParent!== -1 ){
            let doctorId = this.props.detailDoctorFromParent;
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(doctorId,date);
            console.log(res);
            
            let allTime = [];
            if( res && res.errCode === 0){
                this.setState({
                    allAvaiableTimes: res.data ? res.data : []
                })
            }
        }
    }

    render() {
        // console.log(this.props.match.params.id)
        let language = this.props.language;
        let {arrDay,allAvaiableTimes} = this.state;
        
        return (
            <div className="doctor-schedule-container">
                <div className="all-schedule">
                    <select 
                        onChange={(event) => this.handleOnChangSelect(event)}
                    >
                        {arrDay && arrDay.length > 0 && 
                            arrDay.map((item,index)=> {
                                return ( 
                                    <option 
                                    value={item.value} key={index}> 
                                    {item.label}
                                    </option>
                                )
                            })
                        }
                    </select>
                    {/* <Select
                        options={arrDay}
                        onChange={(event) => this.handleOnChangSelect(event)}
                    /> */}

                </div>
                <div className="all-avaiable-time">
                    <div className="text-calendar">
                       <i className="fas fa-calendar-alt"></i> <span className="text">Lịch khám</span> 
                    </div>
                    <div className="time-content">
                        { allAvaiableTimes && allAvaiableTimes.length > 0 ?
                            
                            allAvaiableTimes.map((item, index) => {
                                let timeDisplay = language===LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                return (
                                    <button key={index} className="">{timeDisplay}</button>

                                )
                            }) 

                        :   <div>Không có lịch hẹn trong khoảng thời gian này. Vui lòng lòng chọn lịch trong khoảng thời gian khác !</div>  

                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);