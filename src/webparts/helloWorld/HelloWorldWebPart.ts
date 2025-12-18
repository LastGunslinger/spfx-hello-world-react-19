import { IReadonlyTheme } from '@microsoft/sp-component-base'
import { Version } from '@microsoft/sp-core-library'
import {
	type IPropertyPaneConfiguration,
	PropertyPaneTextField
} from '@microsoft/sp-property-pane'
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base'
import * as strings from 'HelloWorldWebPartStrings'
import { createElement } from 'react'
import { type Root, createRoot } from 'react-dom/client'
import HelloWorld from './components/HelloWorld'
import { IHelloWorldProps } from './components/IHelloWorldProps'

export interface IHelloWorldWebPartProps {
	description: string
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {
	private _root: Root | undefined
	private _isDarkTheme: boolean = false;
	private _environmentMessage: string = '';

	public render(): void {
		const element: React.ReactElement<IHelloWorldProps> = createElement(
			HelloWorld,
			{
				description: this.properties.description,
				isDarkTheme: this._isDarkTheme,
				environmentMessage: this._environmentMessage,
				hasTeamsContext: !!this.context.sdks.microsoftTeams,
				userDisplayName: this.context.pageContext.user.displayName
			}
		)

		this._root = createRoot(this.domElement)
		this._root.render(element)
	}

	protected onInit(): Promise<void> {
		return this._getEnvironmentMessage().then(message => {
			this._environmentMessage = message
		})
	}

	private _getEnvironmentMessage(): Promise<string> {
		if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
			return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
				.then(context => {
					let environmentMessage: string = ''
					switch (context.app.host.name) {
						case 'Office': // running in Office
							environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment
							break
						case 'Outlook': // running in Outlook
							environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment
							break
						case 'Teams': // running in Teams
						case 'TeamsModern':
							environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment
							break
						default:
							environmentMessage = strings.UnknownEnvironment
					}

					return environmentMessage
				})
		}

		return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment)
	}

	protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
		if (!currentTheme) {
			return
		}

		this._isDarkTheme = !!currentTheme.isInverted
		const {
			semanticColors
		} = currentTheme

		if (semanticColors) {
			this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null)
			this.domElement.style.setProperty('--link', semanticColors.link || null)
			this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null)
		}

	}

	protected onDispose(): void {
		this._root?.unmount()
	}

	// @ts-expect-error - The type of Version is not resolved correctly outside of React 17. If the version of the application is needed, using this.context.manifest.version is an option that has worked for me
	protected get dataVersion(): Version {
		return Version.parse('1.0')
	}

	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return {
			pages: [
				{
					header: {
						description: strings.PropertyPaneDescription
					},
					groups: [
						{
							groupName: strings.BasicGroupName,
							groupFields: [
								PropertyPaneTextField('description', {
									label: strings.DescriptionFieldLabel
								})
							]
						}
					]
				}
			]
		}
	}
}
