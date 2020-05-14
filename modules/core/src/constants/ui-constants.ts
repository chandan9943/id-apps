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
    private constructor() { }

    /**
     * `Gravatar` website URL.
     * @constant
     * @type {string}
     */
    public static readonly GRAVATAR_URL: string = "https://www.gravatar.com";

    /**
     * Constant to handle the default dashboard layout's desktop content top spacing.
     * @constant
     * @type {number}
     */
    public static readonly DEFAULT_DASHBOARD_LAYOUT_DESKTOP_CONTENT_TOP_SPACING: number = 0;

    /**
     * Constant to handle the default side panel item height.
     * @constant
     * @type {number}
     */
    public static readonly DEFAULT_SIDE_PANEL_ITEM_HEIGHT: number = 75;
}
