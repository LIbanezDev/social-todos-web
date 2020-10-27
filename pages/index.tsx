import React from "react";
import {Upload} from "../components/FileUpload";
import {useFetchUser} from "../hooks/useFetchUser";
import Layout from "../components/Layout";

export default function Home() {
    const userLoading = useFetchUser({required: false})

    if (userLoading.loading) {
        return <h2> Loading... </h2>
    }

    return (
        <Layout title="Index" {...userLoading}>
            <Upload/>
        </Layout>
    )
}
