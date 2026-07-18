uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p *= 1.09;
	p = rot2((time * 0.84) * 0.72) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.04 + 0.57 * sin((time * 0.84) * 1.92);
	float n2 = 0.93 + 0.71 * cos((time * 0.84) * 0.75);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.84;
	float d = sr - rr;
	float v = sin(d * 28.74 - (time * 0.84) * 5.55);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.015, 0.088, 0.033), vec3(0.372, 0.465, 0.206), smoothstep(0.0, 0.46, cc)), vec3(1.000, 0.880, 0.528), smoothstep(0.46, 1.0, cc));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.95));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.41);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.10);
	col *= vec3(0.934, 0.985, 1.036);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.32 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
