uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.19;
	p = rot2((time * 0.80) * 1.56) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 0.69 + 0.36 * sin((time * 0.80) * 0.68);
	float n2 = 1.49 + 0.35 * cos((time * 0.80) * 1.04);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.41;
	float d = sr - rr;
	float v = d;
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.64, 0.61, 0.67), vec3(0.07, 0.17, 0.17), cc);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.80)) * 100.0) - 0.5) * 0.11;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.37);
	col = clamp(col, 0.0, 1.0) * vec3(0.960, 1.024, 0.927) * 1.00 + 0.025;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
