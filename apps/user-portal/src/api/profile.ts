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

import { SignInUtil } from "@cicis/authentication";
import { AxiosHttpClient } from "@cicis/http";
import axios from "axios";
import _ from "lodash";
import { GlobalConfig, ServiceResourcesEndpoint } from "../configs";
import * as ApplicationConstants from "../constants/application-constants";
import { history } from "../helpers";
import { BasicProfileInterface, HttpMethods, MultiValue, ProfileSchema } from "../models";
import { store } from "../store";
import { toggleSCIMEnabled } from "../store/actions";

/**
 * Get an axios instance.
 *
 * @type {AxiosHttpClientInstance}
 */
const httpClient = AxiosHttpClient.getInstance();

/**
 * Retrieve the user information of the currently authenticated user.
 *
 * @return {Promise<any>} a promise containing the response.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const getUserInfo = (): Promise<any> => {
    const requestConfig = {
        headers: {
            "Access-Control-Allow-Origin": GlobalConfig.clientHost,
            "Content-Type": "application/json"
        },
        method: HttpMethods.GET,
        url: ServiceResourcesEndpoint.user
    };

    return httpClient
        .request(requestConfig)
        .then((response) => {
            if (response.status !== 200) {
                return Promise.reject(new Error(`Failed get user info from: ${ServiceResourcesEndpoint.user}`));
            }
            return Promise.resolve(response);
        })
        .catch((error) => {
            return Promise.reject(error);
        });
};

/**
 * Get gravatar image using email address
 * @param email
 */
export const getGravatarImage = (email: string): Promise<string> => {
    if (_.isEmpty(email)) {
        return Promise.reject("Email is null");
    } else {
        const url: string = SignInUtil.getGravatar(email);
        return new Promise((resolve, reject) => {
            axios
                .get(url)
                .then(() => {
                    resolve(url.split("?")[0]);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
};

/**
 * This function iterates over all email addresses until it finds an email with a gravatar image
 * @param emails
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
const findGravatar = async (emails: string[] | MultiValue[]): Promise<string> => {
    let gravatar = "";
    if (!_.isEmpty(emails)) {
        for (const email of emails) {
            try {
                gravatar = await getGravatarImage(typeof email === "string" ? email : email.value);
                return gravatar;
            } catch (error) {
                continue;
            }
        }
    }
    return gravatar;
};

/**
 * Retrieve the user profile details of the currently authenticated user.
 *
 * @returns {Promise<BasicProfileInterface>} a promise containing the user profile details.
 */
export const getProfileInfo = (): Promise<BasicProfileInterface> => {
    const orgKey = "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User";

    const requestConfig = {
        headers: {
            "Accept": "*/*",
            "Access-Control-Allow-Origin": GlobalConfig.clientHost,
            "Content-Type": "application/scim+json"
        },
        method: HttpMethods.GET,
        url: ServiceResourcesEndpoint.me
    };

    return httpClient
        .request(requestConfig)
        .then(async (response) => {
            let gravatar = "";

            if (response.status !== 200) {
                return Promise.reject(new Error(`Failed get user profile info from: ${ServiceResourcesEndpoint.me}`));
            }
            if (_.isEmpty(response.data.userImage) && !response.data.profileUrl) {
                gravatar = await findGravatar(response.data.emails);
            }

            const profileImage = response.data.profileUrl ? response.data.profileUrl : gravatar;

            const profileResponse: BasicProfileInterface = {
                emails: response.data.emails || "",
                name: response.data.name || { givenName: "", familyName: "" },
                organisation: response.data[orgKey] ? response.data[orgKey].organization : "",
                phoneNumbers: response.data.phoneNumbers || [],
                profileUrl: response.data.profileUrl || "",
                responseStatus: response.status || null,
                roles: response.data.roles || [],
                userImage: response.data.userImage || profileImage,
                userName: response.data.userName || "",
                ...response.data
            };

            return Promise.resolve(profileResponse);
        })
        .catch((error) => {
            // Check if the API responds with a `500` error, if it does,
            // navigate the user to the login error page.
            if (
                error.response &&
                error.response.data &&
                error.response.data.status &&
                error.response.data.status === "500"
            ) {
                store.dispatch(toggleSCIMEnabled(false));

                // Navigate to login error page.
                history.push(ApplicationConstants.LOGIN_ERROR_PAGE_PATH);
            }

            return Promise.reject(error);
        });
};

/**
 * Update the required details of the user profile.
 *
 * @param {object} info.
 * @return {Promise<any>} a promise containing the response.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const updateProfileInfo = (info: object): Promise<any> => {
    const requestConfig = {
        data: info,
        headers: {
            "Access-Control-Allow-Origin": GlobalConfig.clientHost,
            "Content-Type": "application/scim+json"
        },
        method: HttpMethods.PUT,
        url: ServiceResourcesEndpoint.me
    };

    return httpClient
        .request(requestConfig)
        .then((response) => {
            if (response.status !== 200) {
                return Promise.reject(
                    new Error(`Failed update user profile info with: ${ServiceResourcesEndpoint.me}`)
                );
            }
            return Promise.resolve(response);
        })
        .catch((error) => {
            return Promise.reject(error);
        });
};

/**
 * Retrieve the profile schemas of the user claims of the currently authenticated user.
 *
 * @return {Promise<any>} a promise containing the response.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const getProfileSchemas = (): Promise<any> => {
    const requestConfig = {
        headers: {
            "Access-Control-Allow-Origin": GlobalConfig.clientHost,
            "Content-Type": "application/json"
        },
        data: {
            filter: "default"
        },
        method: HttpMethods.GET,
        url: ServiceResourcesEndpoint.profileSchemas
    };

    return httpClient
        .request(requestConfig)
        .then((response) => {
            if (response.status !== 200) {
                return Promise.reject(new Error("Failed get user schemas"));
            }
            return Promise.resolve(response.data.Resources as ProfileSchema[]);
        })
        .catch((error) => {
            return Promise.reject(error);
        });
};
