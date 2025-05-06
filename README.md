# 🏢 ECI-Bienestar Frontend

<div align="center">
  <img src="src/assets/images/ecibienestar_logo_white_background.png" alt="ECI-Bienestar Logo" width="350" height="200">
  <br>
  <h3>Comprehensive Wellness Services Platform for Escuela Colombiana de Ingeniería Julio Garavito</h3>
</div>

<div align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-technologies">Technologies</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-modules">Modules</a> •
  <a href="#-navigation">Navigation</a> •
  <a href="#-error-handling">Error Handling</a> •
  <a href="#-component-architecture">Component Architecture</a> •
  <a href="#-testing">Testing</a> •
  <a href="#-ci/cd">CI/CD</a> •
  <a href="#-external-services">External Services</a> •
  <a href="#-contributing">Contributing</a> •
  <a href="#-license">License</a>
</div>

<br>

[![Development Pipeline](https://github.com/ECIBienestar/eci-bienestar-frontend/actions/workflows/development.yml/badge.svg)](https://github.com/ECIBienestar/eci-bienestar-frontend/actions/workflows/development.yml)
[![Production Pipeline](https://github.com/ECIBienestar/eci-bienestar-frontend/actions/workflows/production.yml/badge.svg)](https://github.com/ECIBienestar/eci-bienestar-frontend/actions/workflows/production.yml)

## 📋 Overview

ECI-Bienestar is a comprehensive wellness services platform designed for the Escuela Colombiana de Ingeniería Julio Garavito. The platform centralizes access to various wellness services including medical appointments, recreational room reservations, extracurricular activities, sports equipment loans, gym management, and administrative functions.

This repository contains the frontend implementation of the ECI-Bienestar platform, developed using React, TypeScript, and other modern web technologies.

## 🛠️ Technologies

<div align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router">
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios">
  <img src="https://img.shields.io/badge/Font_Awesome-528DD7?style=for-the-badge&logo=font-awesome&logoColor=white" alt="Font Awesome">
</div>

- **Core**: React 18, TypeScript 5
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, Hero UI
- **State Management**: React Context API / Redux Toolkit
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Icons**: Font Awesome
- **Form Handling**: React Hook Form, Yup
- **Testing**: Jest, React Testing Library
- **Code Quality**: ESLint, Prettier

## 📂 Project Structure

```
eci-bienestar-frontend/
├── src/
│   ├── assets/                           # Static assets (images, icons, etc.)
│   ├── components/                       # Shared components
│   │   ├── common/                       # Common UI components (buttons, cards, etc.)
│   │   └── layout/                       # Layout components (header, footer, etc.)
│   ├── modules/                          # Feature modules
│   │   ├── core/                         # Core functionality (auth, shared services)
│   │   ├── appointment-management/       # Appointment management module (Diamante Team)
│   │   ├── recreational-rooms/           # Recreational rooms module (Circonio Team)
│   │   ├── extracurricular-classes/      # Extracurricular classes (Ópalo Team)
│   │   ├── sports-equipment/             # Sports equipment loans (Esmeralda Team)
│   │   ├── gym-management/               # Gym tracking and management (Netherita Team)
│   │   ├── user-administration/          # User administration (Bismuto Team)
│   │   └── statistics-reporting/         # Statistics and reporting (Bismuto Team)
│   ├── router/                           # Application routing
│   ├── store/                            # Global state management
│   ├── types/                            # TypeScript type definitions
│   ├── utils/                            # Utility functions
│   ├── App.tsx                           # Main App component
│   └── main.tsx                          # Application entry point
├── public/                               # Public assets
├── index.html                            # HTML entry point
├── vite.config.ts                        # Vite configuration
├── tailwind.config.js                    # Tailwind CSS configuration
└── package.json                          # Project dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or later
- npm 8.x or later

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ECIBienestar/eci-bienestar-frontend.git
   cd eci-bienestar-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file based on `.env.example`:
   ```bash
   cp .env.example .env.local
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

6. Run tests:
   ```bash
   npm test
   ```

## 🧩 Modules

### 🩺 Medical Shifts Module (Diamante Team)

This module handles the management of medical appointment shifts for various university wellness services.

#### Features:
- User registration for medical appointments
- Shift management for different medical specialties
- Priority handling for special conditions
- Dynamic queue management
- Visualization of current and upcoming shifts

#### Screens:
- **Shift Registration**: Interface for students to register for medical services
- **Shift Queue Display**: Screen showing current and upcoming shifts
- **Administrative Dashboard**: For managing shifts and medical staff availability

#### Backend Integration:
- Connects to `medical-shifts-service` for shift management
- Uses `authentication-service` for user verification

#### Demo:
<div align="center">
  <a href="https://youtube.com/demo-link">
    <img src="src/assets/images/medical_shifts_demo.png" alt="Medical Shifts Demo" width="350" height="200">
  </a>
</div>

### 🏢 Recreational Rooms Module (Circonio Team)

This module manages the reservation and utilization of recreational spaces and equipment within the university.

#### Features:
- Room availability checking
- Reservation management
- Recreational equipment loans
- Return tracking
- Notification system for confirmations and reminders

#### Screens:
- **Room Browser**: To view and filter available rooms
- **Reservation Form**: For booking rooms and equipment
- **My Reservations**: User's active and past reservations
- **Admin Panel**: For managing room availability and equipment inventory

#### Backend Integration:
- Connects to `recreational-rooms-service` for reservations
- Uses `user-admin-service` for user permissions

#### Demo:
<div align="center">
  <a href="https://youtube.com/demo-link">
    <img src="src/assets/images/recreational_rooms_demo.png" alt="Recreational Rooms Demo" width="350" height="200">
  </a>
</div>

### 📚 Extracurricular Attendance Module (Ópalo Team)

This module tracks attendance for extracurricular activities and classes offered by the university's wellness department.

#### Features:
- Class registration and enrollment
- Attendance tracking
- Schedule management
- Capacity control
- Attendance history and reporting

#### Screens:
- **Available Classes**: Browse and register for available extracurricular activities
- **My Classes**: View enrolled classes and attendance history
- **Attendance Record**: For instructors to mark attendance
- **Class Management**: Administrative interface for class creation and management

#### Backend Integration:
- Connects to `extracurricular-service` for class management
- Uses `statistics-service` for attendance reporting

#### Demo:
<div align="center">
  <a href="https://youtube.com/demo-link">
    <img src="src/assets/images/extracurricular_demo.png" alt="Extracurricular Attendance Demo" width="350" height="200">
  </a>
</div>

### 🏀 Sports Equipment Module (Esmeralda Team)

This module handles the loan and return of sports equipment from the university coliseum.

#### Features:
- Equipment inventory browsing
- Loan requests
- Return processing
- Equipment condition tracking
- Loan history

#### Screens:
- **Equipment Catalog**: Browse available sports equipment
- **Loan Request**: Form for requesting equipment loans
- **My Loans**: View active and past loans
- **Equipment Management**: Administrative interface for inventory management

#### Backend Integration:
- Connects to `sports-equipment-service` for equipment management
- Uses `user-admin-service` for user verification

#### Demo:
<div align="center">
  <a href="https://youtube.com/demo-link">
    <img src="src/assets/images/sports_equipment_demo.png" alt="Sports Equipment Demo" width="350" height="200">
  </a>
</div>

### 💪 Gym Management Module (Netherita Team)

This module handles gym reservations, fitness tracking, and routine management.

#### Features:
- Gym session reservations
- Physical progress tracking
- Personalized routine creation
- Training schedule management
- Fitness goal setting and monitoring

#### Screens:
- **Gym Schedule**: View and book available gym sessions
- **My Fitness**: Track personal fitness metrics and progress
- **Routines**: Access personalized training routines
- **Trainer Dashboard**: For trainers to manage client schedules and routines

#### Backend Integration:
- Connects to `gym-management-service` for reservations and routines
- Uses `statistics-service` for fitness data analysis

#### Demo:
<div align="center">
  <a href="https://youtube.com/demo-link">
    <img src="src/assets/images/gym_management_demo.png" alt="Gym Management Demo" width="350" height="200">
  </a>
</div>

### 👥 User Administration Module (Bismuto Team)

This module provides comprehensive user management capabilities for the platform administrators.

#### Features:
- User profile management
- Role and permission assignment
- Service access control
- Schedule configuration for services and spaces
- User activity monitoring

#### Screens:
- **User Management**: Interface for creating, updating, and managing user accounts
- **Role Management**: Assign and configure user roles and permissions
- **Service Configuration**: Configure access to various platform services
- **Schedule Configuration**: Define availability for services and spaces

#### Backend Integration:
- Connects to `user-admin-service` for user management
- Uses `authentication-service` for access control

#### Designs:
<div align="center">
  <img src="src/assets/images/bismuto_login_1.png" alt="ECI-Bienestar Logo" width="500" height="300">
  <img src="src/assets/images/bismuto_login_2.png" alt="ECI-Bienestar Logo" width="500" height="300">
  <img src="src/assets/images/bismuto_login_3.png" alt="ECI-Bienestar Logo" width="500" height="300">

  <img src="src/assets/images/bismuto_dashboard.png" alt="ECI-Bienestar Logo" width="500" height="400">

  <img src="src/assets/images/bismuto_admin_users_1.png" alt="ECI-Bienestar Logo" width="500" height="400">
  <img src="src/assets/images/bismuto_admin_users_2.png" alt="ECI-Bienestar Logo" width="500" height="400">
  <img src="src/assets/images/bismuto_admin_users_3.png" alt="ECI-Bienestar Logo" width="500" height="400">
</div>

### 📊 Statistics Reporting Module (Bismuto Team)

This module provides data visualization and reporting capabilities for the platform's usage and performance metrics.

#### Features:
- Usage analytics dashboards
- Custom report generation
- Data export in multiple formats
- Trend analysis visualizations
- Service utilization metrics

#### Screens:
- **Analytics Dashboard**: Overview of key platform metrics
- **Report Generator**: Interface for creating custom reports
- **Usage Trends**: Visualizations of service usage over time
- **Export Center**: Tools for exporting data in various formats

#### Backend Integration:
- Connects to `statistics-service` for data aggregation
- Uses data from all platform services for comprehensive reporting

#### Designs::
<div align="center">
  <img src="src/assets/images/bismuto_statistics_1.png" alt="ECI-Bienestar Logo" width="500" height="400">
  <img src="src/assets/images/bismuto_statistics_2.png" alt="ECI-Bienestar Logo" width="500" height="400">
</div>

## 🧭 Navigation

The application follows a modular navigation structure, with each module having its own set of routes and navigation flow.

### Navigation Map

<div align="center">
  <img src="src/assets/images/navigation_map.png" alt="Navigation Map" width="700" height="500">
</div>

### User Flow

1. **Authentication**:
   - Users start at the login screen
   - After successful login, they are redirected to the dashboard
   - Navigation options vary based on user role

2. **Main Navigation**:
   - The sidebar provides access to all available modules
   - Top navigation shows user info and quick actions
   - Breadcrumbs indicate current location within the application

3. **Module Navigation**:
   - Each module has its own navigation structure
   - Users can navigate between modules without losing context
   - Back buttons are provided for multi-step processes

## ❌ Error Handling

The application implements a comprehensive error handling strategy to provide a smooth user experience even when issues occur.

### Common Error Scenarios:

1. **Authentication Errors**:
   - Invalid credentials
   - Session timeout
   - Unauthorized access

2. **Network Errors**:
   - API endpoint unavailable
   - Timeout on request
   - Connection loss

3. **Data Validation Errors**:
   - Invalid form input
   - Missing required fields
   - Business rule violations

### Error Handling Approach:

```typescript
// Example of API error handling with Axios interceptors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case 401:
          // Handle unauthorized
          authService.logout();
          break;
        case 403:
          // Handle forbidden
          break;
        case 404:
          // Handle not found
          break;
        case 500:
          // Handle server error
          break;
      }
    } else if (error.request) {
      // Request made but no response received
      // Handle network errors
    } else {
      // Error in setting up the request
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);
```

### User Feedback:

- Toast notifications for non-critical errors
- Modal dialogs for critical errors requiring user action
- Inline validation messages for form inputs
- Fallback UI components when data cannot be loaded

## 🏛️ Component Architecture

The application follows a component-based architecture, with a focus on reusability and maintainability.

### High-Level Architecture

<div align="center">
  <img src="src/assets/images/general_architecture_diagram.png" alt="Component Architecture" width="650" height="450">
</div>

### Key Architectural Patterns:

1. **Modular Design**:
   - Feature-based module structure
   - Clear separation of concerns
   - Independent module development

2. **Component Composition**:
   - Small, focused components
   - Composition over inheritance
   - Shared component library

3. **Container/Presentation Pattern**:
   - Containers handle data and logic
   - Presentation components are purely visual
   - Clear separation of state and UI

4. **Custom Hooks**:
   - Extract reusable logic into hooks
   - Promote code reuse across modules
   - Simplify component implementation

### Code Example:

```tsx
// Example of a container component using custom hooks
const UserProfileContainer: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user, loading, error } = useUser(userId);
  const { updateUser, updating } = useUpdateUser();

  const handleSubmit = async (data: UserData) => {
    try {
      await updateUser(userId, data);
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error('Failed to update profile');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!user) return <NotFound resource="User" />;

  return (
    <UserProfileForm
      user={user}
      onSubmit={handleSubmit}
      loading={updating}
    />
  );
};
```

## 🧪 Testing

The application is thoroughly tested to ensure reliability and quality.

### Testing Approaches:

1. **Unit Testing**:
   - Individual component testing
   - Hook testing
   - Utility function testing

2. **Integration Testing**:
   - Component interaction testing
   - Module integration testing
   - Form submission testing

3. **End-to-End Testing**:
   - User flow testing
   - Cross-browser compatibility
   - Performance testing

### Test Examples:

```tsx
// Example of a component test
describe('Button Component', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByText('Click Me');
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders as disabled when disabled prop is true', () => {
    render(<Button disabled>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeDisabled();
  });
});
```

### Test Coverage:

<div align="center">
  <img src="src/assets/images/test_coverage.png" alt="Test Coverage" width="700" height="300">
</div>

## 🔄 CI/CD

The application uses GitHub Actions for continuous integration and deployment, with separate pipelines for development and production environments.

### Development Pipeline:

- Triggered on pushes to `develop` branch
- Runs tests and linting
- Builds the application
- Deploys to development environment

### Production Pipeline:

- Triggered on pushes to `main` branch
- Runs all tests, linting, and build
- Deploys to production environment

### Pipeline Configuration:

```yaml
# Example workflow for development pipeline
name: Development Pipeline

on:
  push:
    branches: [develop]
  pull_request:
    branches: [develop]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
          
      - name: Install Dependencies
        run: npm ci
        
      - name: Run Linting
        run: npm run lint
        
      - name: Run Tests
        run: npm test
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Azure
        uses: azure/webapps-deploy@v2
        with:
          app-name: 'eci-bienestar-dev'
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE_DEV }}
          package: ./dist
```

### Deployment URLs:

- **Production**: [https://eci-bienestar.azurewebsites.net](https://eci-bienestar.azurewebsites.net)
- **Development**: [https://eci-bienestar-dev.azurewebsites.net](http://eci-bienestar-front-end-c0bbf3hzadekcpdg.canadacentral-01.azurewebsites.net)


## 🔌 External Services

The application integrates with several external services to provide its functionality.

### API Integration:

- **Backend Services**: Communication with ECI-Bienestar microservices
- **Authentication Provider**: Integration with authentication service

### Third-Party Integrations:

- **Email Service**: For notifications and alerts
- **Storage Service**: For storing files and images
- **Analytics Service**: For tracking application usage
- **Monitoring Service**: For application health monitoring

### Integration Architecture:

<div align="center">
  <img src="src/assets/images/integration_architecture.png" alt="Integration Architecture" width="700" height="400">
</div>

## 🤝 Contributing

We welcome contributions to improve the ECI-Bienestar frontend. Please follow these guidelines:

1. Fork the repository
2. Create a feature branch from `develop`
3. Make your changes
4. Run tests and linting
5. Submit a pull request to `develop`

### Development Workflow:

1. **Feature Development**:
   - Create feature branch from develop: `feature/feature-name`
   - Implement feature
   - Submit PR to develop

2. **Bug Fixes**:
   - Create bugfix branch: `bugfix/issue-description`
   - Fix the issue
   - Submit PR to develop

3. **Release Process**:
   - Create release branch from develop: `release/vX.Y.Z`
   - Fix any release issues
   - Merge to main and develop

### Code Standards:

- Follow the project's coding style (enforced by ESLint and Prettier)
- Write comprehensive tests for new features
- Document your code with JSDoc comments
- Keep components small and focused
- Use TypeScript for type safety

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

### Diamante Team (Appointment Management)
- [Carlos David Barrero Velasquez](https://github.com/CARDAV-45)
- [Vicente Garzón Rios](https://github.com/ChenteChaurio)
- [Daniel Alejandro Diaz Camelo](https://github.com/dadc1007)
- [Geronimo Martinez Nuñez](https://github.com/MimiRandomS)

### Circonio Team (Recreational Rooms)
- [Jeimy Alejandra Yaya Martínez](https://github.com/JeimyYaya)
- [Nicole Dayan Calderón Arévalo](https://github.com/NicoleC09)
- [Alison Geraldine Valderrama Munar](https://github.com/LIZVALMU)
- [Sebastián Julián Villarraga Guerrero](https://github.com/Sebastian-villarraga)

### Ópalo Team (Extracurricular Classes)
- [David Santiago Espinosa Rojas](https://github.com/daviespr1406)
- [Emily Noreña Cardozo](https://github.com/EmilyNorena)
- [Mayerlly Suarez Correa](https://github.com/mayerllyyo)

### Esmeralda Team (Sports Equipment)
- [Roger Rodriguez](https://github.com/Rogerrdz)
- [Julian Cardenas](https://github.com/Yuliencc2512)
- [Jose Castillo](https://github.com/JoseDavidCastillo)
- [Sebastian Galvis](https://github.com/sebRedi)

### Netherita Team (Gym Management)
- [Jesús Alberto Jauregui Conde](https://github.com/JesusJC15)
- [Natalia Espitia Espinel](https://github.com/Natalia-Espitia)
- [Santiago Hurtado Martínez](https://github.com/SantiagoHM20)
- [Andres Felipe Calderon Ramirez](https://github.com/andrescalderonr)

### Bismuto Team (User Administration & Statistics)
- [Andrés Felipe Chavarro Plazas](https://github.com/And3xDev)
- [Andrés Jacobo Sepúlveda Sánchez](https://github.com/Jaco0bo)
- [Camilo Andrés Fernández Díaz](https://github.com/CamiloFdez)
- [Jesús Alfonso Pinzón Vega](https://github.com/JAPV-X2612)

---

<div align="center">
  <p>Developed with ❤️ for Escuela Colombiana de Ingeniería Julio Garavito</p>
</div>
