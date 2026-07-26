/**
 * "عن ميدان" — white band, large blue heading and two right-aligned
 * paragraphs of brand copy, taken verbatim from the Figma.
 */
export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="bg-white py-24 sm:py-32"
    >
      <div className="container-site">
        <div className="ms-auto max-w-[980px] text-right">
          <h2 id="about-title" className="section-title">
            عن ميدان
          </h2>

          <p className="mt-9 text-[17px] font-medium leading-[2.1] text-ink-soft sm:text-[18px]">
            ميدان هو منصة تجمع الهاكاثونات والمبتكرين في مكان واحد، لتسهّل عليك
            اكتشاف الفرص والمشاركة فيها. سواء كنت ترغب في إنشاء فريقك الخاص أو
            الانضمام إلى فريق قائم، يساعدك ميدان على العثور على الأشخاص الذين
            يشاركونك الشغف والمهارات لتحقيق أفضل النتائج.
          </p>

          <p className="mt-7 text-[17px] font-medium leading-[2.1] text-ink-soft sm:text-[18px]">
            نسعى إلى بناء مجتمع يجمع الأفكار بالمواهب، ويجعل الوصول إلى
            الهاكاثونات والتعاون بين المشاركين أكثر سهولة، ليكون كل تحدٍ فرصة
            جديدة للتعلم، والابتكار، وصناعة الأثر.
          </p>
        </div>
      </div>
    </section>
  );
}
