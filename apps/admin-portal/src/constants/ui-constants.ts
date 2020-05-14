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

/**
 * Class containing ui constants.
 */
export class UIConstants {

    /**
     * Private constructor to avoid object instantiation from outside
     * the class.
     *
     * @hideconstructor
     */
    /* eslint-disable @typescript-eslint/no-empty-function */
    private constructor() { }

    /**
     * Default header height to be used in state initialisations
     * @constant
     * @type {number}
     */
    public static readonly DEFAULT_HEADER_HEIGHT = 59;

    /**
     * Default footer height to be used in state initialisations
     * @constant
     * @type {number}
     */
    public static readonly DEFAULT_FOOTER_HEIGHT = 60;

    /**
     * Constant to handle dashboard layout's desktop content top spacing.
     * @constant
     * @type {number}
     */
    public static readonly DASHBOARD_LAYOUT_DESKTOP_CONTENT_TOP_SPACING: number = 0;

    /**
     * `Gravatar` website URL.
     * @constant
     * @type {string}
     * @default
     */
    public static readonly GRAVATAR_URL: string = "https://www.gravatar.com";

    /**
     * Interval to dismiss the alerts.
     * @constant
     * @type {number}
     */
    public static readonly ALERT_DISMISS_INTERVAL: number = 5;
}
