namespace Enum {
  export function key<T extends Enum, TKey extends keyof T = keyof T>(
    enumObj: T,
    value: T[TKey]
  ): TKey | undefined {
    let keys = Enum.entries(enumObj).filter(
      ([_, entryValue]) => entryValue === value
    );
    if (keys.length > 0) return keys[0][0] as TKey;
    return;
  }
  export function keys<T extends Enum, TKey extends keyof T = keyof T>(
    enumObj: T
  ): TKey[] {
    return Object.keys(enumObj).filter((k) => Number.isNaN(+k)) as TKey[];
  }

  export function values<T extends Enum>(enumObj: T): T[keyof T][] {
    return Enum.keys(enumObj).map((key: keyof T) => enumObj[key]);
  }

  export function entries<T extends Enum>(enumObj: T): [keyof T, T[keyof T]][] {
    return Enum.keys(enumObj).map((key) => [
      key as keyof T,
      (enumObj as any)[key],
    ]);
  }

  export function project<T extends Enum, TResult>(
    enumObj: T,
    projection: (
      entry: [keyof T, T[keyof T]],
      index: number,
      array: [keyof T, T[keyof T]][]
    ) => TResult
  ) {
    const entries = Enum.entries(enumObj);

    return entries.map(projection);
  }

  export function isEnum(enumObj: any): enumObj is Enum {
    if (enumObj as Enum) {
      return true;
    }
    return false;
  }
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
type Enum = { [value: string | number | symbol]: string };
export default Enum;
