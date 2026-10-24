import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProjectCards from '@/components/projects/project-cards';
import ProjectModal from '@/components/projects/project-modal';
import AdoptTreeModal from '@/components/adopt-tree/adopt-tree-modal';
import TokensSection from '@/components/dashboard/tokens-section';
import { projectsApi, type EnhancedProject } from '@/services/api/projects-api';
import { buyToken } from '@/services/buy-token.service';
import { useToast } from '@/hooks/use-toast';

// Mock Next.js Image component for jsdom compatibility
vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, fill, ...props }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt || ''} {...props} />
  ),
}));

// Mock projects API service
vi.mock('@/services/api/projects-api', () => ({
  projectsApi: {
    getProjects: vi.fn(),
    getProject: vi.fn(),
    participateInProject: vi.fn(),
    toggleProjectFavorite: vi.fn(),
  },
}));

// Mock buy-token service
vi.mock('@/services/buy-token.service', () => ({
  buyToken: vi.fn(),
}));

// Mock useToast hook
const mockToast = vi.fn();
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: mockToast,
    toasts: [],
    dismiss: vi.fn(),
  }),
}));

// Mock sonner toast for mutations
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock sample projects
const mockSampleProjects: EnhancedProject[] = [
  {
    id: 'proj-monteverde-101',
    name: 'Monteverde Cloud Forest Reserve',
    title: 'Monteverde Cloud Forest Reserve',
    description: 'Protecting endangered cloud forest ecosystems in Puntarenas',
    location: 'Monteverde, Costa Rica',
    status: 'Available',
    supply: 1000000,
    impact: '1500 hectares protected',
    imageUrl: '/images/monteverde.jpg',
    image: '/images/monteverde.jpg',
    rating: 4.9,
    species: ['Oak', 'Magnolia', 'Bromeliad'],
    activities: ['Reforestation', 'Wildlife Monitoring'],
    isFavorite: false,
    about: 'High-elevation cloud forest sanctuary with endemic species.',
    mission: 'Preserving Monteverde biological corridor for biodiversity.',
  },
  {
    id: 'proj-tortuguero-102',
    name: 'Tortuguero Coastal Forest Initiative',
    title: 'Tortuguero Coastal Forest Initiative',
    description: 'Coastal rainforest and green turtle nesting habitat restoration',
    location: 'Tortuguero, Limón, Costa Rica',
    status: 'Available',
    supply: 750000,
    impact: '800 hectares coastal buffer',
    imageUrl: '/images/tortuguero.jpg',
    image: '/images/tortuguero.jpg',
    rating: 4.8,
    species: ['Almendro', 'Manirote'],
    activities: ['Turtle Protection', 'Mangrove Restoration'],
    isFavorite: false,
    about: 'Water-bound rainforest protecting coastal marine life.',
    mission: 'Restoring lowland wetlands and critical habitat.',
  },
];

// Helper to wrap test components with QueryClientProvider
function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

function renderWithClient(ui: React.ReactElement, client = createTestQueryClient()) {
  return {
    ...render(
      <QueryClientProvider client={client}>
        {ui}
      </QueryClientProvider>
    ),
    client,
  };
}

describe('Project Token Purchase Flow (End-to-End UI)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('1. Project Listing Display', () => {
    it('displays project cards when data is loaded successfully', async () => {
      vi.mocked(projectsApi.getProjects).mockResolvedValue(mockSampleProjects);

      renderWithClient(<ProjectCards />);

      // Verify project cards render with relevant metadata
      await waitFor(() => {
        expect(screen.getByText('Monteverde Cloud Forest Reserve')).toBeInTheDocument();
        expect(screen.getByText('Tortuguero Coastal Forest Initiative')).toBeInTheDocument();
      });

      expect(screen.getByText('Monteverde, Costa Rica')).toBeInTheDocument();
      expect(screen.getByText('Tortuguero, Limón, Costa Rica')).toBeInTheDocument();
      expect(screen.getByText('1500 hectares protected')).toBeInTheDocument();
      expect(screen.getByText('800 hectares coastal buffer')).toBeInTheDocument();
    });

    it('displays error UI and provides retry mechanism when fetch fails', async () => {
      const errorWithStatus = new Error('API fetch error');
      (errorWithStatus as any).status = 400;
      vi.mocked(projectsApi.getProjects).mockRejectedValue(errorWithStatus);

      renderWithClient(<ProjectCards />);

      await waitFor(() => {
        expect(screen.getByText(/Failed to load projects/i)).toBeInTheDocument();
      });

      const retryButton = screen.getByRole('button', { name: /retry/i });
      expect(retryButton).toBeInTheDocument();

      // Trigger retry
      vi.mocked(projectsApi.getProjects).mockResolvedValue(mockSampleProjects);
      fireEvent.click(retryButton);

      await waitFor(() => {
        expect(screen.getByText('Monteverde Cloud Forest Reserve')).toBeInTheDocument();
      });
    });
  });

  describe('2. Project Modal & Participation Details', () => {
    it('renders project modal with mission, species, and participation input', async () => {
      const targetProject = mockSampleProjects[0];
      vi.mocked(projectsApi.getProject).mockResolvedValue(targetProject);

      const onClose = vi.fn();
      renderWithClient(
        <ProjectModal
          isOpen={true}
          onClose={onClose}
          project={targetProject}
        />
      );

      // Verify modal content
      await waitFor(() => {
        expect(screen.getByText('Monteverde Cloud Forest Reserve')).toBeInTheDocument();
        expect(screen.getByText('Participate in this Project')).toBeInTheDocument();
      });

      expect(screen.getByText('Oak')).toBeInTheDocument();
      expect(screen.getByText('Magnolia')).toBeInTheDocument();
      expect(screen.getByText('Wildlife Monitoring')).toBeInTheDocument();

      // Verify token participation amount input
      const amountInput = await screen.findByLabelText(/Amount \(tokens\)/i);
      expect(amountInput).toBeInTheDocument();
      expect(amountInput).toHaveValue(1);

      // Change amount
      fireEvent.change(amountInput, { target: { value: '50' } });
      expect(amountInput).toHaveValue(50);
    });

    it('triggers participation mutation when Participate button is clicked', async () => {
      const targetProject = mockSampleProjects[0];
      vi.mocked(projectsApi.getProject).mockResolvedValue(targetProject);
      vi.mocked(projectsApi.participateInProject).mockResolvedValue({
        id: 'purchase-123',
        projectId: targetProject.id,
        amount: 10,
      } as any);

      renderWithClient(
        <ProjectModal
          isOpen={true}
          onClose={vi.fn()}
          project={targetProject}
        />
      );

      const amountInput = await screen.findByLabelText(/Amount \(tokens\)/i);
      fireEvent.change(amountInput, { target: { value: '10' } });

      const participateButton = screen.getByRole('button', { name: /Participate/i });
      fireEvent.click(participateButton);

      await waitFor(() => {
        expect(projectsApi.participateInProject).toHaveBeenCalledWith(targetProject.id, 10);
      });
    });
  });

  describe('3. Adopt Tree Modal Flow & Purchase Execution', () => {
    it('executes token purchase successfully via AdoptTreeModal and shows success toast', async () => {
      vi.mocked(buyToken).mockResolvedValue({
        message: 'Token purchase successful',
        transaction: { txHash: 'TX_123456789' },
      });

      const onClose = vi.fn();
      render(
        <AdoptTreeModal
          isOpen={true}
          onClose={onClose}
          projectId="proj-monteverde-101"
        />
      );

      // Check modal rendered
      expect(screen.getByText('Adopt a Tree')).toBeInTheDocument();
      expect(screen.getByText('Enter the amount of tokens to adopt trees.')).toBeInTheDocument();

      // Change purchase amount to 25
      const input = screen.getByRole('spinbutton');
      fireEvent.change(input, { target: { value: '25' } });
      expect(input).toHaveValue(25);

      // Click Confirm Purchase
      const confirmButton = screen.getByRole('button', { name: /Confirm Purchase/i });
      fireEvent.click(confirmButton);

      // Verify buyToken API call
      await waitFor(() => {
        expect(buyToken).toHaveBeenCalledWith(
          'proj-monteverde-101',
          expect.any(String),
          25
        );
      });

      // Verify toast notification and modal closure
      await waitFor(() => {
        expect(mockToast).toHaveBeenCalledWith({
          title: 'Success',
          description: 'Tree adopted successfully!',
        });
        expect(onClose).toHaveBeenCalled();
      });
    });

    it('handles purchase failure and shows error toast', async () => {
      vi.mocked(buyToken).mockRejectedValue(new Error('Insufficient balance or trustline missing'));

      render(
        <AdoptTreeModal
          isOpen={true}
          onClose={vi.fn()}
          projectId="proj-tortuguero-102"
        />
      );

      const confirmButton = screen.getByRole('button', { name: /Confirm Purchase/i });
      fireEvent.click(confirmButton);

      await waitFor(() => {
        expect(mockToast).toHaveBeenCalledWith({
          title: 'Error',
          description: 'Insufficient balance or trustline missing',
        });
      });
    });

    it('disables purchase button when amount is less than 1', async () => {
      render(
        <AdoptTreeModal
          isOpen={true}
          onClose={vi.fn()}
          projectId="proj-monteverde-101"
        />
      );

      const input = screen.getByRole('spinbutton');
      fireEvent.change(input, { target: { value: '0' } });

      const confirmButton = screen.getByRole('button', { name: /Confirm Purchase/i });
      expect(confirmButton).toBeDisabled();
    });
  });

  describe('4. User Panel Tokens Section Display', () => {
    it('displays acquired tokens in user dashboard panel', () => {
      render(<TokensSection />);

      expect(screen.getByText('Latest tokens acquired')).toBeInTheDocument();
      expect(screen.getByText('CAOBA')).toBeInTheDocument();
      expect(screen.getByText('ALMENDRO')).toBeInTheDocument();
      expect(screen.getByText('CENÍZARO')).toBeInTheDocument();
      expect(screen.getByText('ESPABEL')).toBeInTheDocument();
    });
  });

  describe('5. Integrated User Journey (Browse -> Select -> Adopt -> Verify)', () => {
    it('completes the entire token purchase journey from project cards to adoption confirmation', async () => {
      vi.mocked(projectsApi.getProjects).mockResolvedValue(mockSampleProjects);
      vi.mocked(projectsApi.getProject).mockImplementation(async (id) => {
        return mockSampleProjects.find((p) => p.id === id) || mockSampleProjects[0];
      });
      vi.mocked(buyToken).mockResolvedValue({
        message: 'Token purchase successful',
        transaction: { txHash: 'TX_COMPLETE_E2E_999' },
      });

      // 1. Render project cards catalog
      renderWithClient(<ProjectCards />);

      await waitFor(() => {
        expect(screen.getByText('Monteverde Cloud Forest Reserve')).toBeInTheDocument();
      });

      // 2. Click project card to view modal
      const projectCard = screen.getByText('Monteverde Cloud Forest Reserve');
      fireEvent.click(projectCard);

      // 3. Verify modal opens with project specifications
      await waitFor(() => {
        expect(screen.getByText('Participate in this Project')).toBeInTheDocument();
      });

      // 4. Open AdoptTreeModal to finalize blockchain purchase
      const { unmount } = render(
        <AdoptTreeModal
          isOpen={true}
          onClose={vi.fn()}
          projectId="proj-monteverde-101"
        />
      );

      const tokenInput = screen.getByRole('spinbutton');
      fireEvent.change(tokenInput, { target: { value: '100' } });

      const purchaseBtn = screen.getByRole('button', { name: /Confirm Purchase/i });
      fireEvent.click(purchaseBtn);

      await waitFor(() => {
        expect(buyToken).toHaveBeenCalledWith('proj-monteverde-101', expect.any(String), 100);
        expect(mockToast).toHaveBeenCalledWith({
          title: 'Success',
          description: 'Tree adopted successfully!',
        });
      });

      unmount();

      // 5. Verify user dashboard tokens display
      const { container } = render(<TokensSection />);
      expect(container).toHaveTextContent('Latest tokens acquired');
    });
  });
});
