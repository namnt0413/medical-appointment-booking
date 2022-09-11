import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from "../../../store/actions"

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown:'',
            contentHTML:'',
            selectedDoctor: '',
            description: '',

        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps,prevState, snapshot) {

    }

    handleChange = (selectedDoctor) => { // react-select
        this.setState({ selectedDoctor }
        );
      };

    handleOnChangeDescription = (event) => {
        this.setState({
            description : event.target.value
        })
    } 

    handleEditorChange = ({ html, text }) => {
        console.log('handleEditorChange', html, text);
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkdown = () => {
        // alert('saveContentMarkdown');
        console.log('check state : ' , this.state);
    }


    render() {

        return (
        <div className="manage-doctor-container">
            {/* <table id="ManageDoctor">
                <tbody>
                    <tr>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>

                    { arrUsers && arrUsers.length > 0 && 
                        arrUsers.map((item,index)=>{
                            return(
                                <tr>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className="btn-edit" onClick={()=>this.handleUpdateUser(item) } ><i className="fas fa-pencil-alt"></i></button>
                                        <button className="btn-delete" onClick={()=>this.handleDeleteUser(item) } ><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            )
                        })
                    }
 
                </tbody>
            </table> */}
            
            <div className="manage-doctor-title title">
                THÔNG TIN CHI TIẾT BÁC SĨ
            </div>
            <div className="more-info">
                <div className="content-left form-group">
                    <label className="">Chọn bác sĩ</label>
                    <Select
                        value={this.state.selectedDoctor}
                        onChange={this.handleChange}
                        options={options}
                    />
                    
                </div>
                <div className="content-right">
                    <label className="">Thông tin giới thiệu</label>
                    <textarea className="form-control" rows="4"
                        onChange={ (event) => this.handleOnChangeDescription(event) }
                        value = {this.state.description}
                    >
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    </textarea>
                </div>

                
            </div>
            <div className="manage-doctor-editor">
                <MdEditor 
                    style={{ height: '500px' }} 
                    renderHTML={text => mdParser.render(text)} 
                    onChange={this.handleEditorChange } 
                />
            </div>

            <button className="btn-save-content-doctor"
                onClick={ () => this.handleSaveContentMarkdown() }
            >
                Lưu thông tin
            </button>
        </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUsers: () => dispatch(actions.fetchAllUsersStart() ),
        deleteUser: (id) => dispatch(actions.deleteUser(id) )

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
