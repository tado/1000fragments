uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.16;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.23 + 0.62 * sin((time * 0.67) * 1.30);
	float n2 = 1.60 + 0.83 * cos((time * 0.67) * 1.73);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.59;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.11, d);

	vec3 col = vec3(0.5 + 0.5 * (v * 1.87 + sr * 1.83)) * vec3(0.59, 0.60, 0.56) + vec3(0.10, 0.12, 0.09);
	col *= 1.0 - smoothstep(0.0, 0.09, d) * 0.66;
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.58);
	col = clamp(col, 0.0, 1.0) * vec3(0.985, 1.028, 0.925) * 1.00 + 0.022;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
