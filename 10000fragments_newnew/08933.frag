uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.97;
	p = rot2(time * -0.53) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 1.54 + 0.55 * sin(time * 0.99);
	float n2 = 1.40 + 0.22 * cos(time * 0.86);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.77;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.03, d);

	vec3 col = palette(v * 1.71 + sr * 1.92 * 1.24 + time * 0.23, vec3(0.58, 0.46, 0.55), vec3(0.37, 0.45, 0.47), vec3(0.72, 1.25, 0.80), vec3(0.96, 0.18, 0.23));
	col *= 1.0 - smoothstep(0.0, 0.06, d) * 0.95;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
