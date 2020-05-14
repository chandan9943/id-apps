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

import { AxiosHttpClient } from "@cicis/http";
import { GlobalConfig, ServiceResourcesEndpoint } from "../configs";
import { BasicProfileInterface, HttpMethods, ProfileSchema } from "../models";

/**
 * Get an axios instance.
 *
 * @type {AxiosHttpClientInstance}
 */
const httpClient = AxiosHttpClient.getInstance();

/**
 * Retrieve the user information through user id.
 *
 * @return {Promise<any>} a promise containing the response.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const getUserDetails = (id: string): Promise<any> => {
    const requestConfig = {
        headers: {
            "Access-Control-Allow-Origin": GlobalConfig.clientHost,
            "Content-Type": "application/json"
        },
        method: HttpMethods.GET,
        url: ServiceResourcesEndpoint.users + "/" + id
    };

    return httpClient
        .request(requestConfig)
        .then((response) => {
            return Promise.resolve(response.data as BasicProfileInterface);
        })
        .catch((error) => {
            return Promise.reject(`Failed to retrieve user information - ${error}`);
        });
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
            "Accept": "application/json",
            "Access-Control-Allow-Origin": GlobalConfig.clientHost,
            "Content-Type": "application/scim+json"
        },
        method: HttpMethods.GET,
        url: ServiceResourcesEndpoint.me
    };

    return httpClient
        .request(requestConfig)
        .then(async (response) => {
            const profileResponse: BasicProfileInterface = {

                userName: response.data.userName || "",
                emails: response.data.emails[0]  || "",
                id: response.data.id || "",
                name: response.data.name || { givenName: "", familyName: "" },
                phoneNumbers: response.data.phoneNumbers || [],
                addresses: response.data.address || [],
                displayName: response.data.displayName,
                title: response.data.title,
                "urn:ietf:params:scim:schemas:extension:ibm:2.0:User": response.data["urn:ietf:params:scim:schemas:extension:ibm:2.0:User"],
                meta: response.data.meta,
                externalId: response.data.externalId,
                groups: response.data.groups[0],
                active: response.data.active,
                urnietfparamsscimschemasextensionenterprise20User: response.data.urnietfparamsscimschemasextensionenterprise20User,
                schemas: response.data.schemas
            };
            return Promise.resolve(profileResponse);
        })
        .catch((error) => {
            return Promise.reject(`Failed to retrieve user profile information - ${error}`);
        });
};

/**
 * Update the required details of the user profile.
 *
 * @param {object} user.
 * @return {Promise<any>} a promise containing the response.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const updateProfileInfo = (userID: string, data: BasicProfileInterface): Promise<any> => {

    const requestConfig = {
        data,
        headers: {
            "Access-Control-Allow-Origin": GlobalConfig.clientHost,
            "Content-Type": "application/scim+json"
        },
        method: HttpMethods.PUT,
        url: ServiceResourcesEndpoint.users + "/" + userID
    };

    return httpClient
        .request(requestConfig)
        .then((response) => {
            return Promise.resolve(response);
        })
        .catch((error) => {
            return Promise.reject(`Failed to update the profile info - ${error}`);
        });
};

/**
 * Update the password of details of the user.
 *
 * @param {object} user.
 * @return {Promise<any>} a promise containing the response.
 */
export const updateUserPassword = (userId: string, password: string): Promise<any> => {

    const data = {
        Operations: [
            {
                value: {
                    "password": password,
                    "urn:ietf:params:scim:schemas:extension:ibm:2.0:Notification": {
                        "notifyType": "EMAIL",
                        "notifyPassword": false,
                        "notifyManager": false
                    }
                },
                op: "replace"
            }
        ],
        schemas: [
            "urn:ietf:params:scim:api:messages:2.0:PatchOp"
        ]
    }

    const requestConfig = {
        data,
        headers: {
            "Access-Control-Allow-Origin": GlobalConfig.clientHost,
            "Content-Type": "application/scim+json"
        },
        method: HttpMethods.PATCH,
        url: ServiceResourcesEndpoint.users + "/" + userId +"/passwordResetter"
    };

    return httpClient
        .request(requestConfig)
        .then((response) => {
            return Promise.resolve(response);
        })
        .catch((error) => {
            return Promise.reject(`Failed to update the profile info - ${error}`);
        });
};

/**
 * Update the required details of the user profile.
 *
 * @param {object} user.
 * @return {Promise<any>} a promise containing the response.
 */
export const updateUserInfo = (userId: string, data: object): Promise<any> => {

    const requestConfig = {
        data,
        headers: {
            "Access-Control-Allow-Origin": GlobalConfig.clientHost,
            "Content-Type": "application/json"
        },
        method: HttpMethods.PATCH,
        url: ServiceResourcesEndpoint.users + "/" + userId
    };

    return httpClient
        .request(requestConfig)
        .then((response) => {
            return Promise.resolve(response.data as BasicProfileInterface);
        })
        .catch((error) => {
            return Promise.reject(`Failed to update the profile info - ${error}`);
        });
};


/**
 * Retrieve the profile schemas of the user claims of the currently authenticated user.
 *
 * @return {Promise<any>} a promise containing the response.
 */
export const getProfileSchemas = (): Promise<any> => {
    const requestConfig = {
        headers: {
            "Access-Control-Allow-Origin": GlobalConfig.clientHost,
            "Content-Type": "application/json"
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
