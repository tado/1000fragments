uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.86;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 0.88 + 0.49 * sin((time * 0.63) * 0.60);
	float n2 = 1.64 + 0.20 * cos((time * 0.63) * 1.70);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.50;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.13, d);

	vec3 col = vec3(0.75, 0.62, 0.67) * (0.12 / (abs((v * 2.23 + sr * 1.04)) + 0.08));
	col = col / (1.0 + col);
	col *= 1.0 - smoothstep(0.0, 0.04, d) * 0.90;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.27));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.59);
	col = clamp(col, 0.0, 1.0) * vec3(0.941, 0.998, 1.031) * 1.00 + 0.034;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
