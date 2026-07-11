uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.98;
	p = rot2((time * 0.82) * -0.93) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 0.95 + 0.59 * sin((time * 0.82) * 0.57);
	float n2 = 2.30 + 0.33 * cos((time * 0.82) * 0.85);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.80;
	float d = sr - rr;
	float v = d;
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.08, 0.08, 0.05), vec3(0.76, 0.59, 0.77), cc);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.82)) * 100.0) - 0.5) * 0.10;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.35);
	col = clamp(col, 0.0, 1.0) * vec3(1.012, 1.009, 0.987) * 1.00 + 0.033;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
