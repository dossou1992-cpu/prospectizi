import json

with open('/home/user/prospectizi/package.json', 'r') as f:
    pkg = json.load(f)

pkg['scripts']['start'] = 'next start -H 0.0.0.0 -p 3000'
pkg['scripts']['dev'] = 'next dev -H 0.0.0.0 -p 3000'

with open('/home/user/prospectizi/package.json', 'w') as f:
    json.dump(pkg, f, indent=2)

print("package.json updated!")
