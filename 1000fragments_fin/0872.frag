uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p *= 1.39;
	p *= 1.42;
	p = rot2((time * 0.80) * 0.51) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 1.88 + 0.26 * sin((time * 0.80) * 1.61);
	float n2 = 2.32 + 0.69 * cos((time * 0.80) * 1.24);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.61;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.08, d);

	vec3 col = vec3(0.5 + 0.5 * (v * 1.67 + sr * 1.54)) * vec3(0.52, 0.51, 0.45) + vec3(0.11, 0.11, 0.10);
	col *= 1.0 - smoothstep(0.0, 0.09, d) * 0.93;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.17);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col *= vec3(1.002, 1.012, 0.989);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.60 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
