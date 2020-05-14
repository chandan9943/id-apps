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

import { action } from "@storybook/addon-actions";
import { GravatarLogo, ReactLogo } from "@cicis/theme";
import React from "react";
import { LabeledCard, SelectionCard } from "../../../src";
import { meta } from "./card.stories.meta";

export default {
    parameters: {
        component: SelectionCard,
        componentSubtitle: meta.description,
    },
    title: "Components API/Components/Card"
};

/**
 * Story to display selection card
 * @return {any}
 */
export const Selection = () => (
        <SelectionCard
            id="1"
            image={ GravatarLogo }
            header="Header"
            description="This is a description."
            onClick={ action("Clicked on the card.") }
        />
);

Selection.story = {
    parameters: {
        docs: {
            storyDescription: meta.stories[ 1 ].description,
        },
    }
};

/**
 * Story to display labeled card
 * @return {any}
 */
export const Labeled = () => (
    <LabeledCard
        label="React"
        image={ ReactLogo }
    />
);

Labeled.story = {
    parameters: {
        docs: {
            storyDescription: meta.stories[ 2 ].description,
        },
    }
};
