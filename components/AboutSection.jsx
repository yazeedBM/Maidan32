/**
 * "عن ميدان" — white section, large blue centered-start heading, two
 * paragraphs of brand copy taken verbatim from the design.
 */
export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-white py-20 sm:py-28">
      <div className="container-site">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="about-title" className="section-title">
            عن ميدان
          </h2>

          <p className="mt-8 text-base font-medium leading-loose text-ink-soft sm:text-lg">
            ميدان هو منصة تجمع الهاكاثونات والمبتكرين في مكان واحد، لتسهّل عليك
            اكتشاف الفرص والمشاركة فيها، سواء كنت ترغب في إنشاء فريقك الخاص أو
            الانضمام إلى فريق قائم، يساعدك ميدان على العثور على الأشخاص الذين
            يشاركونك الشغف والمهارات لتحقيق أفضل النتائج.
          </p>

          <p className="mt-6 text-base font-medium leading-loose text-ink-soft sm:text-lg">
            نسعى إلى بناء مجتمع يجمع الأفكار بالمواهب، ويجعل الوصول إلى
            الهاكاثونات والتعاون بين المشاركين أكثر سهولة، ليكون كل تحدٍ فرصة
            جديدة للتعلم، والابتكار، وصناعة الأثر.
          </p>
        </div>
      </div>
    </section>
  );
}