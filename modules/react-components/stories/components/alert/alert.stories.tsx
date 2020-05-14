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

import { boolean, number, select, text, withKnobs } from "@storybook/addon-knobs";
import { AlertLevels } from "@cicis/core/models";
import React, { useState } from "react";
import { Alert } from "../../../src";
import { meta } from "./alert.stories.meta";

export default {
    decorators: [ withKnobs ],
    parameters: {
        component: Alert,
        componentSubtitle: meta.description,
    },
    title: "Components API/Components/Alert"
};

/**
 * Story to display all the alert variations.
 * @return {any}
 */
export const All = () => {
    const [ alertSystem, setAlertSystem ] = useState(null);

    const handleAlertSystemInitialize = (system) => {
        setAlertSystem(system);
    };

    return (
        <>
            <Alert
                absolute={ true }
                dismissInterval={ 100000 }
                alertsPosition="br"
                alertSystem={ alertSystem }
                alert={ {
                    description: "This is a success message.",
                    level: AlertLevels.SUCCESS,
                    message: "Success Message"
                } }
                onAlertSystemInitialize={ handleAlertSystemInitialize }
                withIcon={ true }
            />
            <Alert
                absolute={ true }
                dismissInterval={ 100000 }
                alertsPosition="br"
                alertSystem={ alertSystem }
                alert={ {
                    description: "This is an error message.",
                    level: AlertLevels.ERROR,
                    message: "Error Message"
                } }
                onAlertSystemInitialize={ handleAlertSystemInitialize }
                withIcon={ true }
            />
            <Alert
                absolute={ true }
                dismissInterval={ 100000 }
                alertsPosition="br"
                alertSystem={ alertSystem }
                alert={ {
                    description: "This is a warning message.",
                    level: AlertLevels.WARNING,
                    message: "Warning Message"
                } }
                onAlertSystemInitialize={ handleAlertSystemInitialize }
                withIcon={ true }
            />
            <Alert
                absolute={ true }
                dismissInterval={ 100000 }
                alertsPosition="br"
                alertSystem={ alertSystem }
                alert={ {
                    description: "This is an info message.",
                    level: AlertLevels.INFO,
                    message: "Warning Message"
                } }
                onAlertSystemInitialize={ handleAlertSystemInitialize }
                withIcon={ true }
            />
        </>
    );
};

/**
 * Story to display a success alert.
 * @return {any}
 */
export const Success = () => {
    const [ alertSystem, setAlertSystem ] = useState(null);

    const handleAlertSystemInitialize = (system) => {
        setAlertSystem(system);
    };

    return (
        <Alert
            absolute={ true }
            dismissInterval={ 100000 }
            alertsPosition="br"
            alertSystem={ alertSystem }
            alert={ {
                description: "This is a success message.",
                level: AlertLevels.SUCCESS,
                message: "Success Message"
            } }
            onAlertSystemInitialize={ handleAlertSystemInitialize }
            withIcon={ true }
        />
    );
};

Success.story = {
    parameters: {
        docs: {
            storyDescription: meta.stories[ 0 ].description,
        },
    }
};

/**
 * Story to display an error alert.
 * @return {any}
 */
export const Error = () => {
    const [ alertSystem, setAlertSystem ] = useState(null);

    const handleAlertSystemInitialize = (system) => {
        setAlertSystem(system);
    };

    return (
        <Alert
            absolute={ true }
            dismissInterval={ 100000 }
            alertsPosition="br"
            alertSystem={ alertSystem }
            alert={ {
                description: "This is an error message.",
                level: AlertLevels.ERROR,
                message: "Error Message"
            } }
            onAlertSystemInitialize={ handleAlertSystemInitialize }
            withIcon={ true }
        />
    );
};

Error.story = {
    parameters: {
        docs: {
            storyDescription: meta.stories[ 1 ].description,
        },
    }
};

/**
 * Story to display a warning alert.
 * @return {any}
 */
export const Warning = () => {
    const [ alertSystem, setAlertSystem ] = useState(null);

    const handleAlertSystemInitialize = (system) => {
        setAlertSystem(system);
    };

    return (
        <Alert
            absolute={ true }
            dismissInterval={ 100000 }
            alertsPosition="br"
            alertSystem={ alertSystem }
            alert={ {
                description: "This is a warning message.",
                level: AlertLevels.WARNING,
                message: "Warning Message"
            } }
            onAlertSystemInitialize={ handleAlertSystemInitialize }
            withIcon={ true }
        />
    );
};

Warning.story = {
    parameters: {
        docs: {
            storyDescription: meta.stories[ 2 ].description,
        },
    }
};

/**
 * Story to display an info alert.
 * @return {any}
 */
export const Info = () => {
    const [ alertSystem, setAlertSystem ] = useState(null);

    const handleAlertSystemInitialize = (system) => {
        setAlertSystem(system);
    };

    return (
        <Alert
            absolute={ true }
            dismissInterval={ 100000 }
            alertsPosition="br"
            alertSystem={ alertSystem }
            alert={ {
                description: "This is an info message.",
                level: AlertLevels.INFO,
                message: "Info Message"
            } }
            onAlertSystemInitialize={ handleAlertSystemInitialize }
            withIcon={ true }
        />
    );
};

Info.story = {
    parameters: {
        docs: {
            storyDescription: meta.stories[ 3 ].description,
        },
    }
};

/**
 * Story to enable user to dynamically interact with the alert component.
 * @return {any}
 */
export const Playground = () => {
    const [ alertSystem, setAlertSystem ] = useState(null);

    const handleAlertSystemInitialize = (system) => {
        setAlertSystem(system);
    };

    return (
        <Alert
            absolute={ boolean("Absolute position", true) }
            dismissInterval={ number("Dismiss interval", 100000) }
            alertsPosition={
                select(
                    "Position",
                    {
                        "Bottom center": "bc",
                        "Bottom left": "bl",
                        "Bottom right": "br",
                        "Top center": "tc",
                        "Top left": "tl",
                        "Top right": "tr"
                    },
                    "br"
                )
            }
            alertSystem={ alertSystem }
            alert={ {
                description: text("Description", "This is a success message."),
                level: select(
                    "Alert level",
                    {
                        Error: AlertLevels.ERROR,
                        Info: AlertLevels.INFO,
                        Success: AlertLevels.SUCCESS,
                        Warning: AlertLevels.WARNING
                    },
                    AlertLevels.SUCCESS
                ),
                message: text("Message", "Success message"),
            } }
            onAlertSystemInitialize={ handleAlertSystemInitialize }
            withIcon={ boolean("With icon", true) }
        />
    );
};

Playground.story = {
    parameters: {
        docs: {
            storyDescription: meta.stories[ 4 ].description,
        },
    }
};
