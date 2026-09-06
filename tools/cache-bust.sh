#!/bin/sh
# Re-stamp assets/css/style.css and assets/js/main.js in every page with the
# first 8 characters of their MD5, so browsers fetch a changed file instead of
# serving an old copy. Run it after editing the stylesheet or the script.
set -e
cd "$(dirname "$0")/.."

css=$(md5 -q assets/css/style.css | cut -c1-8)
js=$(md5 -q assets/js/main.js | cut -c1-8)

for page in *.html; do
  [ "$page" = "preview.html" ] && continue
  sed -i '' \
    -e "s|href=\"assets/css/style\.css\(?v=[0-9a-f]*\)\{0,1\}\"|href=\"assets/css/style.css?v=$css\"|g" \
    -e "s|src=\"assets/js/main\.js\(?v=[0-9a-f]*\)\{0,1\}\"|src=\"assets/js/main.js?v=$js\"|g" \
    "$page"
done

echo "stamped css=$css js=$js"
