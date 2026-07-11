uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.36;
	p = rot2((time * 0.71) * -0.48) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 1.38 + 0.73 * sin((time * 0.71) * 1.86);
	float n2 = 2.18 + 0.56 * cos((time * 0.71) * 0.94);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.74;
	float d = sr - rr;
	float v = d;
	vec3 col = vec3(0.5 + 0.5 * (v)) * vec3(0.47, 0.51, 0.58) + vec3(0.04, 0.06, 0.05);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.60);
	col = clamp(col, 0.0, 1.0) * vec3(0.951, 1.025, 0.942) * 1.00 + 0.048;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
