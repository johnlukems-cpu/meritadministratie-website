import { ArrowLeft } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { Button } from '@/components/ui/Button';
import { Container, Section } from '@/components/ui/Container';
import { routes } from '@/config/routes';

export default function NotFound() {
  return (
    <>
      <Seo
        title="Pagina niet gevonden"
        description="De pagina die u zoekt bestaat niet of is verplaatst."
        noindex
      />
      <Section tone="alt" className="!py-24 md:!py-32">
        <Container narrow className="text-center">
          <p className="eyebrow mb-4 justify-center">Foutmelding 404</p>
          <h1 className="text-4xl font-semibold sm:text-5xl">Pagina niet gevonden</h1>
          <p className="mx-auto mt-5 max-w-lg text-lg text-muted">
            De pagina die u zoekt bestaat niet of is verplaatst.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button to={routes.home.path} iconLeft={<ArrowLeft />}>
              Terug naar home
            </Button>
            <Button to={routes.diensten.path} variant="outline">
              Bekijk onze diensten
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
