import { useDispatch } from 'react-redux';

import { NOTIFICATIONS } from '@constant';
import { showSnackbar } from '@features';
import {
    AuthApiErrorType,
    AuthApiResponseType,
    LoginRequestType,
    RegisterApiRequestType,
    useLoginMutation,
    useRegisterMutation,
} from '@services';
import { AppDispatch } from '@store';

/**
 * Auth hook that returns authentication actions and there states
 */
export const useAuth = () => {
    /** Hooks */
    const dispatch = useDispatch<AppDispatch>();
    const [register, { isLoading: registerLoading }] = useRegisterMutation();
    const [login, { isLoading: loginLoading }] = useLoginMutation();

    /** Functions */
    /**
     * Function to handle auth actions
     * @param action - Specific action which need to execute
     * @param successMsg - Success message which need to be displayed in snackbar
     */
    const handleAuthAction = async <T extends AuthApiResponseType>(
        action: () => Promise<T>,
        successMsg: string,
    ) => {
        try {
            await action();
            dispatch(
                showSnackbar({
                    message: successMsg,
                    severity: 'success',
                }),
            );
        } catch (error: unknown) {
            const err = error as AuthApiErrorType;
            const errors = err?.data;
            if (errors) {
                const errValue = Object.values(errors)[0];
                dispatch(
                    showSnackbar({
                        message: errValue[0],
                        severity: 'error',
                    }),
                );
            } else {
                dispatch(
                    showSnackbar({
                        message: NOTIFICATIONS.ERROR,
                        severity: 'error',
                    }),
                );
            }
        }
    };

    /**
     * Function that handle register action
     * @param data - Request body for the register api
     */
    const handleRegister = async (data: RegisterApiRequestType) => {
        await handleAuthAction(
            () => register(data).unwrap(),
            NOTIFICATIONS.LOGIN_SUCCESS,
        );
    };

    /**
     * Function that handle login action
     * @param data - Request body for the login api
     */
    const handleLogin = async (data: LoginRequestType) => {
        await handleAuthAction(
            () => login(data).unwrap(),
            NOTIFICATIONS.LOGIN_SUCCESS,
        );
    };

    return {
        handleRegister,
        registerLoading,
        handleLogin,
        loginLoading,
    };
};
