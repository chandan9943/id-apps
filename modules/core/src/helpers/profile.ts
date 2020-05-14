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

import _ from "lodash";
import { ISConstants } from "../constants";
import { AuthReducerStateInterface, ProfileInfoInterface } from "../models";

/**
 * Resolves the user's display name.
 *
 * @param {ProfileInfoInterface} profileInfo - profile information.
 * @param {AuthReducerStateInterface} authState - Contains basic profile info extracted from the ID token.
 * @return {string} - Resolved display name.
 */
export const resolveUserDisplayName = (profileInfo: ProfileInfoInterface,
                                       authState?: AuthReducerStateInterface): string => {

    if (profileInfo.name && (profileInfo.name.givenName || profileInfo.name.familyName)) {
        const givenName = _.isEmpty(profileInfo.name.givenName) ? "" : profileInfo.name.givenName + " ";
        const familyName = _.isEmpty(profileInfo.name.familyName) ? "" : profileInfo.name.familyName;

        return givenName + familyName;
    } else if (profileInfo.userName) {
        return profileInfo.userName;
    } else if (authState && authState.displayName) {
        return authState.displayName;
    } else if (authState && authState.username) {
        return authState.username;
    }

    return null;
};

/**
 * Same username can exist in two different user stores. This function
 * will resolve the username so that the `PRIMARY` user store users will
 * have just the username and the other user store users will have their
 * corresponding user store prefixed to their username.
 *
 * @param {string} username - Username of the user.
 * @param {string} userStoreDomain - User store domain of the user.
 * @return {string}
 */
export const resolveUsername = (username: string, userStoreDomain: string) => {

    // check if the user store is `PRIMARY`.
    if (userStoreDomain === ISConstants.PRIMARY_USER_STORE_IDENTIFIER) {
        return username;
    }

    return `${userStoreDomain}/${username}`;
};

/**
 * Resolves the user's username when the user store is embedded
 * in it. `PRIMARY` user store users will have just the username
 * and the other user store users will have their corresponding
 * user store prefixed to their username.
 *
 * @param {string} username - Username of the user with user store embedded.
 * @return {string}
 */
export const resolveUserStoreEmbeddedUsername = (username: string) => {

    const parts = username.split("/");

    if (parts.length === 1) {
        return username;
    }

    // check if the user store is `PRIMARY`.
    if (parts[0] === ISConstants.PRIMARY_USER_STORE_IDENTIFIER) {
        return parts[1];
    }

    return username;
};
