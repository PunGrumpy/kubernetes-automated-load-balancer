{{/*
Expand the name of the chart.
*/}}
{{- define "k8s-auto-loadbalancer.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a shorter name for resources
*/}}
{{- define "k8s-auto-loadbalancer.shortname" -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{- if .Values.fullnameOverride -}}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s" .Release.Name $name | trunc 31 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "k8s-auto-loadbalancer.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "k8s-auto-loadbalancer.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "k8s-auto-loadbalancer.labels" -}}
helm.sh/chart: {{ include "k8s-auto-loadbalancer.chart" . }}
{{ include "k8s-auto-loadbalancer.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "k8s-auto-loadbalancer.selectorLabels" -}}
app.kubernetes.io/name: {{ include "k8s-auto-loadbalancer.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "k8s-auto-loadbalancer.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "k8s-auto-loadbalancer.shortname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}

{{/*
Create the name for the deployment
*/}}
{{- define "k8s-auto-loadbalancer.deploymentName" -}}
{{- printf "%s-deploy" (include "k8s-auto-loadbalancer.shortname" .) | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Create the name for the service
*/}}
{{- define "k8s-auto-loadbalancer.serviceName" -}}
{{- printf "%s-svc" (include "k8s-auto-loadbalancer.shortname" .) | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Create the name for the configmap
*/}}
{{- define "k8s-auto-loadbalancer.configMapName" -}}
{{- printf "%s-cm" (include "k8s-auto-loadbalancer.shortname" .) | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Create the name for the ingress route
*/}}
{{- define "k8s-auto-loadbalancer.ingressRouteName" -}}
{{- printf "%s-route" (include "k8s-auto-loadbalancer.shortname" .) | trunc 63 | trimSuffix "-" -}}
{{- end -}}