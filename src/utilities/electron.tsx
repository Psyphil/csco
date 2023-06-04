const electron = (window as { [key: string]: any })['electron']

export function currentDirectory() {
  if (!electron || !electron.currentDirectory) return undefined
  return electron.currentDirectory()
}

export function directoryContents() {
  if (!electron || !electron.directoryContents) return undefined
  return electron.directoryContents()
}

export function readData(fileNames: string[]): object {
  if (!electron || !electron.readData) return {}
  return electron.readData(fileNames)
}

export function readDataDirectory(): string[] {
  if (!electron || !electron.readDataDirectory) return []
  return electron.readDataDirectory()
}
