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

/**
 * Application settings key in local storage.
 * @constant
 * @type {string}
 * @default
 */
export const APPLICATION_SETTINGS_STORAGE_KEY = "application_settings";

/**
 * Primary user store identifier.
 * @constant
 * @type {string}
 * @default
 */
export const PRIMARY_USER_STORE_IDENTIFIER = "PRIMARY";

/**
 * Path to the login error page.
 * @constant
 * @type {string}
 * @default
 */
export const LOGIN_ERROR_PAGE_PATH = "/login-error";

/**
 * Path to the applications page.
 * @constant
 * @type {string}
 * @default
 */
export const APPLICATIONS_PAGE_PATH = "/applications";

/**
 * User portal application identifier.
 * @constant
 * @type {string}
 * @default
 */
export const USER_PORTAL_IDENTIFIER = "This is the user portal application.";

/**
 * Error description when the user selects no in the logout prompt
 * @constant
 * @type {string}
 * @default
 */
export const USER_DENIED_LOGOUT_REQUEST = "End User denied the logout request";

/**
 * Error description when the user denies consent to the app
 * @constant
 * @type {string}
 * @default
 */
export const USER_DENIED_CONSENT = "User denied the consent";

/**
 * Key of the time at which an auth error occurred in the session storage
 * @constant
 * @type {string}
 * @default
 */
export const AUTH_ERROR_TIME = "authErrorTime";
