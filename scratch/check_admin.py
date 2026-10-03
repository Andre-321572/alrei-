import re

file_path = r'c:\Learnup_NuxtJs_v1.0.0\app\pages\admin-dashboard.vue'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

template_match = re.search(r'<template>(.*?)</template>', content, re.DOTALL)
script_match = re.search(r'<script.*?>(.*?)</script>', content, re.DOTALL)

template = template_match.group(1) if template_match else ''
script = script_match.group(1) if script_match else ''

# All declarations in script: const x = ..., let x = ..., function x..., ref(...)
declared = set()
for match in re.finditer(r'(?:const|let|var|function)\s+([a-zA-Z0-9_$]+)', script):
    declared.add(match.group(1))

# Check template expressions {{ var }}, v-if="var", v-for="x in var"
template_vars = set(re.findall(r'\{\{\s*([a-zA-Z0-9_$]+)', template))
template_vars.update(re.findall(r'v-if=["\'](?:\!)?([a-zA-Z0-9_$]+)', template))
template_vars.update(re.findall(r'v-else-if=["\'](?:\!)?([a-zA-Z0-9_$]+)', template))
template_vars.update(re.findall(r'v-for=["\'].*?\sin\s+([a-zA-Z0-9_$]+)', template))
template_vars.update(re.findall(r'v-model=["\']([a-zA-Z0-9_$]+)', template))
template_vars.update(re.findall(r'@\w+=["\']([a-zA-Z0-9_$]+)', template))

# Exclude Vue / JS globals
globals_set = {'$t', 'localePath', 'process', 'console', 'alert', 'Date', 'Math', 'Array', 'String', 'Object', 'Boolean', 'Number', 'JSON', 'URL', 'Blob', 'window', 'document', 'useNuxtApp', 'useRoute', 'useRouter', 'useApi', 'useLocalePath', 'definePageMeta', 'ref', 'computed', 'watch', 'onMounted', 'true', 'false', 'null', 'undefined'}

missing = []
for var in template_vars:
    if var not in declared and var not in globals_set:
        missing.append(var)

print(f"Total template variables checked: {len(template_vars)}")
if missing:
    print("MISSING DECLARATIONS FOUND:", missing)
else:
    print("SUCCESS: All template variables are properly declared in script setup!")
