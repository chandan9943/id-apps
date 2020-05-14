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

import { AlertInterface } from "../../../models";

/**
 * Global action types.
 */
export enum GlobalActionTypes {
    SHOW_GLOBAL_LOADER = "SHOW_GLOBAL_LOADER",
    HIDE_GLOBAL_LOADER = "HIDE_GLOBAL_LOADER",
    TOGGLE_APPLICATIONS_PAGE_VISIBILITY = "TOGGLE_APPLICATIONS_PAGE_VISIBILITY",
    INITIALIZE_ALERT_SYSTEM = "INITIALIZE_ALERT_SYSTEM",
    ADD_ALERT = "ADD_ALERT"
}

/**
 * Global base action interface.
 */
interface GlobalBaseAction {
    type: GlobalActionTypes;
}

/**
 * Show global loader action interface.
 */
export interface ShowGlobalLoaderAction extends GlobalBaseAction {
    type: GlobalActionTypes.SHOW_GLOBAL_LOADER;
}

/**
 * Hide global loader action interface.
 */
export interface HideGlobalLoaderAction extends GlobalBaseAction {
    type: GlobalActionTypes.HIDE_GLOBAL_LOADER;
}

/**
 * Applications page visibility toggle action interface.
 */
export interface ToggleApplicationsPageVisibilityAction extends GlobalBaseAction {
    payload: boolean;
    type: GlobalActionTypes.TOGGLE_APPLICATIONS_PAGE_VISIBILITY;
}

/**
 * Alert system initialize action interface.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface InitializeAlertSystemAction extends GlobalBaseAction {
    payload: any;
    type: GlobalActionTypes.INITIALIZE_ALERT_SYSTEM;
}

/**
 * Add alert action interface.
 */
export interface AddAlertAction extends GlobalBaseAction {
    payload: AlertInterface;
    type: GlobalActionTypes.ADD_ALERT;
}

/**
 * Export action interfaces.
 */
export type GlobalActions = ShowGlobalLoaderAction
    | HideGlobalLoaderAction
    | ToggleApplicationsPageVisibilityAction
    | InitializeAlertSystemAction
    | AddAlertAction;
