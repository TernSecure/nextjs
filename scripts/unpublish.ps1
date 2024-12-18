# Version 3.2.x
41..0 | ForEach-Object {
    $version = "3.2.$_"
    Write-Host "Attempting to unpublish @tern-secure/nextjs@$version"
    $result = npm unpublish "@tern-secure/nextjs@$version" --force
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Successfully unpublished version $version" -ForegroundColor Green
    } else {
        Write-Host "Failed to unpublish version $version" -ForegroundColor Red
    }
}