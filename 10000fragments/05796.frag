uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.97;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 0.77 + 0.77 * sin(time * 0.90);
	float n2 = 2.18 + 0.88 * cos(time * 1.66);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.59;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.09, d);

	vec3 col = vec3(0.87, 0.95, 0.19) * (0.07 / (abs(v * 2.13 + sr * 1.15) + 0.06));
	col = col / (1.0 + col);
	col *= 1.0 - smoothstep(0.0, 0.09, d) * 0.64;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
