import FactoryStats from "../../components/factory/FactoryStats";
import QualityControl from "../../components/factory/QualityControl";
import WorldwideShipping from "../../components/factory/WorldwideShipping";
import FactoryCertifications from "../../components/factory/FactoryCertificates";
import FactoryCTA from "../../components/factory/FactoryCTA";

export default function FactoryPage() {
  return (
    <main className="bg-black">
    <FactoryStats />
    <QualityControl />
    <WorldwideShipping />
    <FactoryCertifications />
    <FactoryCTA />
    </main>
  );
}