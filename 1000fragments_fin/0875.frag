uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.25;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 1.97 + 0.59 * sin((time * 0.85) * 1.29);
	float n2 = 1.25 + 0.73 * cos((time * 0.85) * 1.04);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.73;
	float d = sr - rr;
	float v = sin(d * 22.96 - (time * 0.85) * 3.82);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.180, 0.060, 0.096), vec3(0.991, 0.742, 0.725), cc);
	col = clamp((col - 0.5) * 1.53 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.43);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(1.027, 0.972, 0.957);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.58 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
