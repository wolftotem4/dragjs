java -jar .\third_party\closure\closure-compiler.jar ^
  --js='node_modules/google-closure-library/closure/goog/base.js' ^
  --js='lib/**.js' ^
  --generate_exports ^
  --warning_level=VERBOSE ^
  --jscomp_error=* ^
  --extra_annotation_name=listens ^
  --extra_annotation_name=exportDoc ^
  --extra_annotation_name=exportInterface ^
  --language_in ECMASCRIPT6_STRICT ^
  --language_out ECMASCRIPT5 ^
  --compilation_level ADVANCED_OPTIMIZATIONS ^
  --js_output_file dist/output.min.js ^
  --create_source_map dist/output.js.map ^
  --output_wrapper_file build/wrapper.template.js

echo //# sourceMappingURL=output.js.map>> dist/output.min.js
