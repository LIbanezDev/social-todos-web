import React, {FC} from 'react';
import {Button} from "@material-ui/core";
import {GitHub} from "@material-ui/icons";
import {toQuery} from "../../utils/route";
import PopupWindow from "../../utils/PopupWindow";

interface GithubButtonProps {
    buttonText?: string,
    className?: string,
    clientId: string,
    onRequest?: any,
    onSuccess?: any,
    onFailure?: any,
    redirectUri: string,
    scope?: string,
}

const GithubButton: FC<GithubButtonProps> =
    ({
         buttonText = 'Sign in with Github',
         children,
         clientId,
         redirectUri,
         onRequest = () => {
         },
         onFailure = () => {
         },
         onSuccess = () => {
         },
         scope = 'user:email'
     }
    ) => {

        const onBtnClick = () => {
            const search = toQuery({
                client_id: clientId,
                scope,
                redirect_uri: redirectUri,
            });
            const popup = PopupWindow.open(
                'github-oauth-authorize',
                `https://github.com/login/oauth/authorize?${search}`,
                {height: 800, width: 700}
            );

            onRequest();
            popup.then(
                data => onSuccess(data),
                error => onFailure(error)
            );
        }

        return (
            <Button color="secondary" variant="contained" endIcon={<GitHub/>} onClick={onBtnClick}>
                {children || buttonText}
            </Button>
        );
    };

export default GithubButton;
