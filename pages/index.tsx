import React from "react";
import {Upload} from "../components/auth/FileUpload";
import {useFetchUser} from "../hooks/useFetchUser";
import Layout from "../components/layout/Layout";

export default function Home() {
    const userLoading = useFetchUser({required: false})

    return (
        <Layout title="Index" {...userLoading}>
            <Upload onChange={() => {}}/>
        </Layout>
    )
}
