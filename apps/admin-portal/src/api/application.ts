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

import { IdentityAppsApiException } from "@cicis/core/exceptions";
import { AxiosHttpClient } from "@cicis/http";
import { AxiosError, AxiosResponse } from "axios";
import { GlobalConfig, ServiceResourcesEndpoint } from "../configs";
import { ApplicationManagementConstants } from "../constants";
import {
    ApplicationBasicInterface,
    ApplicationInterface,
    ApplicationListInterface,
    AuthProtocolMetaListItemInterface,
    Claim,
    ClaimDialect,
    ExternalClaim,
    HttpMethods,
    OIDCDataInterface,
    SupportedAuthProtocolMetaTypes,
    SupportedAuthProtocolTypes
} from "../models";

/**
 * TODO: move the error messages to a constant file.
 */

/**
 * Get an axios instance.
 *
 * @type {AxiosHttpClientInstance}.
 */
const httpClient = AxiosHttpClient.getInstance();

/**
 * Retrieve claims in local dialect.
 *
 * @return {Promise<any>} a promise containing the response.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const getLocalClaims = (): Promise<any> => {
    const requestConfig = {
        headers: {
            "Accept": "*/*",
            "Access-Control-Allow-Origin": GlobalConfig.clientHost,
            "Content-Type": "application/json"
        },
        method: HttpMethods.GET,
        url: ServiceResourcesEndpoint.claims + "/local/claims"
    };

    return httpClient.request(requestConfig)
        .then((response) => {
            if (response.status !== 200) {
                return Promise.reject(new Error("Failed to get local claims from: "));
            }
            return Promise.resolve(response.data as Claim);
        }).catch((error) => {
            return Promise.reject(error);
        });
};

/**
 * Retrieve claims dialects.
 *
 * @return {Promise<any>} a promise containing the response.
 */
export const getClaimDialect = (): Promise<any> => {
    const requestConfig = {
        headers: {
            "Accept": "*/*",
            "Access-Control-Allow-Origin": GlobalConfig.clientHost,
            "Content-Type": "application/json"
        },
        method: HttpMethods.GET,
        url: ServiceResourcesEndpoint.claims
    };

    return httpClient.request(requestConfig)
        .then((response) => {
            if (response.status !== 200) {
                return Promise.reject(new Error("Failed to get claim dialect from: "));
            }
            return Promise.resolve(response.data as ClaimDialect);
        }).catch((error) => {
            return Promise.reject(error);
        });
};

/**
 * Gets claims in other dialects.
 *
 * @param dialectID Selected dialectID.
 *
 * @return {Promise<any>} A promise containing the response.
 */
export const getExternalClaims = (dialectID: string): Promise<any> => {
    const requestConfig = {
        headers: {
            "Accept": "*/*",
            "Access-Control-Allow-Origin": GlobalConfig.clientHost,
            "Content-Type": "application/json"
        },
        method: HttpMethods.GET,
        url: ServiceResourcesEndpoint.claims + "/" + dialectID + "/claims"
    };

    return httpClient.request(requestConfig)
        .then((response) => {
            if (response.status !== 200) {
                return Promise.reject(new Error("Failed to get external claims: "));
            }
            return Promise.resolve(response.data as ExternalClaim);
        }).catch((error) => {
            return Promise.reject(error);
        });
};

/**
 * Gets the basic information about the application.
 *
 * @param id ID of the application.
 *
 * @return {Promise<any>} A promise containing the response.
 */
export const getApplicationDetails = (id: string): Promise<any> => {
    const requestConfig = {
        headers: {
            "Accept": "*/*",
            "Access-Control-Allow-Origin": GlobalConfig.clientHost,
            "Content-Type": "application/json"
        },
        method: HttpMethods.GET,
        url: ServiceResourcesEndpoint.applications + "/" + id
    };

    return httpClient.get(requestConfig.url, { headers: requestConfig.headers })
        .then((response) => {
            if (response.status !== 200) {
                return Promise.reject(new Error("Failed to get app from: "));
            }
            return Promise.resolve(response.data as ApplicationBasicInterface);
        }).catch((error) => {
            return Promise.reject(error);
        });
};

/**
 * Deletes an application when the relevant id is passed in.
 *
 * @param id ID of the application.
 * @return {Promise<any>} A promise containing the response.
 */
export const deleteApplication = (id: string): Promise<any> => {
    const requestConfig = {
        headers: {
            "Accept": "*/*",
            "Access-Control-Allow-Origin": GlobalConfig.clientHost,
            "Content-Type": "application/json"
        },
        method: HttpMethods.DELETE,
        url: ServiceResourcesEndpoint.applications + "/" + id
    };

    return httpClient.request(requestConfig)
        .then((response) => {
            if (response.status !== 204) {
                return Promise.reject(new Error("Failed to delete the application."));
            }
            return Promise.resolve(response);
        }).catch((error) => {
            return Promise.reject(error);
        });
};

/**
 * Updates the application with basic details.
 *
 * @param app Basic info about the application.
 *
 * @return {Promise<any>} A promise containing the response.
 */
export const updateApplicationDetails = (app: ApplicationInterface): Promise<any> => {

    const { id, ...rest } = app;

    const requestConfig = {
        data: rest,
        headers: {
            "Accept": "*/*",
            "Access-Control-Allow-Origin": GlobalConfig.clientHost,
            "Content-Type": "application/json"
        },
        method: HttpMethods.PATCH,
        url: ServiceResourcesEndpoint.applications + "/" + id
    };

    return httpClient.request(requestConfig)
        .then((response) => {
            if (response.status !== 200) {
                return Promise.reject(new Error("Failed to update application from: "));
            }
            return Promise.resolve(response.data as ApplicationBasicInterface);
        }).catch((error) => {
            return Promise.reject(error);
        });
};

/**
 * Gets the application list with limit and offset.
 *
 * @param {number} limit - Maximum Limit of the application List.
 * @param {number} offset - Offset for get to start.
 * @param {string} filter - Search filter.
 *
 * @return {Promise<ApplicationListInterface>} A promise containing the response.
 */
export const getApplicationList = (limit: number, offset: number,
                                   filter: string): Promise<ApplicationListInterface> => {
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
        url: ServiceResourcesEndpoint.applications
    };

    return httpClient.request(requestConfig)
        .then((response) => {
            if (response.status !== 200) {
                return Promise.reject(new Error("Failed to get application list from: "));
            }
            return Promise.resolve(response.data as ApplicationListInterface);
        }).catch((error) => {
            return Promise.reject(error);
        });
};

/**
 * Gets the available inbound protocols.
 *
 * @param customOnly If true only returns custom protocols.
 */
export const getAvailableInboundProtocols = (customOnly: boolean): Promise<AuthProtocolMetaListItemInterface[]> => {
    const requestConfig = {
        headers: {
            "Accept": "*/*",
            "Access-Control-Allow-Origin": GlobalConfig.clientHost,
            "Content-Type": "application/json"
        },
        method: HttpMethods.GET,
        url: ServiceResourcesEndpoint.applications + "/meta/inbound-protocols?customOnly=" + customOnly
    };

    return httpClient.request(requestConfig)
        .then((response) => {
            if (response.status !== 200) {
                return Promise.reject(new Error("Failed to get Inbound protocols from: "));
            }
            return Promise.resolve(response.data as AuthProtocolMetaListItemInterface[]);
        }).catch((error) => {
            return Promise.reject(error);
        });
};

/**
 * Get all the metadata related to the passed in auth protocol.
 *
 * @param {SupportedAuthProtocolMetaTypes} protocol - The protocol to get the meta.
 * @return {Promise<T>} Promise of type T.
 * @throws {IdentityAppsApiException}
 */
export const getAuthProtocolMetadata = <T>(protocol: SupportedAuthProtocolMetaTypes): Promise<T> => {
    const requestConfig = {
        headers: {
            "Accept": "*/*",
            "Access-Control-Allow-Origin": GlobalConfig.clientHost,
            "Content-Type": "application/json"
        },
        method: HttpMethods.GET,
        url: `${ ServiceResourcesEndpoint.applications}/meta/inbound-protocols/${ protocol }`
    };

    return httpClient.request(requestConfig)
        .then((response: AxiosResponse) => {
            if (response.status !== 200) {
                throw new IdentityAppsApiException(
                    ApplicationManagementConstants.AUTH_PROTOCOL_METADATA_INVALID_STATUS_CODE_ERROR,
                    null,
                    response.status,
                    response.request,
                    response,
                    response.config);
            }

            return Promise.resolve(response.data as T);
        }).catch((error: AxiosError) => {
            throw new IdentityAppsApiException(
                ApplicationManagementConstants.AUTH_PROTOCOL_METADATA_FETCH_ERROR,
                error.stack,
                error.code,
                error.request,
                error.response,
                error.config);
        });
};

/**
 * Gets the application's OIDC data.
 *
 * @param id Application ID
 */
export const getOIDCData = (id: string): Promise<any> => {
    const requestConfig = {
        headers: {
            "Accept": "*/*",
            "Access-Control-Allow-Origin": GlobalConfig.clientHost,
            "Content-Type": "application/json"
        },
        method: HttpMethods.GET,
        url: ServiceResourcesEndpoint.applications + "/" + id + "/inbound-protocols/oidc"
    };

    return httpClient.request(requestConfig)
        .then((response) => {
            if (response.status !== 200) {
                return Promise.reject(new Error("Failed to retrieve OIDC data from: "));
            }
            return Promise.resolve(response.data as OIDCDataInterface);
        }).catch((error) => {
            return Promise.reject(error);
        });
};

/**
 * Generic function to get the relevant inbound protocol config
 * when the path provided in the `self` attribute of the application
 * response is passed in.
 *
 * @param {string} applicationId - ID of the application.
 * @param {string} inboundProtocolId - Protocol ID.
 * @return {Promise<OIDCDataInterface>}
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const getInboundProtocolConfig = (applicationId: string, inboundProtocolId: string): Promise<any> => {
    const requestConfig = {
        headers: {
            "Accept": "*/*",
            "Access-Control-Allow-Origin": GlobalConfig.clientHost,
            "Content-Type": "application/json"
        },
        method: HttpMethods.GET,
        url: `${ ServiceResourcesEndpoint.applications }/${ applicationId }/inbound-protocols/${ inboundProtocolId }`
    };

    return httpClient.request(requestConfig)
        .then((response) => {
            if (response.status !== 200) {
                return Promise.reject(new Error("Failed to retrieve the inbound protocol config."));
            }
            return Promise.resolve(response.data);
        }).catch((error) => {
            return Promise.reject(error);
        });
};

/**
 * Updates the OIDC configuration.
 * TODO: Migrate to `updateAuthProtocolConfig` generic function.
 *
 * @param id Application ID
 * @param OIDC OIDC configuration data.
 */
export const updateOIDCData = (id: string, OIDC: object): Promise<any> => {
    const requestConfig = {
        data: OIDC,
        headers: {
            "Accept": "*/*",
            "Access-Control-Allow-Origin": GlobalConfig.clientHost,
            "Content-Type": "application/json"
        },
        method: HttpMethods.PUT,
        url: ServiceResourcesEndpoint.applications + "/" + id + "/inbound-protocols/oidc"
    };

    return httpClient.request(requestConfig)
        .then((response) => {
            if (response.status !== 200) {
                return Promise.reject(new Error("Failed to update inbound configuration"));
            }
            return Promise.resolve(response);
        }).catch((error) => {
            return Promise.reject(error);
        });
};

/**
 * Generic function to update the authentication protocol config of an application.
 *
 * @param {string} id - Application ID.
 * @param config - Protocol config.
 * @param {SupportedAuthProtocolTypes} protocol - The protocol to be updated.
 * @return {Promise<T>} Promise of type T.
 * @throws {IdentityAppsApiException}
 */
export const updateAuthProtocolConfig = <T>(id: string, config: any,
                                            protocol: SupportedAuthProtocolTypes): Promise<T> => {
    const requestConfig = {
        data: config,
        headers: {
            "Accept": "*/*",
            "Access-Control-Allow-Origin": GlobalConfig.clientHost,
            "Content-Type": "application/json"
        },
        method: HttpMethods.PUT,
        url: `${ ServiceResourcesEndpoint.applications}/${ id }/inbound-protocols/${ protocol }`
    };

    return httpClient.request(requestConfig)
        .then((response: AxiosResponse) => {
            if (response.status !== 200) {
                throw new IdentityAppsApiException(
                    ApplicationManagementConstants.AUTH_PROTOCOL_CONFIG_UPDATE_INVALID_STATUS_CODE_ERROR,
                    null,
                    response.status,
                    response.request,
                    response,
                    response.config);
            }

            return Promise.resolve(response.data as T);
        }).catch((error: AxiosError) => {
            throw new IdentityAppsApiException(
                ApplicationManagementConstants.AUTH_PROTOCOL_CONFIG_UPDATE_ERROR,
                error.stack,
                error.code,
                error.request,
                error.response,
                error.config);
        });
};

/**
 * Updates the application configuration.
 *
 * @param id Application ID
 * @param advancedConfigs Application's advanced configurations.
 */
export const updateAdvanceConfigurations = (id: string, advancedConfigs: object): Promise<any> => {
    const requestConfig = {
        data: advancedConfigs,
        headers: {
            "Accept": "*/*",
            "Access-Control-Allow-Origin": GlobalConfig.clientHost,
            "Content-Type": "application/json"
        },
        method: HttpMethods.PATCH,
        url: ServiceResourcesEndpoint.applications + "/" + id
    };

    return httpClient.request(requestConfig)
        .then((response) => {
            if (response.status !== 200) {
                return Promise.reject(new Error("Failed to update advance configuration"));
            }
            return Promise.resolve(response);
        }).catch((error) => {
            return Promise.reject(error);
        });
};

/**
 * Creates a new application.
 *
 * @param application Application settings data.
 */
export const createApplication = (application: object): Promise<any> => {
    const requestConfig = {
        data: application,
        headers: {
            "Accept": "*/*",
            "Access-Control-Allow-Origin": GlobalConfig.clientHost,
            "Content-Type": "application/json"
        },
        method: HttpMethods.POST,
        url: ServiceResourcesEndpoint.applications
    };

    return httpClient.request(requestConfig)
        .then((response) => {
            if ((response.status !== 201)) {
                return Promise.reject(new Error("Failed to create the application."));
            }
            return Promise.resolve(response);
        }).catch((error) => {
            return Promise.reject(error);
        });
};

/**
 * Updates Authentication sequence of the application.
 * @param id ID of the application
 * @param data Authentication configurations of the application.
 */
export const updateAuthenticationSequence = (id: string, data: object): Promise<any> => {
    const requestConfig = {
        data,
        headers: {
            "Accept": "*/*",
            "Access-Control-Allow-Origin": GlobalConfig.clientHost,
            "Content-Type": "application/json"
        },
        method: HttpMethods.PATCH,
        url: ServiceResourcesEndpoint.applications + "/" + id
    };

    return httpClient.request(requestConfig)
        .then((response) => {
            if (response.status !== 200) {
                return Promise.reject(new Error("Failed to update authentication sequence"));
            }
            return Promise.resolve(response);
        }).catch((error) => {
            return Promise.reject(error);
        });
};

/**
 * Regenerates the client secret.
 * Used only in OIDC flow.
 *
 * @param appId application Id
 */
export const regenerateClientSecret = (appId: string): Promise<any> => {
    const requestConfig = {
        headers: {
            "Accept": "*/*",
            "Access-Control-Allow-Origin": GlobalConfig.clientHost,
            "Content-Type": "application/json"
        },
        method: HttpMethods.POST,
        url: ServiceResourcesEndpoint.applications + "/" + appId + "inbound-protocols/oidc/regenerate-secret"
    };

    return httpClient.request(requestConfig)
        .then((response) => {
            if ((response.status !== 200)) {
                return Promise.reject(new Error("Failed to regenerate the application secret."));
            }
            return Promise.resolve(response);
        }).catch((error) => {
            return Promise.reject(error);
        });
};

/**
 * Revoke the client secret of application
 * Used only in OIDC flow.
 *
 * @param appId application ID
 */
export const revokeClientSecret = (appId: string): Promise<any> => {
    const requestConfig = {
        headers: {
            "Accept": "*/*",
            "Access-Control-Allow-Origin": GlobalConfig.clientHost,
            "Content-Type": "application/json"
        },
        method: HttpMethods.POST,
        url: ServiceResourcesEndpoint.applications + "/" + appId + "inbound-protocols/oidc/revoke"
    };

    return httpClient.request(requestConfig)
        .then((response) => {
            if ((response.status !== 200)) {
                return Promise.reject(new Error("Failed to revoke the application secret."));
            }
            return Promise.resolve(response);
        }).catch((error) => {
            return Promise.reject(error);
        });
};
