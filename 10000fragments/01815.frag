uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.08;
	p = rot2(time * 0.69) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 1.90 + 0.62 * sin(time * 1.11);
	float n2 = 0.61 + 0.88 * cos(time * 1.54);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.85;
	float d = sr - rr;
	float v = sin(d * 17.81 - time * 5.87);
	float cc = clamp(0.5 + 0.5 * v, 0.0, 1.0);
	vec3 col = mix(vec3(0.06, 0.01, 0.50), vec3(0.62, 0.91, 0.60), cc);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.04));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
