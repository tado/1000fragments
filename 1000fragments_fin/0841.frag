uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.52;
	p.y = abs(p.y);
	p *= 0.90;
	p = rot2((time * 0.61) * 0.87) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 1.14 + 0.63 * sin((time * 0.61) * 1.43);
	float n2 = 1.27 + 0.23 * cos((time * 0.61) * 0.74);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.49;
	float d = sr - rr;
	float v = d;
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.969, 0.747, 0.723), vec3(0.174, 0.073, 0.087), cc);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.39);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.22);
	col *= vec3(1.007, 0.991, 0.947);
	col += 0.004;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.42 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
