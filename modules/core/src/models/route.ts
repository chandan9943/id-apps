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

import React from "react";

/**
 * Interface to handle routes.
 */
export interface RouteInterface {
    /**
     * Component to be displayed.
     */
    component: React.ReactNode;

    /**
     * Child routes.
     */
    children?: ChildRouteInterface[];

    /**
     * Icon to be displayed on the side panel.
     */
    icon?: any;

    /**
     * A key to uniquely identify the route with
     */
    id: string;

    /**
     * Name to be displayed on the side panel.
     */
    name: string;

    /**
     * Router path.
     */
    path?: string;

    /**
     * If the route is protected or not.
     */
    protected: boolean;

    /**
     * Redirect path.
     */
    redirectTo?: string;

    /**
     * Should the item be displayed on the side panel.
     */
    showOnSidePanel: boolean;
}

/**
 * Interface to handle child routes.
 */
export interface ChildRouteInterface extends RouteInterface {
    /**
     * Nesting level.
     */
    level: number;
}
