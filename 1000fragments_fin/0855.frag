uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.43;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 1.96 + 0.45 * sin((time * 0.69) * 0.58);
	float n2 = 0.66 + 0.44 * cos((time * 0.69) * 1.43);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.86;
	float d = sr - rr;
	float v = d;
	vec3 col = vec3(0.5 + 0.5 * (v)) * vec3(0.64, 0.66, 0.74) + vec3(0.03, 0.03, 0.03);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.29);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.04);
	col *= vec3(0.949, 0.992, 1.031);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.38 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
