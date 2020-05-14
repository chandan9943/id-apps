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
 *
 */

import { StoryCategories } from "../../hierarchy";
import { StoryMetaInterface } from "../../models";

export const meta: StoryMetaInterface = {
    components: [ "Alert" ],
    description: "Alert component to show success, error, warning and info notifications on the front end dashboards.",
    stories: [
        {
            description: "Alert to show success messages.",
            title: "Success",
        },
        {
            description: "Alert to show error messages.",
            title: "Error"
        },
        {
            description: "Alert to show warning messages.",
            title: "Warning"
        },
        {
            description: "Alert to show info messages.",
            title: "Info"
        },
        {
            description: "Play around with different props to dynamically interact with the alert component.",
            title: "Playground"
        }
    ],
    title: StoryCategories.COMPONENTS + "/Alert",
};
