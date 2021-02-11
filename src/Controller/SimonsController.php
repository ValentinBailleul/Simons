<?php

namespace App\Controller;

use App\Repository\SequenceRepository;
use App\Repository\UserSimonsRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class SimonsController extends AbstractController
{
    /**
     * @Route("/", name="users")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function index(): Response
    {
        return $this->render('base.html.twig', [
        ]);
    }

    /**
     * @Route("/api/sequences", name="sequence")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function allSequence(SequenceRepository $sequenceRepository): Response
    {
        $response = $this->json($sequenceRepository->findAll(), 200, [], ['groups'=>'sequence:read']);
        return $response;
    }
}
