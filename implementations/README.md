# Experimental Implementation Registry

This directory holds configuration for interoperability test targets used by the test suites. It is a temporary, repo-local registry while this testing and reporting style is developed. The registry may later be integrated with W3C and the W3C Credentials Community Group.

## File types

### Example templates (`*.template.json`)

Copy an example template [Example.template.json](Example.template.json) and rename to e.g. `my-service.template.json`. Update the endpoints, DIDs, and tags as needed.

### Local test files (`*.local.json`)

Add a local implementation with the `.local.json` suffix, which will be ignored by version control. Copy a template, rename to e.g. `my-service.local.json`, and update endpoints, DIDs, and tags as needed.

