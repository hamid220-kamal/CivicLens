'use client';

interface Citation {
  title: string;
  code?: string;
  excerpt: string;
}

interface ComplianceAuditModalProps {
  compliance: Citation;
  onClose: () => void;
}

export default function ComplianceAuditModal({
  compliance,
  onClose,
}: ComplianceAuditModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-surface border-b border-border p-6 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">
              ⚖️ Regulatory Compliance Audit
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Statutory Reference Detail
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Main Citation */}
          <div className="bg-surface-alt rounded-lg p-6 border-l-4 border-primary">
            <h3 className="text-xl font-bold text-text-primary mb-2">
              {compliance.title}
            </h3>
            {compliance.code && (
              <p className="text-sm font-semibold text-text-secondary mb-4">
                {compliance.code}
              </p>
            )}
            <p className="text-base text-text-primary leading-relaxed italic">
              "{compliance.excerpt}"
            </p>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-surface-alt rounded-lg p-4">
              <p className="text-xs font-bold text-text-secondary mb-1 uppercase">
                Enacted
              </p>
              <p className="text-sm font-semibold text-text-primary">
                2021 Municipal Transportation Rev.
              </p>
            </div>
            <div className="bg-surface-alt rounded-lg p-4">
              <p className="text-xs font-bold text-text-secondary mb-1 uppercase">
                Jurisdiction
              </p>
              <p className="text-sm font-semibold text-text-primary">
                Ward 4 DPW
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-4 border-t border-border">
            <button className="w-full px-4 py-2 bg-surface-alt hover:bg-background text-text-primary rounded-lg font-semibold transition-colors">
              👁️ View Legal Codex
            </button>
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-colors"
            >
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
