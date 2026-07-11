uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.32;
	p = rot2((time * 0.55) * 0.69) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 1.34 + 0.75 * sin((time * 0.55) * 0.80);
	float n2 = 0.81 + 0.79 * cos((time * 0.55) * 1.75);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.59;
	float d = sr - rr;
	float v = sin(d * 18.75 - (time * 0.55) * 5.27);
	vec3 col = vec3(0.5 + 0.5 * (v)) * vec3(0.53, 0.54, 0.52) + vec3(0.07, 0.02, 0.06);
	col = clamp((col - 0.5) * 1.49 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.48);
	col = clamp(col, 0.0, 1.0) * vec3(1.019, 1.002, 0.996) * 1.00 + 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
