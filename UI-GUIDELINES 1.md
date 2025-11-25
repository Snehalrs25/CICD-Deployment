FRAMEWORK: 

Angular 19.2.x 

TypeScript, HTML, SCSS 

Angular Material Integration 

Reactive Forms (if forms present) 

Design System: src/styles/common.scss 

CRITICAL - ANALYZE DESIGN & AUTO-DETECT: 

🔍 STEP 1: ANALYZE COMPLETE LAYOUT 

Detect if sidebar/navigation menu exists (check left side 0-300px) 

Detect if header/top bar exists (check top 0-100px) 

Detect main content area dimensions 

Identify all UI sections automatically 

Map component hierarchy from Figma layers 

🔍 STEP 2: AUTO-DETECT & NAME IMAGES 

Extract ALL images/icons/SVGs from Figma design 

Auto-generate DESCRIPTIVE names based on: 

Layer names in Figma (e.g., "arrow-left" → icon-arrow-left.svg) 

Visual purpose (e.g., notification icon → icon-notification.svg) 

Location (e.g., sidebar logo → logo-sidebar.svg) 

Component type (e.g., avatar → avatar-user.png) 

Organize by category: 

public/images/icons/ (all icons) 

public/images/avatars/ (user images) 

public/images/logos/ (brand logos) 

public/images/backgrounds/ (bg images) 

public/images/illustrations/ (decorative) 

Use naming pattern: [type]-[purpose]-[variant].ext Examples: icon-arrow-down.svg, avatar-user-1.png, logo-company.svg 

🔍 STEP 3: DETECT NAVIGATION STRUCTURE IF sidebar exists: 

Extract width, background, gradient 

Identify all menu items with icons and labels 

Detect active/inactive states 

Find logo position and styling 

Check for footer elements (logout, profile) IF header exists: 

Extract height, background, positioning 

Identify left elements (back button, logo, title) 

Identify right elements (search, notifications, profile) 

Detect any breadcrumbs or tabs 

🔍 STEP 4: DETECT UI COMPONENTS 

Stepper/Progress indicator (dots/lines/numbers) 

Tabs/Pills/Breadcrumb navigation 

Form fields (inputs, selects, checkboxes, radio) 

Buttons (primary, secondary, outlined, text) 

Cards/Panels with content 

Modals/Dialogs/Drawers 

Tables/Lists/Grids 

Charts/Graphs (if present) 

🔍 STEP 5: EXTRACT DESIGN TOKENS 

All color hex codes (primary, secondary, grays, etc.) 

All font families, sizes, weights, line-heights 

All spacing values (margins, paddings, gaps) 

Border radius, widths, styles 

Shadow definitions (x, y, blur, spread, color) 

Gradient angles and color stops 

Transition/animation timings 

🔍 STEP 6: DETECT RESPONSIVE BEHAVIOR 

Analyze layout constraints in Figma 

Detect flex/grid layouts 

Identify breakpoint requirements 

Plan mobile, tablet, desktop variations 

IMPLEMENTATION RULES: 

✅ COMPONENT CREATION (Auto-decide based on detection): IF sidebar detected → Create SidebarComponent IF header detected → Create HeaderComponent 

 IF forms detected → Create form component with validation IF modals detected → Create modal components Create separate component for each major UI section 

✅ IMAGE HANDLING (100% Automated): 

Download ALL images from Figma 

Auto-generate descriptive names from Figma layer names 

Clean names: lowercase, hyphens, no spaces/special chars 

Organize into proper folders by type 

Update all image paths in components 

NO random hash names allowed 

✅ STYLING (Exact Match): 

Extract exact hex colors from Figma 

Use exact spacing values (px-perfect) 

Match font sizes and weights exactly 

Replicate gradients with correct angles 

Copy shadows precisely 

Match border radius values 

Use Figma's padding/margin values 

✅ LAYOUT (Auto-detect & Implement): IF sidebar exists: 

Fixed/sticky positioning 

Proper z-index layering 

Main content offset by sidebar width IF header exists: 

Fixed/sticky top positioning 

Content offset by header height Use Flexbox/Grid as per Figma's auto-layout 

✅ INTERACTIVITY: 

Add hover states (darken/lighten by 10%) 

Add focus states (outline/border change) 

Add active states (as shown in Figma) 

Add loading states for buttons/forms 

Add disabled states with opacity 

(NEW - Material Interaction Enhancements) 

Hover/focus handled by Material’s built-in states. 

Use matTooltip for hints or helper text. 

✅ RESPONSIVE (Auto-calculate breakpoints): 

Analyze design width (e.g., 1440px) 

Create breakpoints: [design-width], [design-width * 0.83], [design-width * 0.53], [design-width * 0.40] 

Mobile: Single column, hide sidebar, hamburger menu 

Tablet: 2 columns, compact spacing 

Desktop: Full layout as designed 

✅ FORMS (If detected): 

Create Reactive Forms with FormBuilder 

Add validation (required, pattern, min, max) 

Add error messages below fields 

Pre-fill values if shown in design 

Add submit/cancel handlers 

Add Angular Material Reactive forms where needed and do form validations 

✅ ROUTING: 

Auto-generate routes based on component name 

Add navigation handlers for all buttons/links 

Create breadcrumb logic if detected 

DELIVERABLES (Auto-generated): 

Component Files: 

[component-name].component.ts 

[component-name].component.html 

[component-name].component.scss 

[component-name].component.spec.ts 

Shared Components (if detected): 

sidebar.component.* (if sidebar exists) 

header.component.* (if header exists) 

Any other reusable components 

Assets: 

All images with proper descriptive names 

Organized folder structure 

README listing all assets 

Configuration: 

Updated app-routing.module.ts 

Updated app.module.ts 

Font imports in index.html 

Documentation: 

Component usage instructions 

Design token reference 

Image asset list 

VALIDATION (Auto-verify): 

Compare screenshot with implementation 

Verify all colors match (use color picker) 

Check spacing with ruler tool 

Test all breakpoints 

Validate form functionality 

Test all navigation/routing 

Check console for errors 

Verify image loading 

OUTPUT FORMAT: Provide clear summary: 

Detected Components: [list] 

Images Extracted: [count] with names 

Routes Added: [list] 

Forms Created: [list] 

Responsive Breakpoints: [values] 

Design Tokens Used: [summary] 

NO MANUAL INPUT NEEDED - FULLY AUTOMATED FROM FIGMA!