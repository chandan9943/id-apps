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

import { AlertLevels } from "@cicis/core/models";
import { addAlert } from "@cicis/core/store";
import { ContentLoader, Heading, Hint, SelectionCard } from "@cicis/react-components";
import _ from "lodash";
import React, { FunctionComponent, ReactElement, SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getAuthProtocolMetadata,
    getInboundProtocolConfig,
    updateAuthProtocolConfig
} from "../../api";
import {
    AuthProtocolMetaListItemInterface,
    InboundProtocolListItemInterface,
    SupportedAuthProtocolMetaTypes,
    SupportedAuthProtocolTypes
} from "../../models";
import { AppState } from "../../store";
import { setAuthProtocolMeta } from "../../store/actions";
import { InboundFormFactory } from "./forms";
import { InboundProtocolsMeta } from "./meta";
import { Divider } from "semantic-ui-react";
import { InboundProtocolLogos } from "../../configs";
import { ApplicationManagementUtils } from "../../utils";

/**
 * Proptypes for the applications settings component.
 */
interface ApplicationSettingsPropsInterface {
    /**
     * Currently editing application id.
     */
    appId: string;
    /**
     * Currently configured inbound protocols.
     */
    inboundProtocols: InboundProtocolListItemInterface[];
    /**
     * Is the application info request loading.
     */
    isLoading?: boolean;
    /**
     * Callback to update the application details.
     */
    onUpdate: (id: string) => void;
}

/**
 *  Inbound protocols and advance settings component.
 *
 * @param {ApplicationSettingsPropsInterface} props - Props injected to the component.
 * @return {React.ReactElement}
 */
export const ApplicationSettings: FunctionComponent<ApplicationSettingsPropsInterface> = (
    props: ApplicationSettingsPropsInterface
): ReactElement => {

    const {
        appId,
        inboundProtocols,
        isLoading,
        onUpdate
    } = props;

    const dispatch = useDispatch();

    const availableInboundProtocols = useSelector((state: AppState) => state.application.meta.inboundProtocols);
    const authProtocolMeta = useSelector((state: AppState) => state.application.meta.protocolMeta);

    const [ selectedInboundProtocol, setSelectedInboundProtocol ] = useState<AuthProtocolMetaListItemInterface>(null);
    const [ selectedInboundProtocolConfig, setSelectedInboundProtocolConfig ] = useState<any>(undefined);
    const [ isInboundProtocolsRequestLoading, setInboundProtocolsRequestLoading ] = useState<boolean>(false);
    const [ showProtocolSelection, setShowProtocolSelection ] = useState<boolean>(true);
    const [ isInboundProtocolConfigRequestLoading, setIsInboundProtocolConfigRequestLoading ] = useState<boolean>(true);

    /**
     * Finds the configured inbound protocol.
     */
    const findConfiguredInboundProtocol = (): void => {

        let found = false;

        for (const protocol of availableInboundProtocols) {
            if (Object.values(SupportedAuthProtocolTypes).includes(protocol.id as SupportedAuthProtocolTypes)) {

                setIsInboundProtocolConfigRequestLoading(true);

                getInboundProtocolConfig(appId, protocol.id)
                    .then((response) => {
                        found = true;

                        setSelectedInboundProtocol(protocol);
                        setSelectedInboundProtocolConfig({
                            ...selectedInboundProtocolConfig,
                            [ protocol.id ]: response
                        });
                        setShowProtocolSelection(false);
                    })
                    .catch((error) => {
                        if (error.response.status === 404) {
                            return;
                        }

                        if (error.response && error.response.data && error.response.data.description) {
                            dispatch(addAlert({
                                description: error.response.data.description,
                                level: AlertLevels.ERROR,
                                message: "Retrieval error"
                            }));

                            return;
                        }

                        dispatch(addAlert({
                            description: "An error occurred retrieving the protocol configurations.",
                            level: AlertLevels.ERROR,
                            message: "Retrieval error"
                        }));
                    })
                    .finally(() => {
                        setIsInboundProtocolConfigRequestLoading(false);
                    });
            }

            if (found) {
                break;
            }
        }
    };

    /**
     * Handles the inbound protocol selection.
     *
     * @param {React.SyntheticEvent} e - Click event.
     * @param {string} id - Identifier.
     */
    const handleInboundProtocolSelection = (e: SyntheticEvent, { id }: { id: string }): void => {
        // Return if the already selected protocol is clicked again.
        if (selectedInboundProtocol.name === id) {
            return;
        }

        setSelectedInboundProtocol([ ...availableInboundProtocols ].find((protocol) => protocol.name === id));
    };

    /**
     * Handles the inbound config form submit action.
     *
     * @param values - Form values.
     */
    const handleInboundConfigFormSubmit = (values: any): void => {
        updateAuthProtocolConfig(appId, values, selectedInboundProtocol.id as SupportedAuthProtocolTypes)
            .then(() => {
                dispatch(addAlert({
                    description: "Successfully updated the inbound protocol configurations.",
                    level: AlertLevels.SUCCESS,
                    message: "Update successful"
                }));

                onUpdate(appId);
            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.description) {
                    dispatch(addAlert({
                        description: error.response.data.description,
                        level: AlertLevels.ERROR,
                        message: "Update error"
                    }));

                    return;
                }

                dispatch(addAlert({
                    description: "An error occurred while updating inbound protocol configurations.",
                    level: AlertLevels.ERROR,
                    message: "Update error"
                }));
            });
    };

    /**
     * Resolves the corresponding protocol config form when a
     * protocol is selected.
     * @return {React.ReactElement}
     */
    const resolveInboundProtocolSettingsForm = (): ReactElement => {
        switch (selectedInboundProtocol.id as SupportedAuthProtocolTypes) {
            case SupportedAuthProtocolTypes.OIDC:
                return (
                    <InboundFormFactory
                        metadata={ authProtocolMeta[ selectedInboundProtocol.name ] }
                        initialValues={
                            selectedInboundProtocolConfig
                            && Object.prototype.hasOwnProperty.call(selectedInboundProtocolConfig,
                                selectedInboundProtocol.name)
                                ? selectedInboundProtocolConfig[ selectedInboundProtocol.name ]
                                : undefined
                        }
                        onSubmit={ handleInboundConfigFormSubmit }
                        type={ SupportedAuthProtocolTypes.OIDC }
                    />
                );
            case SupportedAuthProtocolTypes.SAML:
                return (
                    <InboundFormFactory
                        metadata={ authProtocolMeta[ selectedInboundProtocol.name ] }
                        initialValues={
                            selectedInboundProtocolConfig
                            && Object.prototype.hasOwnProperty.call(selectedInboundProtocolConfig,
                                selectedInboundProtocol.name)
                                ? selectedInboundProtocolConfig[ selectedInboundProtocol.name ]
                                : undefined
                        }
                        onSubmit={ handleInboundConfigFormSubmit }
                        type={ SupportedAuthProtocolTypes.SAML }
                    />
                );
            default:
                return null;
        }
    };

    /**
     * Use effect hook to be run on component init.
     */
    useEffect(() => {

        // Checks if the `inboundProtocols` is undefined. Terminate the rest of the operations.
        // If this check isn't done, fast navigation to the settings tab will potentially
        // break the UI.
        if (!inboundProtocols) {
            return;
        }

        if (!_.isEmpty(availableInboundProtocols)) {
            findConfiguredInboundProtocol();
            return;
        }

        setInboundProtocolsRequestLoading(true);

        ApplicationManagementUtils.getInboundProtocols(InboundProtocolsMeta, false)
            .finally(() => {
                setInboundProtocolsRequestLoading(false);
            });
    }, [ inboundProtocols, availableInboundProtocols ]);

    /**
     * Use effect hook to be run when an inbound protocol is selected.
     */
    useEffect(() => {

        // Checks if the `inboundProtocols` is undefined. Terminate the rest of the operations.
        // If this check isn't done, fast navigation to the settings tab will potentially
        // break the UI.
        if (!inboundProtocols) {
            return;
        }

        if (!selectedInboundProtocol) {
            return;
        }

        const selectedProtocol = selectedInboundProtocol.name as SupportedAuthProtocolMetaTypes;

        // Check if the metadata for the selected auth protocol is available in redux store.
        // If not, fetch the metadata related to the selected auth protocol.
        if (!Object.prototype.hasOwnProperty.call(authProtocolMeta, selectedProtocol)) {
            getAuthProtocolMetadata(selectedProtocol)
                .then((response) => {
                    dispatch(setAuthProtocolMeta(selectedProtocol, response));
                })
                .catch((error) => {
                    if (error.response && error.response.data && error.response.data.description) {
                        dispatch(addAlert({
                            description: error.response.data.description,
                            level: AlertLevels.ERROR,
                            message: "Retrieval error"
                        }));

                        return;
                    }

                    dispatch(addAlert({
                        description: "An error occurred retrieving the protocol metadata.",
                        level: AlertLevels.ERROR,
                        message: "Retrieval error"
                    }));
                });
        }
    }, [ selectedInboundProtocol ]);

    return (
        (!isLoading && !isInboundProtocolsRequestLoading)
            ? (
                <div className="inbound-protocols-section">
                    { !isInboundProtocolConfigRequestLoading && showProtocolSelection && (
                        <>
                            <Heading as="h4">Inbound protocol</Heading>

                            {/* TODO enable this after having multiple inbound protocols*/ }
                            <Hint icon="info circle">Please select one of the following inbound protocols.</Hint>
                            {
                                (availableInboundProtocols
                                    && availableInboundProtocols instanceof Array
                                    && availableInboundProtocols.length > 0)
                                    ? availableInboundProtocols.map((protocol, index) => (
                                        protocol.enabled && (
                                            <SelectionCard
                                                inline
                                                disabled={ !protocol.enabled }
                                                selected={
                                                    selectedInboundProtocol && selectedInboundProtocol.name
                                                        ? protocol.name === selectedInboundProtocol.name
                                                        : false
                                                }
                                                id={ protocol.name }
                                                key={ index }
                                                header={ protocol.displayName }
                                                image={ InboundProtocolLogos[ protocol.logo ] }
                                                onClick={ handleInboundProtocolSelection }
                                            />
                                        )
                                    ))
                                    : null
                            }
                            <Divider hidden/>
                        </>
                    ) }
                    <div className="protocol-settings-section">
                        { selectedInboundProtocol && resolveInboundProtocolSettingsForm() }
                    </div>
                </div>
            )
            : <ContentLoader/>
    );
};
