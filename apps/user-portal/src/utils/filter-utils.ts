/**
 * Copyright (c) 2020, cic (http://www.cic.org) All Rights Reserved.
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

import Axios from "axios";
import { Route, routes } from "../configs";

/**
 * Returns true if a given key in the JSON object is set to true
 * @param appConfig
 * @param key
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const checkEnabled = (appConfig: any, key: string): boolean => {
    if (appConfig[key] === undefined) {
        return true;
    } else if (typeof appConfig[key] === "boolean" && appConfig[key]) {
        return true;
    } else if (typeof appConfig[key] === "object" && appConfig[key].enabled) {
        return true;
    } else {
        return false;
    }
};

/**
 * This filters the routes based on the application configuration
 * @param appConfig
 */
export const filteredRoutes = (appConfig): Route[] => {
    return routes.filter((route: Route) => {
        return checkEnabled(appConfig, route.id);
    });
};

/**
 * This obtains the app.config.json file from the server
 */
export const getAppConfig = (): Promise<any> => {
    return Axios.get(`/${APP_BASENAME}/app.config.json`).then((response) => {
        return Promise.resolve(response.data);
    });
};
