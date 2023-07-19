/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */
/// <reference types="vue/macros-global" />
import { Component } from "vue";

type VComponent = Component;

export declare global {
	var shiftDown: boolean;
	var saveInterval: NodeJS.Timer;
	var gameLoopInterval: NodeJS.Timer;
	var renderInterval: NodeJS.Timer;

	type Component = VComponent;
	type ComponentProps<C extends Component> = C extends new (...args: any) => any
		? Omit<InstanceType<C>["$props"], keyof VNodeProps | keyof AllowedComponentProps>
		: never;
	type OneToEight = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
}