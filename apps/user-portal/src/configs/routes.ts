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

import * as ApplicationConstants from "../constants/application-constants";
import * as TokenConstants from "../constants/token-constants";
import {
    AccountSecurityPage,
    ApplicationsPage,
    LoginErrorPage,
    OperationsPage,
    OverviewPage,
    PageNotFound,
    PersonalInfoPage,
    PrivacyPage
} from "../pages";

/**
 * Interface to handle route types.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Route {
    component: any;
    icon?: string;
    id: string;
    name: string;
    path: string;
    protected: boolean;
    scope?: string;
    showOnSidePanel: boolean;
}

/**
 * Routes array.
 */
const ROUTES: Route[] = [
    {
        component: OverviewPage,
        icon: "overview",
        id: "overview",
        name: "common:overview",
        path: "/overview",
        protected: true,
        showOnSidePanel: true
    },
    {
        component: ApplicationsPage,
        icon: "apps",
        id: "applications",
        name: "common:applications",
        path: ApplicationConstants.APPLICATIONS_PAGE_PATH,
        protected: true,
        showOnSidePanel: true
    },
    {
        component: PersonalInfoPage,
        icon: "personal",
        id: "personalInfo",
        name: "common:personalInfo",
        path: "/personal-info",
        protected: true,
        showOnSidePanel: true
    },
    {
        component: AccountSecurityPage,
        icon: "security",
        id: "security",
        name: "common:security",
        path: "/security",
        protected: true,
        showOnSidePanel: true
    },
    {
        component: OperationsPage,
        icon: "operations",
        id: "operations",
        name: "common:operations",
        path: "/operations",
        protected: true,
        scope: TokenConstants.HUMAN_TASK_SCOPE,
        showOnSidePanel: true
    },
    {
        component: PrivacyPage,
        icon: "security",
        id: "privacy",
        name: "common:privacy",
        path: "/privacy",
        protected: true,
        showOnSidePanel: false
    },
    {
        component: LoginErrorPage,
        id: "loginError",
        name: "Login error",
        path: ApplicationConstants.LOGIN_ERROR_PAGE_PATH,
        protected: true,
        showOnSidePanel: false
    },
    {
        component: PageNotFound,
        id: "404",
        name: "404",
        path: "*",
        protected: true,
        showOnSidePanel: false
    }
];

export const routes = ROUTES;
