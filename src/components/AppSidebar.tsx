
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Home,
  ShoppingCart,
  TrendingUp,
  Factory,
  Users,
  Scale,
  Search,
  BarChart3,
  FileText,
  Truck,
  CreditCard,
  Package,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    title: "Tableau de bord",
    url: "/dashboard",
    icon: Home,
  },
];

const menuGroups = [
  {
    label: "Achat",
    items: [
      {
        title: "Journal Réception",
        url: "/achat/journal-reception",
        icon: Package,
      },
      {
        title: "Journal Facture Achat",
        url: "/achat/journal-facture",
        icon: FileText,
      },
      {
        title: "Journal Règlement",
        url: "/achat/journal-reglement",
        icon: CreditCard,
      },
      {
        title: "Solde Fournisseur",
        url: "/achat/solde-fournisseur",
        icon: Users,
      },
    ],
  },
  {
    label: "Vente",
    items: [
      {
        title: "Journal Livraison",
        url: "/vente/journal-livraison",
        icon: Truck,
      },
      {
        title: "Journal Facture Vente",
        url: "/vente/journal-facture",
        icon: FileText,
      },
      {
        title: "Journal Encaissement",
        url: "/vente/journal-encaissement",
        icon: CreditCard,
      },
      {
        title: "Portefeuille",
        url: "/vente/portefeuille",
        icon: TrendingUp,
      },
      {
        title: "Solde Client",
        url: "/vente/solde-client",
        icon: Users,
      },
    ],
  },
  {
    label: "Production",
    items: [
      {
        title: "Journal de Production",
        url: "/production/journal-production",
        icon: Factory,
      },
      {
        title: "Journal de Consommation",
        url: "/production/journal-consommation",
        icon: ShoppingCart,
      },
      {
        title: "Journal Mélange",
        url: "/production/journal-melange",
        icon: Package,
      },
      {
        title: "État d'écart",
        url: "/production/etat-ecart",
        icon: BarChart3,
      },
    ],
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="px-6 py-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-straton-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <div>
            <h2 className="font-heading font-bold text-lg">STRATON</h2>
            <p className="text-xs text-muted-foreground">Reporting Web</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <Link to={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {menuGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                      <Link to={item.url}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="px-6 py-4 border-t border-sidebar-border">
        <div className="text-xs text-muted-foreground">
          STRATON © 2025
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
