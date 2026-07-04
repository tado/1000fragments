uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.96;
	p = rot2(time * 1.02) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.67 + 0.66 * sin(time * 0.53);
	float n2 = 1.94 + 0.41 * cos(time * 0.62);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.44;
	float d = sr - rr;
	float v = d;
	float cc = clamp(0.5 + 0.5 * v, 0.0, 1.0);
	vec3 col = mix(vec3(0.05, 0.09, 0.13), vec3(0.98, 0.94, 0.97), cc);
	col *= 0.85 + 0.18 * sin(gl_FragCoord.y * 2.58 + time * 4.62);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
