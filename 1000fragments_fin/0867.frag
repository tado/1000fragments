uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.88) * 0.84), cos((time * 0.88) * 1.14)) * 0.08;
	p *= 0.85;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 1.33 + 0.68 * sin((time * 0.88) * 1.25);
	float n2 = 0.74 + 0.83 * cos((time * 0.88) * 0.68);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.46;
	float d = sr - rr;
	float v = d;
	vec3 col = vec3(0.5 + 0.5 * (v)) * vec3(0.58, 0.62, 0.62) + vec3(0.06, 0.07, 0.09);
	col *= 0.87 + 0.17 * sin(gl_FragCoord.y * 2.97 + (time * 0.88) * 12.85);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.51);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col *= vec3(0.933, 0.987, 1.059);
	col += 0.016;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.53 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
