import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ProjectsComponent } from './projects/projects.component';
import { AboutComponent } from './about/about.component';
import { RedirectGuard } from './redirect.guard';
import { RedirectingComponent } from './redirecting/redirecting.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SecretComponent } from './secret/secret.component';
import { LanguageValues } from './language-values';

const home:string = LanguageValues.routes['home'][LanguageValues.language];
const contact:string = LanguageValues.routes['contact'][LanguageValues.language];
const projects:string = LanguageValues.routes['projects'][LanguageValues.language];
const about:string = LanguageValues.routes['about'][LanguageValues.language];
const donate:string = LanguageValues.routes['donate'][LanguageValues.language];
const license:string = LanguageValues.routes['license'][LanguageValues.language];
const source:string = LanguageValues.routes['source'][LanguageValues.language];

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: home, component: HomeComponent},
    {path: contact, component: ContactComponent},
    {path: projects, component: ProjectsComponent},
    {path: `${projects}/smsh`, component:RedirectingComponent, canActivate: [RedirectGuard], data: {externalUrl: 'https://smsh.ascyt.com/'}},
    {path: `${projects}/ezgpt`, component: RedirectingComponent, canActivate: [RedirectGuard], data: {externalUrl: 'https://pypi.org/project/ezgpt/'}},
    {path: `${projects}/tt`, component: RedirectingComponent, canActivate: [RedirectGuard], data: {externalUrl: 'https://tt.ascyt.com/'}},
    {path: `${projects}/tiersorter`, component: RedirectingComponent, canActivate: [RedirectGuard], data: {externalUrl: 'https://tiersorter.ascyt.com/'}},
    {path: `${projects}/wisdomkeys`, component: RedirectingComponent, canActivate: [RedirectGuard], data: {externalUrl: 'https://wisdomkeys.ascyt.com/'}},
    {path: `${projects}/4d-projection-playground`, component: RedirectingComponent, canActivate: [RedirectGuard], data: {externalUrl: 'https://ascyt.itch.io/4d-projection-playground'}},
    {path: about, component: AboutComponent},
    {path: 'NotFound', component: SecretComponent},

    {path: donate, component: RedirectingComponent, canActivate: [RedirectGuard], data: {externalUrl: 'https://ko-fi.com/ascyt'}},
    {path: 'github', component: RedirectingComponent, canActivate: [RedirectGuard], data: {externalUrl: 'https://github.com/Ascyt'}},
    {path: 'gh', redirectTo: '/github', pathMatch: 'full'},
    {path: source, component: RedirectingComponent, canActivate: [RedirectGuard], data: {externalUrl: 'https://github.com/Ascyt/www'}},
    {path: 'src', redirectTo: '/source', pathMatch: 'full'},
    {path: license, component: RedirectingComponent, canActivate: [RedirectGuard], data: {externalUrl: 'https://github.com/Ascyt/www/blob/main/LICENSE'}},
    {path: 'youtube', component: RedirectingComponent, canActivate: [RedirectGuard], data: {externalUrl: 'https://www.youtube.com/channel/UC4SKoh_buY9oIHIRjqmVKpw'}},
    {path: 'reddit', component: RedirectingComponent, canActivate: [RedirectGuard], data: {externalUrl: 'https://reddit.com/u/Ascyt'}},
    {path: 'subreddit', component: RedirectingComponent, canActivate: [RedirectGuard], data: {externalUrl: 'https://reddit.com/r/Ascyt'}},
    {path: 'bsky', component: RedirectingComponent, canActivate: [RedirectGuard], data: {externalUrl: 'https://bsky.app/profile/ascyt.com'}},
    {path: 'yt', redirectTo: '/youtube', pathMatch: 'full'},
    {path: 'bluesky', redirectTo: '/bsky', pathMatch: 'full'},
    {path: 'smsh', redirectTo: '/projects/smsh', pathMatch: 'full'},
    {path: 'ezgpt', redirectTo: '/projects/ezgpt', pathMatch: 'full'},
    {path: 'tt', redirectTo: '/projects/tt', pathMatch: 'full'},
    {path: 'tiersorter', redirectTo: '/projects/tiersorter', pathMatch: 'full'},
    {path: 'wisdomkeys', redirectTo:'/projects/wisdomkeys', pathMatch: 'full'},
    {path: '4d-projection-playground', redirectTo: '/projects/4d-projection-playground', pathMatch: 'full'},
    {path: 'grapes', component: RedirectingComponent, canActivate: [RedirectGuard], data: {externalUrl: 'https://grapes.ascyt.com'}},

    {path: 'open-qotd', component: RedirectingComponent, canActivate: [RedirectGuard], data: {externalUrl: 'https://open-qotd.ascyt.com/'}},
    {path: 'qotd', redirectTo: 'open-qotd'},
    {path: 'openqotd', redirectTo: 'open-qotd'},
    {path: 'custom-qotd', redirectTo: 'open-qotd'},
    {path: 'customqotd', redirectTo: 'open-qotd'},
    {path: 'link', component: RedirectingComponent, canActivate: [RedirectGuard], data: {externalUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ'}},

    {path: '**', component: NotFoundComponent}
];
