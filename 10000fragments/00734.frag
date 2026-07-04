uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.23;
	p = rot2(time * -1.00) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 0.68 + 0.78 * sin(time * 1.17);
	float n2 = 2.09 + 0.50 * cos(time * 1.68);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.46;
	float d = sr - rr;
	float v = sin(d * 27.53 - time * 2.12);
	float cc = clamp(0.5 + 0.5 * v, 0.0, 1.0);
	vec3 col = mix(vec3(0.37, 0.16, 0.05), vec3(0.92, 0.57, 0.72), cc);
	col = mod(col * 1.60, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
