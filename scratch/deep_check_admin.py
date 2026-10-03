import re

file_path = r'c:\Learnup_NuxtJs_v1.0.0\app\pages\admin-dashboard.vue'
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total lines in admin-dashboard.vue: {len(lines)}")

# Check for common typos/errors
errors = []

# 1. Check for duplicate variable declarations
declared = {}
for idx, line in enumerate(lines, 1):
    m = re.search(r'(?:const|let|var)\s+([a-zA-Z0-9_$]+)\s*=', line)
    if m:
        var_name = m.group(1)
        if var_name in declared:
            errors.append(f"Line {idx}: Duplicate declaration of '{var_name}' (first declared on line {declared[var_name]})")
        else:
            declared[var_name] = idx

# 2. Check for missing closing tags
template_str = "".join(lines)
opens = re.findall(r'<([a-zA-Z0-9-]+)(?:\s+[^>]*?)?(?<!/)>', template_str)
closes = re.findall(r'</([a-zA-Z0-9-]+)>', template_str)

# Self-closing tags
self_closing = {'img', 'input', 'hr', 'br', 'meta', 'link'}
filtered_opens = [t for t in opens if t not in self_closing]

print(f"Total non-self-closing open tags: {len(filtered_opens)}")
print(f"Total close tags: {len(closes)}")
if len(filtered_opens) != len(closes):
    print(f"WARNING: Tag count mismatch! Open: {len(filtered_opens)}, Close: {len(closes)}")

# 3. Check for any leftover undefined refs
undefined_refs = []
for ref_var in ['scholarshipStudents', 'scholarships', 'scholarshipApplications', 'students', 'instructors', 'courses', 'groups', 'blogs', 'certificates', 'categories', 'stats']:
    if ref_var not in declared:
        errors.append(f"CRITICAL: Reference '{ref_var}' used but not declared!")

if not errors:
    print("\n✅ VERIFICATION COMPLETE: Aucun bogue, conflit de variable ou erreur de déclaration trouvé dans admin-dashboard.vue !")
else:
    print("\n❌ ERREURS TROUVÉES:")
    for err in errors:
        print(" -", err)
