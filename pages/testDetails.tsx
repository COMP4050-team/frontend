import { Table, Box } from '@mui/material';
import { DataGrid, GridColDef} from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import {
    S3Client,
    CreateBucketCommand,
    DeleteBucketCommand,
} from '@aws-sdk/client-s3';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';



function testDetails(){
    const [getData, setData] = useState([]);
    // const [bucketName, setBucketName] = useState("");
    // const [successMsg, setSuccessMsg] = useState("");
    // const [errorMsg, setErrorMsg ] = useState("");

    // const region = 'ap-southeast-2';
    // const client = new S3Client({
    //     region,
    //     credentials: fromCognitoIdentityPool({
    //         client: new CognitoIdentityClient({ region }),
    //         identityPoolId:"ap-southeast-2:46ec7d87-6d8a-494f-a5c0-f067f9c45e0b"
    //     }),
    // });

    // const createBucket = async () => {
    //     setSuccessMsg("");
    //     setErrorMsg("");

    //     try {
    //         await client.send(new CreateBucketCommand({ Bucket: bucketName }));
    //         setSuccessMsg(`Bucket "${bucketName}" created.`);
    //       } catch (e) {
    //         setErrorMsg(e);
    //       }
    //     };
      
    //     const deleteBucket = async () => {
    //       setSuccessMsg("");
    //       setErrorMsg("");
      
    //       try {
    //         await client.send(new DeleteBucketCommand({ Bucket: bucketName }));
    //         setSuccessMsg(`Bucket "${bucketName}" deleted.`);
    //       } catch (e) {
    //         setErrorMsg(e);
    //       }
    // }

    useEffect(() => {
        fetch("../data.json")
        .then(function (res) {
            return res.json();
        })
        .then(function (data){
            setData(data);
        })
        .catch(function (err){
            console.log(err, "error");
        });
    }, []);

    return (
        <div className="container">

        </div>
    )

}

export default testDetails;