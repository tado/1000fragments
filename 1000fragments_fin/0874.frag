uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p *= 1.50;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.90 + 0.37 * sin((time * 0.59) * 1.89);
	float n2 = 1.93 + 0.72 * cos((time * 0.59) * 0.50);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.68;
	float d = sr - rr;
	float v = d;
	vec3 col = vec3(0.5 + 0.5 * (v)) * vec3(0.41, 0.47, 0.44) + vec3(0.03, 0.03, 0.04);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.33);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col *= vec3(0.934, 0.972, 1.040);
	col += 0.020;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.31 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
