uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.86;
	p = rot2((time * 0.66) * -1.33) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 1.69 + 0.67 * sin((time * 0.66) * 0.93);
	float n2 = 0.82 + 0.29 * cos((time * 0.66) * 1.78);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.41;
	float d = sr - rr;
	float v = sin(d * 19.02 - (time * 0.66) * 3.10);
	vec3 col = vec3(0.5 + 0.5 * (v)) * vec3(0.50, 0.57, 0.47) + vec3(0.04, 0.06, 0.02);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.75 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.60);
	col = clamp(col, 0.0, 1.0) * vec3(0.936, 0.989, 1.054) * 1.00 + 0.026;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
