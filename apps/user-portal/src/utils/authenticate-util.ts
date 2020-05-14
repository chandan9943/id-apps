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
 *
 */

import {
    AuthenticateSessionUtil,
    AuthenticateTokenKeys,
    OPConfigurationUtil,
    SignInUtil
} from "@cicis/authentication";
import * as TokenConstants from "../constants";
import { store } from "../store";
import { handleSignIn } from "../store/actions";

/**
 * Clears the session related information and sign out from the session.
 */
export const endUserSession = (): void => {
    SignInUtil.sendRevokeTokenRequest(
        JSON.parse(AuthenticateSessionUtil.getSessionParameter(AuthenticateTokenKeys.REQUEST_PARAMS)),
        AuthenticateSessionUtil.getSessionParameter(AuthenticateTokenKeys.ACCESS_TOKEN)
    )
        .then(() => {
            // Clear out the session info.
            AuthenticateSessionUtil.endAuthenticatedSession();
            OPConfigurationUtil.resetOPConfiguration();
            store.dispatch(handleSignIn());
        })
        .catch(() => {
            // TODO: Add a notification message.
        });
};

/**
 * Checks if the logged in user has login scope.
 *
 * @return {boolean}
 */
export const hasLoginPermission = (): boolean => {
    const scopes = AuthenticateSessionUtil.getSessionParameter(AuthenticateTokenKeys.SCOPE).split(" ");
    return scopes.includes(TokenConstants.LOGIN_SCOPE);
};

/**
 * Checks if the logged in user has a specific scope.
 *
 * @return {boolean}
 */
export const hasScope = (scope: string): boolean => {
    const scopes = AuthenticateSessionUtil.getSessionParameter(AuthenticateTokenKeys.SCOPE).split(" ");
    return scopes.includes(scope);
};
