import { Switch, Route } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
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
    <Switch>
      <Route path="/" component={NovelCreation} />
      <Route path="/world-building" component={WorldBuilding} />
      <Route path="/character-creation" component={CharacterCreationHub} />
      <Route path="/plot-structure" component={PlotStructureHub} />
      <Route path="/plot-structure/core-elements" component={CorePlotElements} />
      <Route path="/plot-structure/pacing-integration" component={PacingAndIntegration} />
      <Route path="/themes" component={ThemesOverview} />
      <Route path="/themes/expression" component={ThemeExpression} />
      <Route path="/style" component={StyleAndTone} />
      <Route path="/preview" component={NovelPreview} />
      <Route path="/generate" component={GenerateNovel} />
      <Route component={NotFound} />
    </Switch>
  );
}

// fallback 404 not found page
function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            Did you forget to add the page to the router?
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;