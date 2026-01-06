import type { IReadonlyTheme } from '@microsoft/sp-component-base'
import { Version } from '@microsoft/sp-core-library'
import {
	type IPropertyPaneConfiguration,
	PropertyPaneTextField
} from '@microsoft/sp-property-pane'
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base'
import * as strings from 'HelloWorldWebPartStrings'
import { StrictMode } from 'react'
import { type Root, createRoot } from 'react-dom/client'
import { HelloWorld } from './components/HelloWorld'

export interface IHelloWorldWebPartProps {
	description: string
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {
	#root: Root | undefined
	#isDarkTheme: boolean = false;
	#environmentMessage: string = '';

	protected async onInit(): Promise<void> {
		return this._getEnvironmentMessage().then(message => {
			this.#environmentMessage = message
		})
	}

	public render(): void {
		const rootNode = (
			// Use React strict mode
			<StrictMode>
				<HelloWorld
					description={this.properties.description}
					isDarkTheme={this.#isDarkTheme}
					environmentMessage={this.#environmentMessage}
					hasTeamsContext={!!this.context.sdks.microsoftTeams}
					userDisplayName={this.context.pageContext.user.displayName}
				/>
			</StrictMode>
		)

		this.#root = createRoot(this.domElement)
		this.#root.render(rootNode)
	}

	private async _getEnvironmentMessage(): Promise<string> {
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

		this.#isDarkTheme = !!currentTheme.isInverted
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
		this.#root?.unmount()
	}

	// @ts-expect-error - There is a type mismatch here caused by different type definitions of 'Version' in @microsoft/sp-core-library. I normally remove this property and use this.context.manifest.version to get the webpart's current version.
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
