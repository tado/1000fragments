uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.15;
	p = rot2(time * -0.32) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.70 + 0.38 * sin(time * 1.14);
	float n2 = 1.54 + 0.85 * cos(time * 0.43);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.57;
	float d = sr - rr;
	float v = sin(d * 13.18 - time * 5.04);
	float cc = clamp(0.5 + 0.5 * v, 0.0, 1.0);
	vec3 col = mix(vec3(0.14, 0.09, 0.17), vec3(0.90, 0.92, 0.57), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
