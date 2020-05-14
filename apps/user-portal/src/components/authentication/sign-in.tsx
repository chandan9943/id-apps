/**
 * Copyright (c) 2019, cic (http://www.cic.org) All Rights Reserved.
 *
 * cic licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalConfig } from "../../configs";
import { USER_DENIED_CONSENT } from "../../constants";
import { history } from "../../helpers";
import { AppState } from "../../store";
import { handleSignIn } from "../../store/actions";

/**
 * This component handles the sign-in function
 */
export const SignIn = (props) => {
    const dispatch = useDispatch();
    const isAuth = useSelector((state: AppState) => state.authenticationInformation.isAuth);

    const error = new URLSearchParams(props.location.search).get("error_description");

    useEffect(() => {
        if (!isAuth && !error) {
            dispatch(handleSignIn());
        } else if (error === USER_DENIED_CONSENT) {
            dispatch(handleSignIn(true));
        } else {
            // TODO: Use authentication SDK to access the session
            if (sessionStorage.getItem("request_params") &&
                JSON.parse(sessionStorage.getItem("request_params")).clientId &&
                JSON.parse(sessionStorage.getItem("request_params")).clientId !== GlobalConfig.clientID) {
                sessionStorage.clear();
                dispatch(handleSignIn());
            } else {
                loginSuccessRedirect();
            }
        }
    }, [isAuth]);

    const getAuthenticationCallbackUrl = () => {
        return window.sessionStorage.getItem("auth_callback_url");
    };

    const loginSuccessRedirect = () => {
        const AuthenticationCallbackUrl = getAuthenticationCallbackUrl();
        const location =
            !AuthenticationCallbackUrl || AuthenticationCallbackUrl === GlobalConfig.appLoginPath
                ? GlobalConfig.appHomePath
                : AuthenticationCallbackUrl;

        history.push(location);
    };

    return null;
};
