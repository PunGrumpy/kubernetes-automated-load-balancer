import * as k8s from '@kubernetes/client-node'
import { NextResponse } from 'next/server'

let visitorCount = 0

export async function GET() {
  try {
    const kc = new k8s.KubeConfig()
    kc.loadFromDefault()

    const coreV1Api = kc.makeApiClient(k8s.CoreV1Api)

    const podName = process.env.HOSTNAME || 'unknown'
    const namespace = process.env.KUBERNETES_NAMESPACE || 'default'
    const { body: pod } = await coreV1Api.readNamespacedPod(podName, namespace)

    const nodeName = pod.spec?.nodeName || 'unknown'
    const { body: node } = await coreV1Api.readNode(nodeName)

    visitorCount++

    return NextResponse.json({
      podName: podName,
      podIp: pod.status?.podIP || 'unknown',
      nodeName: nodeName,
      nodeIp:
        node.status?.addresses?.find(addr => addr.type === 'InternalIP')
          ?.address || 'unknown',
      namespace: namespace,
      visitorCount: visitorCount,
      serverTime: new Date().toISOString(),
      kubernetesVersion: node.status?.nodeInfo?.kubeletVersion || 'unknown'
    })
  } catch (error) {
    console.error('Error fetching Kubernetes information:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch Kubernetes information'
      },
      { status: 500 }
    )
  }
}
