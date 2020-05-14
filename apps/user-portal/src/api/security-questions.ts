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

import { AxiosHttpClient } from "@cicis/http";
import { GlobalConfig, ServiceResourcesEndpoint } from "../configs";
import { HttpMethods } from "../models";

/**
 * Get an axios instance.
 *
 * @type {AxiosHttpClientInstance}
 */
const httpClient = AxiosHttpClient.getInstance();

/**
 * Fetch the configured security questions of the user.
 *
 * @return {Promise<any>} a promise containing the response.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const getSecurityQs = (): Promise<any> => {
    const headers = {
        "Accept": "*/*",
        "Access-Control-Allow-Origin": GlobalConfig.clientHost
    };

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const getQuestions = (): any => {
        const requestConfig = {
            headers,
            method: HttpMethods.GET,
            url: ServiceResourcesEndpoint.challenges
        };

        return httpClient.request(requestConfig);
    };

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const getAnswers = (): any => {
        const requestConfig = {
            headers,
            method: HttpMethods.GET,
            url: ServiceResourcesEndpoint.challengeAnswers
        };

        return httpClient.request(requestConfig);
    };

    return httpClient.all([ getQuestions(), getAnswers() ])
        .then(httpClient.spread((questions, answers) => {
            if (questions.status !== 200 && answers.status !== 200) {
                return Promise.reject(new Error("Failed to get security questions and answers"));
            }
            return Promise.resolve([ questions.data, answers.data ]);
        }));
};

/**
 * Add the user's security questions.
 *
 * @param {object} data the new set of challenge questions and the answers.
 * @return {Promise<any>} a promise containing the response.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const addSecurityQs = (data: object): Promise<any> => {
    const requestConfig = {
        data,
        headers: {
            "Accept": "*/*",
            "Access-Control-Allow-Origin": GlobalConfig.clientHost
        },
        method: HttpMethods.POST,
        url: ServiceResourcesEndpoint.challengeAnswers
    };

    return httpClient.request(requestConfig)
        .then((response) => {
            if (response.status !== 201) {
                return Promise.reject(new Error("Failed to add security questions"));
            }
            return Promise.resolve(response.status);
        })
        .catch((error) => {
            return Promise.reject(`Failed to add the security question - ${ error }`);
        });
};

/**
 * Update the user's security questions.
 *
 * @param {object} data the new set of challenge questions and the answers.
 * @return {Promise<any>} a promise containing the response.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const updateSecurityQs = (data: object): Promise<any> => {
    const requestConfig = {
        data,
        headers: {
            "Accept": "*/*",
            "Access-Control-Allow-Origin": GlobalConfig.clientHost
        },
        method: HttpMethods.PUT,
        url: ServiceResourcesEndpoint.challengeAnswers
    };

    return httpClient.request(requestConfig)
        .then((response) => {
            if (response.status !== 200) {
                return Promise.reject(new Error("Failed to update security questions."));
            }
            return Promise.resolve(response);
        })
        .catch((error) => {
            return Promise.reject(`Failed to update the security question - ${ error }`);
        });
};
