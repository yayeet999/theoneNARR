import { Switch, Route } from "wouter";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { DashboardLayout } from "./components/dashboard/layout/DashboardLayout";
import { HomeContent } from "./components/dashboard/placeholders/HomeContent";
import { Home } from "./pages/Home";
import { Login } from "./pages/auth/Login";
import { Signup } from "./pages/auth/Signup";
import { NovelWorkshop } from "./pages/dashboard/NovelWorkshop";
import { ExplanationPage } from "./pages/dashboard/NovelGeneration/ExplanationPage";

// Import existing workflow components
import NovelCreation from "./pages/NovelCreation";
import WorldBuilding from "./pages/WorldBuilding";
import CharacterCreationHub from "./pages/CharacterCreation";
import PlotStructureHub from "./pages/PlotStructure";
import { CorePlotElements } from "@/components/plot/CorePlotElements";
import { PacingAndIntegration } from "@/components/plot/PacingAndIntegration";
import { ThemesOverview } from './components/themes/ThemesOverview';
import { ThemeExpression } from './components/themes/ThemeExpression';
import { StyleAndTone } from './components/style/StyleAndTone';
import GenerateNovel from "./pages/GenerateNovel";
import NovelPreview from "./pages/NovelPreview";

function App() {
  return (
    <AuthProvider>
      <Switch>
        {/* Public Routes */}
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard">
          {() => (
            <ProtectedRoute>
              <DashboardLayout>
                <HomeContent />
              </DashboardLayout>
            </ProtectedRoute>
          )}
        </Route>

        {/* Protected Novel Workshop Routes */}
        <Route path="/novel-workshop">
          {() => (
            <ProtectedRoute>
              <DashboardLayout>
                <NovelWorkshop />
              </DashboardLayout>
            </ProtectedRoute>
          )}
        </Route>

        <Route path="/novel-workshop/generation">
          {() => (
            <ProtectedRoute>
              <DashboardLayout>
                <ExplanationPage />
              </DashboardLayout>
            </ProtectedRoute>
          )}
        </Route>

        {/* Protected Novel Generation Workflow */}
        <Route path="/novel-workshop/generation/workflow">
          {() => (
            <ProtectedRoute>
              <DashboardLayout>
                <NovelCreation />
              </DashboardLayout>
            </ProtectedRoute>
          )}
        </Route>

        <Route path="/novel-workshop/generation/workflow/world-building">
          {() => (
            <ProtectedRoute>
              <DashboardLayout>
                <WorldBuilding />
              </DashboardLayout>
            </ProtectedRoute>
          )}
        </Route>

        <Route path="/novel-workshop/generation/workflow/character-creation">
          {() => (
            <ProtectedRoute>
              <DashboardLayout>
                <CharacterCreationHub />
              </DashboardLayout>
            </ProtectedRoute>
          )}
        </Route>

        <Route path="/novel-workshop/generation/workflow/plot-structure">
          {() => (
            <ProtectedRoute>
              <DashboardLayout>
                <PlotStructureHub />
              </DashboardLayout>
            </ProtectedRoute>
          )}
        </Route>

        <Route path="/novel-workshop/generation/workflow/plot-structure/core-elements">
          {() => (
            <ProtectedRoute>
              <DashboardLayout>
                <CorePlotElements />
              </DashboardLayout>
            </ProtectedRoute>
          )}
        </Route>

        <Route path="/novel-workshop/generation/workflow/plot-structure/pacing-integration">
          {() => (
            <ProtectedRoute>
              <DashboardLayout>
                <PacingAndIntegration />
              </DashboardLayout>
            </ProtectedRoute>
          )}
        </Route>

        <Route path="/novel-workshop/generation/workflow/themes">
          {() => (
            <ProtectedRoute>
              <DashboardLayout>
                <ThemesOverview />
              </DashboardLayout>
            </ProtectedRoute>
          )}
        </Route>

        <Route path="/novel-workshop/generation/workflow/themes/expression">
          {() => (
            <ProtectedRoute>
              <DashboardLayout>
                <ThemeExpression />
              </DashboardLayout>
            </ProtectedRoute>
          )}
        </Route>

        <Route path="/novel-workshop/generation/workflow/style">
          {() => (
            <ProtectedRoute>
              <DashboardLayout>
                <StyleAndTone />
              </DashboardLayout>
            </ProtectedRoute>
          )}
        </Route>

        <Route path="/novel-workshop/generation/workflow/preview">
          {() => (
            <ProtectedRoute>
              <DashboardLayout>
                <NovelPreview />
              </DashboardLayout>
            </ProtectedRoute>
          )}
        </Route>

        <Route path="/novel-workshop/generation/workflow/generate">
          {() => (
            <ProtectedRoute>
              <DashboardLayout>
                <GenerateNovel />
              </DashboardLayout>
            </ProtectedRoute>
          )}
        </Route>
      </Switch>
    </AuthProvider>
  );
}

export default App;