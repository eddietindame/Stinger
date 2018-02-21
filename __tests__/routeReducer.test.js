import routeReducer from '../src/reducers/routeReducer'

describe('Route Reducer', () => {

    it('has a default state', () => {
        expect(
            routeReducer(undefined, {
                type: undefined,
                scene: undefined
            })
        ).toEqual({
            scene: {}
        })
    })

    it('can handle REACT_NATIVE_ROUTER_FLUX_FOCUS', () => {
        expect(
            routeReducer(undefined, {
                type: 'REACT_NATIVE_ROUTER_FLUX_FOCUS',
                scene: { foo: 'bar' }
            })
        ).toEqual({
            scene: { foo: 'bar' }
        })
    })

})
