import Component from 'inferno-component';
import { findRenderedVNodeWithType, renderIntoDocument } from 'inferno-test-utils';

describe('TestUtils events', () => {
	it('Should work with Synthetic events', () => {
		const mockClick = jest.fn();

		class FooBar extends Component {
			render() {
				return (
					<div onClick={mockClick}>
						Test
					</div>
				);
			}
		}
		const tree = renderIntoDocument(<FooBar />);

		const vnode = findRenderedVNodeWithType(tree, 'div');
		vnode.dom.click();

		expect(mockClick).toHaveBeenCalledTimes(1);
	});

	it('Should work with native events', () => {
		const mockClick = jest.fn();

		class FooBar extends Component {
			render() {
				return (
					<div onclick={mockClick}>
						Test
					</div>
				);
			}
		}
		const tree = renderIntoDocument(<FooBar />);

		const vnode = findRenderedVNodeWithType(tree, 'div');
		vnode.dom.click();

		expect(mockClick).toHaveBeenCalledTimes(1);
	});
});
