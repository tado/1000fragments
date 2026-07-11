uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.15;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 1.83 + 0.71 * sin(time * 0.68);
	float n2 = 0.69 + 0.86 * cos(time * 1.24);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.44;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.07, d);

	float cc = clamp(0.5 + 0.5 * v * 1.60 + sr * 1.76, 0.0, 1.0);
	vec3 col = mix(vec3(0.27, 0.05, 0.29), vec3(0.71, 0.56, 0.61), cc);
	col *= 1.0 - smoothstep(0.0, 0.05, d) * 0.64;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
