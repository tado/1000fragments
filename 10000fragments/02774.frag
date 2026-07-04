uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.18;
	p = rot2(time * -1.01) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 0.90 + 0.19 * sin(time * 1.16);
	float n2 = 2.40 + 0.55 * cos(time * 1.62);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.50;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.14, d);

	vec3 col = vec3(0.5 + 0.5 * v * 2.39 + sr * 0.69) * vec3(0.71, 0.95, 1.21) + vec3(0.04, 0.03, 0.06);
	col *= 1.0 - smoothstep(0.0, 0.14, d) * 0.69;
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
