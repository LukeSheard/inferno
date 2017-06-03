import { render } from 'inferno';
import createElement from 'inferno-create-element';
import { spy } from 'sinon';

describe('lifecycle hooks', () => {
	describe('Stateless component hooks', () => {
		let template;
		let container;

		function StatelessComponent() {
			const divTemplate = () => {
				return createElement('div', null, 'Hello world!');
			};
			return divTemplate();
		}

		afterEach(function() {
			render(null, container);
		});

		beforeEach(function() {
			container = document.createElement('div');

			template = (
				onComponentWillMount,
				onComponentDidMount,
				onComponentWillUnmount,
				onComponentWillUpdate,
				onComponentDidUpdate,
				onComponentShouldUpdate,
				StatelessComponent,
			) => {
				return createElement(
					StatelessComponent,
					{
						onComponentWillMount,
						onComponentDidMount,
						onComponentWillUnmount,
						onComponentWillUpdate,
						onComponentDidUpdate,
						onComponentShouldUpdate,
					},
					null,
				);
			};
		});

		it('"onComponentWillMount" hook should fire', () => {
			const spyObj = {
				fn: () => {},
			};
			const sinonSpy = spy(spyObj, 'fn');
			const node = template(spyObj.fn, null, null, null, null, null, StatelessComponent);
			render(node, container);

			expect(sinonSpy.callCount).toEqual(1);
		});

		it('"onComponentDidMount" hook should fire, args DOM', () => {
			const spyObj = {
				fn: () => {},
			};
			const sinonSpy = spy(spyObj, 'fn');
			const node = template(null, spyObj.fn, null, null, null, null, StatelessComponent);
			render(node, container);

			expect(sinonSpy.callCount).toEqual(1);
			expect(sinonSpy.getCall(0).args[0]).toEqual(container.firstChild);
		});

		it('"onComponentWillUnmount" hook should fire', () => {
			const spyObj = {
				fn: () => {},
			};
			const sinonSpy = spy(spyObj, 'fn');
			const node = template(null, null, spyObj.fn, null, null, null, StatelessComponent);
			render(node, container);
			expect(sinonSpy.callCount).toEqual(0);
			// do unmount
			render(null, container);

			expect(sinonSpy.callCount).toEqual(1);
		});

		it('"onComponentWillUpdate" hook should fire', () => {
			const spyObj = {
				fn: () => {},
			};
			const sinonSpy = spy(spyObj, 'fn');
			const node = template(null, null, null, spyObj.fn, null, null, StatelessComponent);
			render(node, container);
			expect(sinonSpy.callCount).toEqual(0);

			render(node, container);
			expect(sinonSpy.callCount).toEqual(1);
			expect(sinonSpy.getCall(0).args[0]).toBeInstanceOf(Object);
			expect(sinonSpy.getCall(0).args[1]).toBeInstanceOf(Object);
		});

		it('"onComponentDidUpdate" hook should fire', () => {
			const spyObj = {
				fn: () => {},
			};
			const sinonSpy = spy(spyObj, 'fn');
			const node = template(null, null, null, null, spyObj.fn, null, StatelessComponent);
			render(node, container);
			expect(sinonSpy.callCount).toEqual(0); // Update 1
			render(node, container);
			expect(sinonSpy.callCount).toEqual(1); // Update 2
		});

		it('"onComponentShouldUpdate" hook should fire, should call render when return true', () => {
			let onComponentShouldUpdateCount = 0;
			let renderCount = 0;
			const StatelessComponent = () => {
				renderCount++;
				return null;
			};
			const node = template(
				null,
				null,
				null,
				null,
				null,
				() => {
					onComponentShouldUpdateCount++;
					return true;
				},
				StatelessComponent,
			);

			render(node, container);
			expect(onComponentShouldUpdateCount).toEqual(0, 'should have called shouldUpdate none'); // Update 1
			expect(renderCount).toEqual(1, 'should have called "render" once'); // Rendered 1 time

			render(node, container);
			expect(onComponentShouldUpdateCount).toEqual(1, 'should have called shouldUpdate once'); // Update 2
			expect(renderCount).toEqual(2, 'should have called "render" twice'); // Rendered 2 time
		});

		it('"onComponentShouldUpdate" hook should fire, should not call render when return false', () => {
			let onComponentShouldUpdateCount = 0;
			let renderCount = 0;
			const StatelessComponent = () => {
				renderCount++;
				return null;
			};
			const node = template(
				null,
				null,
				null,
				null,
				null,
				() => {
					onComponentShouldUpdateCount++;
					return false;
				},
				StatelessComponent,
			);

			render(node, container);
			expect(onComponentShouldUpdateCount).toEqual(0, 'should have called shouldUpdate none'); // Update 1
			expect(renderCount).toEqual(1, 'should have called "render" once'); // Rendered 1 time

			render(node, container);
			expect(onComponentShouldUpdateCount).toEqual(1, 'should have called shouldUpdate once'); // Update 2
			expect(renderCount).toEqual(1, 'should have called "render" once'); // Rendered 1 time
		});
	});
});
