uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.10;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 0.68 + 0.54 * sin((time * 0.64) * 1.77);
	float n2 = 1.47 + 0.40 * cos((time * 0.64) * 1.76);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.64;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.08, d);

	float cc = clamp(0.5 + 0.5 * (v * 1.87 + sr * 1.77), 0.0, 1.0);
	vec3 col = mix(vec3(0.06, 0.05, 0.04), vec3(0.55, 0.66, 0.68), cc);
	col *= 1.0 - smoothstep(0.0, 0.13, d) * 0.68;
	col += (hash21(gl_FragCoord.xy + fract((time * 0.64)) * 100.0) - 0.5) * 0.10;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.41);
	col = clamp(col, 0.0, 1.0) * vec3(1.003, 0.965, 0.994) * 1.00 + 0.033;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
