# spfx-hello-world

## Summary

A HelloWorld template for SharePoint Framework (SPFx) projects configured to work with React versions > 17. This project demonstrates modern React development practices within the SPFx ecosystem, including dependency management and webpack configuration for React 18+.
The `tsconfig.json` configuration for this project is very opinionated, since this is what I'm used to working with in my day-to-day,
but those settings can be changed to suit your needs.

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.22.0-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

- Node.js version 22 or higher
- npm or pnpm package manager
- Basic knowledge of React and SharePoint Framework

## Version history

| Version | Date             | Comments                                  |
| ------- | ---------------- | ----------------------------------------- |
| 1.0     | January 6, 2026  | Initial release - React 18+ SPFx template |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- In the command-line run:
  - `pnpm install`
  - `pnpm start`

The `heft start` command will build the solution and serve it locally. You can then access your SPFx web part and test it with React 18+.

Other build commands can be listed using `heft --help`.

## Features

This template provides a working SPFx project configured for React 18+ development:

- **React 18+ Support**: Modern React dependency configuration that works seamlessly with SPFx
- **HelloWorld Web Part**: A basic web part demonstrating React component implementation in SharePoint
- **Heft Build System**: Uses the modern Heft build tool from Microsoft's RushStack project
- **TypeScript Configuration**: Full TypeScript support with proper type definitions
- **Development Server**: Local development and debugging capabilities with hot module reloading
- **Production Ready**: Webpack configuration optimized for production builds and deployment

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft Teams](https://docs.microsoft.com/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Heft Documentation](https://heft.rushstack.io/)
- [React Documentation](https://react.dev/)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development