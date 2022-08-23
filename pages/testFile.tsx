import type { NextPage } from 'next';
export

const TestFile = ({ studentName, assignment, testsPassed, testsFailed, totalGrade }
    : {studentName:string; assignment:string; testsPassed: number; testsFailed: number; totalGrade: number}) => {
    if(!studentName) return <div />;
    return (
      <table>
        <tbody>
          <tr>
            <td>
              <h5>{studentName}</h5>
            </td>
            <td>
              <h5>{assignment}</h5>
            </td>
            <td>
              <h5>{testsPassed}</h5>
            </td>
            <td>
              <h5>{testsFailed}</h5>
            </td>
            <td>
              <h5>{totalGrade}</h5>
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

export default TestFile;