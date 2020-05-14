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

import { combineReducers } from "redux";
import { authenticateReducer, globalReducer, profileReducer } from "./reducers";
import { LoadersReducer } from "./reducers/loaders";

/**
 * Combines all the reducers.
 *
 * @type {Reducer<any>} Root reducer to be used when creating the store.
 */
export const reducers = combineReducers({
    authenticationInformation: authenticateReducer,
    global: globalReducer,
    loaders: LoadersReducer,
    profile: profileReducer
});
