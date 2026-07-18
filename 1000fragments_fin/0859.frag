uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.67 + (time * 0.62) * 0.61) * 0.07;
	p.x = abs(p.x);
	p *= 1.41;
	p = rot2((time * 0.62) * -0.44) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 0.89 + 0.74 * sin((time * 0.62) * 1.95);
	float n2 = 0.69 + 0.79 * cos((time * 0.62) * 1.40);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.85;
	float d = sr - rr;
	float v = sin(d * 18.38 - (time * 0.62) * 1.19);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.929, 0.909, 0.850), vec3(0.034, 0.059, 0.113), smoothstep(0.0, 1.0, cc));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.46);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col *= vec3(1.007, 0.985, 1.002);
	col += 0.004;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.52 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
