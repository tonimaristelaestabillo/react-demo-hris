import React, { Component } from 'react';
import { connect } from 'react-redux';
import { readEmployees } from '../../actions';
import './styles.css';


class EmployeePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            onView: false
        }
    }

    componentDidMount() {
        this.props.readEmployees();
        console.log("ERROR", this.props.error);
        console.log("INFO", this.props.employeeInfo);
        // this.setState({
        //     employees: this.props.employees
        // })
    }

    renderData() {
        const employeeItem = this.props.employees.map(({ _id, personalDetails, jobDetails, benefitsDetails }) => {
            return (
                <div key={_id} className="employee-card">
                    <div> {`${personalDetails.firstName} ${personalDetails.lastName}`} </div>
                    <div> {jobDetails.employeeNumber} </div>
                    <div> {jobDetails.title} </div>
                    {/* View */}
                    <button onClick={() => {
                        this.setState({
                            onView: true
                        })
                    }}> View </button>
                    {/* Delete */}
                    <button onClick={() => { console.log("Delete") }}> Delete </button>
                    {
                        this.state.onView ? this.renderTable(personalDetails, jobDetails, benefitsDetails) : null
                    }
                </div>
            );
        });
        return employeeItem;
    }

    renderTable(personalDetails, jobDetails, benefitsDetails) {
        return (
            <div>
                <div>
                    <h3> PERSONAL DETAILS</h3>
                    <ul>
                        <li> First Name {personalDetails.firstName}</li>
                        <li> Middle Name {personalDetails.middleName}</li>
                        <li> Last Name {personalDetails.lastName}</li>
                        <li> Gender {personalDetails.gender}</li>
                        <li> Title {personalDetails.titile}</li>
                        <li> Address {`${personalDetails.address.unitNumber} ${personalDetails.address.street} ${personalDetails.address.city} ${personalDetails.address.province} ${personalDetails.address.region} ${personalDetails.address.zipCode} `}</li>
                    </ul>
                </div>
                <div>
                    <h3> CONTACT DETAILS</h3>
                    <ul>
                        <li> Landline {personalDetails.contact.landlineNumber}</li>
                        <li> Mobile Number {personalDetails.contact.mobileNumber}</li>
                        <li> Email {personalDetails.contact.email}</li>
                    </ul>
                </div>
                <div>
                    <h3> JOB DETAILS</h3>
                    <ul>
                        <li> Title {jobDetails.title}</li>
                        <li> Employee Number {jobDetails.employeeNumber}</li>
                        <li> Location {jobDetails.location}</li>
                        <li> Department {jobDetails.department}</li>
                        <li> Salary {jobDetails.salary}</li>
                    </ul>
                </div>
                <div>
                    <h3> EMPLOYEE BENEFITS </h3>
                    <ul>
                        <li> SSS {benefitsDetails.SSS}</li>
                        <li> PhilHealth{benefitsDetails.PhilHealth}</li>
                        <li> PAGIBIG {benefitsDetails.PAGIBIG}</li>
                        <li> BIR {benefitsDetails.BIR}</li>
                    </ul>
                </div>
                {
                    this.state.onEdit ? this.renderForm() : null
                }
                <button onClick={() => {
                    this.setState({
                        // onView: false,
                        onEdit: true
                    })
                }}> Update </button>
            </div>

        )
    }


    renderForm() {
        return (
            <form>
                <label>
                    <input type="text" name="name" placeholder="First name" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }


    render() {
        return (
            <div>
                <div className="employee-art">
                    <img src={require('../../assets/employee.png')} />
                </div>
                <div className="employee-list">
                    {this.renderData()}
                </div>
            </div>

        );
    }
}



const mapStatetoProps = ({ employee }) => {
    const { employees, error, employeeInfo } = employee;

    return {
        employees, error, employeeInfo
    }
}


export default connect(mapStatetoProps, { readEmployees })(EmployeePage);
