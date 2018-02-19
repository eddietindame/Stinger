import loginReducer from '../src/reducers/loginReducer';

describe('Login Reducer', () => {

    it('has a default state', () => {
        expect(
            loginReducer(undefined, { type: undefined })
        ).toEqual({
            isAuthenticated: false,
            user: null
        });
    });

    // it('can handle LOGIN_SUCCESS', () => {
    //     expect(
    //         loginReducer(undefined, { type: 'LOGIN_SUCCESS' })
    //     ).toEqual({
    //         isAuthenticated: true,
    //         user: {
    //             'displayName': '',
    //             'providerId': '',
    //             'uid': '',
    //             'providerData': [{
    //                 'email': '',
    //                 'providerId': '',
    //                 'photoURL': '',
    //                 'displayName': '',
    //                 'uid': ''
    //             }],
    //             'refreshToken': '',
    //             'email': '',
    //             'emailVerified': false,
    //             'isAnonymous': false,
    //             'photoURL': '',
    //             'phoneNumber': null
    //         }
    //     });
    // });

    it('can handle LOGOUT_SUCCESS', () => {
        expect(
            loginReducer(undefined, { type: 'LOGOUT_SUCCESS' })
        ).toEqual({
            isAuthenticated: false,
            user: null
        });
    });

});
