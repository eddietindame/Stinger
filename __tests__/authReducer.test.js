import authReducer from '../src/reducers/authReducer';

describe('Auth Reducer', () => {

    it('has a default state', () => {
        expect(
            authReducer(undefined, { type: undefined })
        ).toEqual({
            isAuthenticating: false,
            user: null,
            error: null
        });
    });

    it('can handle LOGIN_REQUEST', () => {
        expect(
            authReducer(undefined, { type: 'LOGIN_REQUEST' })
        ).toEqual({
            isAuthenticating: true,
            user: null,
            error: null
        });
    });

    it('can handle LOGOUT_REQUEST', () => {
        expect(
            authReducer(undefined, { type: 'LOGIN_REQUEST' })
        ).toEqual({
            isAuthenticating: true,
            user: null,
            error: null
        });
    });

    it('can handle CHECK_REQUEST', () => {
        expect(
            authReducer(undefined, { type: 'LOGIN_REQUEST' })
        ).toEqual({
            isAuthenticating: true,
            user: null,
            error: null
        });
    });

    it('can handle LOGIN_SUCCESS', () => {
        expect(
            authReducer(undefined, { type: 'LOGIN_SUCCESS', payload: {} })
        ).toEqual({
            isAuthenticating: false,
            user: {},
            error: null
        });
    });

    it('can handle LOGOUT_SUCCESS', () => {
        expect(
            authReducer(undefined, { type: 'LOGIN_SUCCESS', payload: {} })
        ).toEqual({
            isAuthenticating: false,
            user: {},
            error: null
        });
    });

    it('can handle CHECK_SUCCESS', () => {
        expect(
            authReducer(undefined, { type: 'LOGIN_SUCCESS', payload: {} })
        ).toEqual({
            isAuthenticating: false,
            user: {},
            error: null
        });
    });

    it('can handle LOGIN_FAILURE', () => {
        expect(
            authReducer(undefined, { type: 'LOGIN_FAILURE', error: 'An error occured' })
        ).toEqual({
            isAuthenticating: false,
            user: null,
            error: 'An error occured'
        });
    });

    it('can handle LOGOUT_FAILURE', () => {
        expect(
            authReducer(undefined, { type: 'LOGIN_FAILURE', error: 'An error occured' })
        ).toEqual({
            isAuthenticating: false,
            user: null,
            error: 'An error occured'
        });
    });

    it('can handle CHECK_FAILURE', () => {
        expect(
            authReducer(undefined, { type: 'LOGIN_FAILURE', error: 'An error occured' })
        ).toEqual({
            isAuthenticating: false,
            user: null,
            error: 'An error occured'
        });
    });

});
