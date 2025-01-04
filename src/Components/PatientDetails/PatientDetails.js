import React, { useEffect , useState} from 'react'
import './PatientDetail.css'
import BloodPressureChart from './BloodPressureChart'
import { useParams } from 'react-router';
import heart from './HeartBPM.svg'
import res from './respiratory.svg'
import temp from './temperature.svg'
import { IoMdArrowDropdown } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
import { CgGenderFemale } from "react-icons/cg";
import { LuPhone } from "react-icons/lu";
import { MdOutlineSystemSecurityUpdateGood } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { LuDownload } from "react-icons/lu";

function PatientDetails() {    
   
    const { phone_number } = useParams(); 

  // Retrieve the patient data from sessionStorage or other source
  const data = JSON.parse(sessionStorage.getItem('user'));
  const selectedUser = data?.find(user => user.phone_number === phone_number);
//   const [selectedUser, setSelectedUser] = useState(data?.[0]);


//   useEffect(() => {
//     if (phone_number) {
//         const user = data?.find(user => user.phone_number === phone_number);
//         setSelectedUser(user);
//     }
// }, [phone_number, data]);

  if (!selectedUser) {
    return <p>No patient selected</p>;
  }

  console.log('patient details', selectedUser)

  return (
    <div className='patientDetails_container'>
      <div className='patientDiagnosis_conatiner'>
            <div className='patientdiagnostic_history'>
                <h3>Diagnosis History</h3>

                <div className='patientCharts_section'>
<BloodPressureChart data={selectedUser}/>
                </div>
                

                <div className='patientresdetails'>
                    <div className='respiratory_section'>
                        <img src={res}/>
                        <div>Respiratory rate</div>
                        <div><strong className='patientvalue'>{selectedUser?.diagnosis_history[0]?.respiratory_rate?.value}&nbsp;bpm</strong></div>
                        <div  className='patientlevels'>{selectedUser?.diagnosis_history[0]?.respiratory_rate?.levels}</div>
                    </div>
                    <div className='temperature_section'>
                    <img src={temp}/>
                        <div>Temperature</div>
                        <div><strong className='patientvalue'>{selectedUser?.diagnosis_history[0]?.temperature?.value}&deg;F</strong></div>
                        <div className='patientlevels'>{selectedUser?.diagnosis_history[0]?.temperature?.levels}</div>
                    </div>
                    <div className='heartrate_section'>
                    <img src={heart}/>
                        <div>Heart rate</div>
                        <div><strong className='patientvalue'>{selectedUser?.diagnosis_history[0]?.heart_rate?.value}&nbsp;bpm</strong></div>
                        <div  className='patientlevels'><IoMdArrowDropdown/>{selectedUser?.diagnosis_history[0]?.heart_rate?.levels}</div>
                    </div>
                </div>

            </div>

            <div className='patientdiagnostic_list'>
      <h4>Diagnosis List</h4>

            <div className="conditions-container">
      <div className="conditions-table-wrapper">
        <table className="conditions-table">
          <thead>
            <tr>
              <th>Problem/Diagnosis</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {selectedUser?.diagnostic_list.map((condition, index) => (
              <tr key={index}>
                <td>{condition.name}</td>
                <td>{condition.description}</td>
                <td className={`status ${condition.status.toLowerCase()}`}>
                  {condition.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

            </div>

           
      </div>



     
      <div className='patientProfile_container'> 

    <div className='patinetprofiledetailandimagsection'>
    <div className='patientprofileimgname'>
            <img src={selectedUser?.profile_picture}/>
            <p>{selectedUser?.name}</p>
        </div>
        <div className='patientprofiledetailsection'>
            <div className='patienticondetail'>
                <div><CiCalendar  className='rightsideicon'/></div>
                <div>
                    <div className='profilebirthhead'>Date of bith</div>
                    <div ><strong className='profiledate'>{selectedUser?.date_of_birth}</strong></div>
                </div>
            </div>

            <div className='patienticondetail'>
                <div><CgGenderFemale  className='rightsideicon'/></div>
                <div>
                    <div className='profilebirthhead'>Gender</div>
                    <div ><strong className='profiledate'>{selectedUser?.gender}</strong></div>
                </div>
            </div>

            <div className='patienticondetail'>
                <div><LuPhone  className='rightsideicon'/></div>
                <div>
                    <div className='profilebirthhead'>Contact</div>
                    <div ><strong className='profiledate'>{selectedUser?.phone_number}</strong></div>
                </div>
            </div>


            <div className='patienticondetail'>
                <div><FiPhone  className='rightsideicon'/></div>
                <div>
                    <div className='profilebirthhead'>Emergency Contact</div>
                    <div ><strong className='profiledate'>{selectedUser?.emergency_contact}</strong></div>
                </div>
            </div>

            <div className='patienticondetail'>
                <div><MdOutlineSystemSecurityUpdateGood  className='rightsideicon'/></div>
                <div>
                    <div className='profilebirthhead'>Insurance Provider</div>
                    <div ><strong className='profiledate'>{selectedUser?.insurance_type}</strong></div>
                </div>
            </div>

            <div className='patienticondetail'>
                <button className='pateintallinfobtn'>Show All Information</button>
            </div>
        </div>
    </div>


<div className='patientprofilelabresults'>
    <h3>Lab Results</h3>
    <div>
        {
            selectedUser && selectedUser?.lab_results.map((res)=>{
                return(
                   <div className='labresults'>
                     <div>{res}</div>
                     <div><LuDownload/></div>
                    </div>
                )
            })
        }
    </div>
</div>
      </div>
    </div>
  )
}

export default PatientDetails
