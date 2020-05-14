/**
 * Copyright (c) 2020, cic Inc. (http://www.cic.org) All Rights Reserved.
 *
 * cic Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the License); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * AS IS BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 *  Captures claim management properties.
 */
export interface Claim {
    id?: string;
    claimURI: string;
    dialectURI?: string;
    description: string;
    displayOrder: number;
    displayName: string;
    readOnly: boolean;
    regEx: string;
    required: boolean;
    supportedByDefault: boolean;
    attributeMapping: AttributeMapping[];
    properties?: Property[];
}

export interface AttributeMapping {
    mappedAttribute: string;
    userstore: string;
}

export interface Property{
    key: string;
    value: string;
}

export interface ClaimDialect {
    id: string;
    dialectURI: string;
    link: Link;
}

interface Link {
    href: string;
    rel: string;
}

/**
 *  Dialect other than local dialect.
 */
export interface ExternalClaim {
    id: string;
    claimURI: string;
    claimDialectURI: string;
    mappedLocalClaimURI: string;
}

export interface AddExternalClaim {
    claimURI: string;
    mappedLocalClaimURI: string;
}

export interface ClaimsGetParams {
    limit: number;
    offset: number;
    filter: string;
    sort: string;
    attributes?: string;
}
