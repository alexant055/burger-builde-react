import {BurgerBuilder} from './BurgerBuilder';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import BuildControl from '../../components/Burger/BuildControls/BuildControl/BuildControl';

configure({adapter: new Adapter()});
describe('<BurgerBuilder />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(<BurgerBuilder onInitIngridients={() => {
        }}/>);
    });

    it('should render <BuildControls /> when receiving ingridients', () => {
        // wrapper.setProps({
        //     ings: {
        //         salad: 0
        //     }
        // });

        wrapper.instance()
            .setProps({
                ings: {
                    salad: 0
                }
            });
        // wrapper.setProps()
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});
