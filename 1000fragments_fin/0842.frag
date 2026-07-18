uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p.x += p.y * 0.58;
	p *= 1.41;
	p = rot2((time * 0.75) * -0.50) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.64 + 0.32 * sin((time * 0.75) * 1.50);
	float n2 = 0.76 + 0.64 * cos((time * 0.75) * 1.59);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.88;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.09, d);

	float cc = clamp(0.5 + 0.5 * (v * 1.16 + sr * 0.51), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.030, 0.027, 0.094), vec3(0.468, 0.205, 0.629), smoothstep(0.0, 0.51, cc)), vec3(1.000, 0.688, 0.842), smoothstep(0.51, 1.0, cc));
	col *= 1.0 - smoothstep(0.0, 0.07, d) * 0.74;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.56));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.18);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col *= vec3(1.024, 0.968, 0.996);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.35 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
