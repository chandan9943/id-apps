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
import { HttpMethods, IdentityProviderListResponseInterface, IdentityProviderResponseInterface } from "../models";

/**
 * Get an axios instance.
 *
 * @type {AxiosHttpClientInstance}.
 */
const httpClient = AxiosHttpClient.getInstance();

/**
 * Gets the IdP list with limit and offset.
 *
 * @param {number} limit - Maximum Limit of the IdP List.
 * @param {number} offset - Offset for get to start.
 * @param {string} filter - Search filter.
 *
 * @return {Promise<IdentityProviderListResponseInterface>} A promise containing the response.
 */
export const getIdentityProviderList = (limit?: number, offset?: number,
                                   filter?: string): Promise<IdentityProviderListResponseInterface> => {
    const requestConfig = {
        headers: {
            "Accept": "*/*",
            "Access-Control-Allow-Origin": GlobalConfig.clientHost,
            "Content-Type": "application/json"
        },
        method: HttpMethods.GET,
        params: {
            filter,
            limit,
            offset
        },
        url: ServiceResourcesEndpoint.identityProviders
    };

    return httpClient.request(requestConfig)
        .then((response) => {
            if (response.status !== 200) {
                return Promise.reject(new Error("Failed to get IdP list from: "));
            }
            return Promise.resolve(response.data as IdentityProviderListResponseInterface);
        }).catch((error) => {
            return Promise.reject(error);
        });
};

/**
 * Gets detail about the Identity Provider.
 *
 * @param id Identity Provider Id.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const getIdentityProviderDetail = (id: string): Promise<any> => {
    const requestConfig = {
        headers: {
            "Accept": "*/*",
            "Access-Control-Allow-Origin": GlobalConfig.clientHost,
            "Content-Type": "application/json"
        },
        method: HttpMethods.GET,
        url: ServiceResourcesEndpoint.identityProviders + "/" + id
    };

    return httpClient.request(requestConfig)
        .then((response) => {
            if (response.status !== 200) {
                return Promise.reject(new Error("Failed to get idp details from: "));
            }
            return Promise.resolve(response.data as IdentityProviderResponseInterface);
        }).catch((error) => {
            return Promise.reject(error);
        });
};

/**
 * Deletes an IdP when the relevant id is passed in.
 *
 * @param id ID of the IdP.
 * @return {Promise<any>} A promise containing the response.
 */
export const deleteIdentityProvider = (id: string): Promise<any> => {
    const requestConfig = {
        headers: {
            "Accept": "*/*",
            "Access-Control-Allow-Origin": GlobalConfig.clientHost,
            "Content-Type": "application/json"
        },
        method: HttpMethods.DELETE,
        url: ServiceResourcesEndpoint.identityProviders + "/" + id
    };

    return httpClient.request(requestConfig)
        .then((response) => {
            if (response.status !== 204) {
                return Promise.reject(new Error("Failed to delete the identity provider."));
            }
            return Promise.resolve(response);
        }).catch((error) => {
            return Promise.reject(error);
        });
};

