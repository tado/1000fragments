uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.49;
	p *= 0.96;
	p = rot2((time * 0.81) * -0.61) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 1.18 + 0.32 * sin((time * 0.81) * 1.66);
	float n2 = 1.07 + 0.92 * cos((time * 0.81) * 1.36);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.75;
	float d = sr - rr;
	float v = sin(d * 14.76 - (time * 0.81) * 2.32);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.20, 0.27, 0.12), vec3(0.55, 0.58, 0.51), smoothstep(0.0, 1.0, cc));
	col += (hash21(gl_FragCoord.xy + fract((time * 0.81)) * 100.0) - 0.5) * 0.06;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col = clamp(col, 0.0, 1.0) * vec3(0.957, 1.015, 0.928) * 1.00 + 0.019;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
