uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.21;
	p = rot2(time * -1.19) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.70 + 0.23 * sin(time * 0.57);
	float n2 = 1.57 + 0.91 * cos(time * 1.76);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.89;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.12, d);

	vec3 col = vec3(0.35, 0.97, 0.99) * (0.11 / (abs(v * 1.96 + sr * 1.22) + 0.09));
	col = col / (1.0 + col);
	col *= 1.0 - smoothstep(0.0, 0.10, d) * 0.68;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.22 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
