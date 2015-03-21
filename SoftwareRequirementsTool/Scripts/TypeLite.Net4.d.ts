
 
 

 

/// <reference path="Enums.ts" />

declare module SoftwareRequirementsTool.Data {
	interface AbsElement {
		ID: number;
		Name: string;
		ShortDescription: string;
		Description: string;
		AbstractionLevel: number;
		Author: string;
		ConnectedElements: SoftwareRequirementsTool.Data.IElement[];
		ConnectedViews: SoftwareRequirementsTool.Data.AbsViewElement[];
	}
	interface IElement {
		Author: string;
		Description: string;
		ID: number;
		Name: string;
		ShortDescription: string;
	}
	interface AbsViewElement {
		ID: number;
		Element: SoftwareRequirementsTool.Data.IElement;
		AbstractionLevel: number;
	}
	interface UseCase extends SoftwareRequirementsTool.Data.AbsElement {
		AbstractionLevel: number;
	}
}


