---
path: "/blog/Powershell"
date: 2017-07-07
update: 2019-08-25
title: "Powershell"
tags:
  - Powershell
  - Tool
  - Shell
---

## Powershell

最近都在用 Windows 下的 Powershell，功能上還不錯，也能利用 pipeline 串連不同程式。但不同於 unix shell input 和 output 以 text 為基礎，Powershell 的 input 和 output 都是 CLR object，在這裡整理一下用法。

## Environment and Variable

Add path into executable path:

```powershell
PS /Users/jason/my-gatsby-site> $Env:Path+="C:\docfx"
```

### Get-Command

利用 `Get-Command`, 查看 command 用那個 executable

```
PS /Users/jason/my-gatsby-site> Get-Command node

CommandType     Name                                               Version    Source
-----------     ----                                               -------    ------
Application     node                                               0.0.0.0    /usr/local/bin/node
```

## Unix style alias

- Get-ChildItem: ls
- Get-Content: cat
- Get-Help: man

## 例子

Syntax:

- `foreach { $_ }`: iterate 每一個 object, `$_` 代表每一個 elements
- `@()`: Array
- `$element`: variable
- `?` : Where-Object

### 預覽 file

- `Get-ChildItem *.txt`: unix 的 ls，列出當下的 txt

```powershell
foreach ($element in @("*.txt", "*.js")) {
    Get-ChildItem $element | foreach {
        Write-Host "===================="  $_.Name "====================";
        Get-Content -TotalCount 100 $_ ;
        Remove-Item -confirm $_
    }
}
```

### 預覽 CSV

```powershell
Import-Csv god.csv | Out-GridView
```

### 查看 Member

`Get-ChildItem` 每個 object 都是 System.IO.FileInfo，是 NET Framework，因此可以用利用當中的 method，例如 `Name`。

- `Get-Service | Get-Member -MemberType Property`: 檢視 pipeline 中的 object 的 property

```powershell
Get-ChildItem *.txt | Get-Member

TypeName: System.IO.FileInfo
```

或者

```powershell
$(Get-ChildItem *.txt).GetType()
```

Get-Date | Select-Object -ExpandProperty DayOfWeek


## Powershell Core

Mac 和 Linux 上可以使用 Powershell Core


## Trick

使用 cmd commmand

```powershell
cmd --% /c rmdir /s "xxxxxdirectory"
```

## 參考

- [ss64](https://ss64.com/ps/)
