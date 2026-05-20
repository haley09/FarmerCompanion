# TODO

## Permissions and Roles

- Move owner/employee permissions from frontend-only local state into backend-enforced access control.
- Ensure employees cannot access restricted dashboard data by changing URLs, editing local storage, or calling API endpoints directly.
- Store team membership, employee permissions, and activity attribution on the backend.
- Keep the current local owner/employee split as a prototype for product flow and UI testing.

## Backend and Accounts

- Split the single saved workspace JSON into normalized backend tables as the product grows.
- Add account settings and profile editing.
- Add password reset, email verification, and session expiration handling.
- Decide how farms/organizations are modeled so one owner can manage multiple farms later.
- Add audit history for sensitive actions such as deleting records, importing backups, or changing employee permissions.

## Farm Workflows

- Add seasonal task templates for planting, spraying, scouting, harvest, winter maintenance, and input ordering.
- Add recurring task support for weekly scouting, equipment checks, and market reviews.
- Add field grouping by farm, landlord, crop, or location.
- Add attachments/photos to field records and equipment service logs.
- Add notes or comments on tasks so employees can report progress back to the owner.

## Employee Experience

- Add a simplified employee home screen focused on assigned tasks and allowed records.
- Add task assignment to specific employees instead of one shared employee profile.
- Add completion notes when employees mark tasks done.
- Add owner review/approval for employee-entered records before they affect reports.

## Data and Reporting

- Add CSV import for fields, equipment, input costs, and tasks.
- Add report filters by crop, field, date range, equipment, and employee.
- Add richer printable reports for lenders, advisors, landlords, and internal planning.
- Add export bundles that include JSON backup plus CSV summaries.

## Market, Weather, and Integrations

- Move API keys to backend storage or server-side environment variables.
- Add local cash bid integrations by elevator/location if available.
- Add weather alerts for spray windows, rain risk, wind, heat, and frost.
- Add optional integration points for accounting, equipment telematics, or farm management systems.

## Mobile and Usability

- Review the dashboard on phone-sized screens during common field workflows.
- Add faster mobile entry for records, service logs, and task completion.
- Add clearer empty states and first-run sample data controls.
- Add keyboard and screen-reader accessibility checks for forms, navigation, and dialogs.

## Quality and Maintenance

- Add linting and formatting scripts.
- Add unit tests for calculations, storage helpers, import validation, and permission logic.
- Add component tests for owner/employee section visibility.
- Add end-to-end smoke tests for landing, login, register, dashboard, backup import/export, and employee access.
- Replace browser `confirm` dialogs with accessible app-styled confirmation modals.
