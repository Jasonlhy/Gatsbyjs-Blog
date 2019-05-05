---
path: "/blog/初試 Powershell"
date: "2017-07-07"
title: "初試 Powershell"
tags:
- Powershell
- Tool
---

# 初試感想
最近都在用 Windows 下的 Powershell，功能上還不錯，也能利用 pipeline 串連不同 h 程式。但不同於 unix shell input 和 output 以 text 為基礎，Powershell 的 input 和 output 都是 object，在這裡紀錄一下用法。

# 例子
- `Get-ChildItem *.txt`: unix 的 ls，列出當下的 txt
- `Get-Content`: unix 的 cat，印出檔案內容
- `foreach {$_}`: iterate 每一個 object
- `@()`: Array
- `$element`: variable
- `Get-Service | Get-Member -MemberType Property`: 檢視 pipeline 中的 object 的 property

## 預覽每個 txt file 頭一百行然後由用戶決定是否移除。
```powershell
foreach ($element in @("*.txt", "*.js")) {
    Get-ChildItem $element | foreach {
        Write-Host "===================="  $_.Name "====================";
        Get-Content -TotalCount 100 $_ ;
        Remove-Item -confirm $_
    }
}
```

## 預覽 CSV
```powershell
Import-Csv god.csv | Out-GridView
```

## 利用 .NET Framework 的 Method
`Get-ChildItem` 每個 object 都是 System.IO.FileInfo，是NET Framework，因此可以用利用當中的 method，例如 `Name`。

```
Get-ChildItem *.txt | Get-Member

TypeName: System.IO.FileInfo
```

```powershell
Get-ChildItem *.txt | foreach { $_.Name }
async_note.txt
db.txt
dependency.txt
```

# 參考
[ss64](https://ss64.com/ps/)
