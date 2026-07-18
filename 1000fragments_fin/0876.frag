uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.13 + (time * 0.64) * 0.99) * 0.16;
	p *= 1.08;
	p = rot2((time * 0.64) * 1.06) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 0.78 + 0.70 * sin((time * 0.64) * 1.44);
	float n2 = 1.48 + 0.55 * cos((time * 0.64) * 1.30);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.83;
	float d = sr - rr;
	float v = d;
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.033, 0.066, 0.085), vec3(0.788, 0.706, 0.953), smoothstep(0.0, 1.0, cc));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.68));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.19);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.05);
	col *= vec3(1.011, 0.981, 0.939);
	col += 0.024;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.24 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
