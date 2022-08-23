import type { NextPage } from 'next';
import { useQuery } from 'urql';
import { GetTestsDocument } from '../gql/generated/graphql';
import { CustomList } from '../components/CustomList';
import { Typography } from '@mui/material';
import { devFile } from '../devtests/devFile';

const TestsPage: NextPage = () => {
  const [result] = useQuery({
    query: GetTestsDocument,
  });

  if (result.fetching) return <p>Loading...</p>;
  if (result.error) return <p>Error :(</p>;

  return (
    <>
      <Typography align='center' variant='h3'>
        Tests
      </Typography>
      <CustomList
        items={
          result.data?.tests.map((test) => {
            return {
              text: test.name,
              href: `/test/${test.id}`,
            };
          }) ?? []
        }
      />
      <div className="test-container">
        {devFile.map((data, key) => {
          return(
            <div key={key}>
              <TestFile
                key={key}
                studentName={data.studentName}
                assignment={data.assignment}
                testsPassed={data.testsPassed}
                testsFailed={data.testsFailed}
                totalGrade={data.totalGrade}
              />
              </div>
          );
        })}
      </div>

    </>
  );
};

const TestFile = ({ studentName, assignment, testsPassed, testsFailed, totalGrade }) => {
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

export default TestsPage;
