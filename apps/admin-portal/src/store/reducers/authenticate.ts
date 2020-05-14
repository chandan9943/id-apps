/**
 * Copyright (c) 2020, cic Inc. (http://www.cic.org) All Rights Reserved.
 *
 * cic Inc. licenses this file to you under the Apache License,
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

import { AuthenticateSessionUtil, AuthenticateTokenKeys, AuthenticateUserKeys } from "@cicis/authentication";
import { AuthStateInterface, createEmptyProfile } from "../../models";
import { authenticateActionTypes } from "../actions/types";

/**
 * Initial authenticate state.
 */
const authenticateInitialState: AuthStateInterface = {
    displayName: "",
    emails: "",
    isAuth: false,
    location: APP_HOME_PATH,
    loginInit: false,
    logoutInit: false,
    profileInfo: createEmptyProfile(),
    profileSchemas: [],
    username: ""
};

/**
 * Reducer to handle the state of authentication related actions.
 *
 * @param state - Previous state
 * @param action - Action type
 * @returns The new state
 */
const authenticateReducer = (state = authenticateInitialState, action): AuthStateInterface => {
    switch (action.type) {
        case authenticateActionTypes.SET_SIGN_IN:
            if (AuthenticateSessionUtil.getSessionParameter(AuthenticateTokenKeys.ACCESS_TOKEN)) {
                return {
                    ...state,
                    displayName: AuthenticateSessionUtil.getSessionParameter(AuthenticateUserKeys.DISPLAY_NAME),
                    emails: AuthenticateSessionUtil.getSessionParameter(AuthenticateUserKeys.EMAIL),
                    isAuth: true,
                    loginInit: true,
                    logoutInit: false,
                    username: AuthenticateSessionUtil.getSessionParameter(AuthenticateUserKeys.USERNAME),
                };
            }
            break;
        case authenticateActionTypes.SET_SIGN_OUT:
            return {
                ...state,
                loginInit: false,
                logoutInit: true
            };
        case authenticateActionTypes.RESET_AUTHENTICATION:
            return {
                ...authenticateInitialState
            };
        case authenticateActionTypes.SET_PROFILE_INFO:
            return {
                ...state,
                profileInfo: action.payload
            };
        case authenticateActionTypes.SET_SCHEMAS:
            return {
                ...state,
                profileSchemas: action.payload
            };
        default:
            return state;
    }
};

export {
    authenticateInitialState,
    authenticateReducer
};
