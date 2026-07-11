uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.49;
	p = rot2(time * 1.36) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 1.94 + 0.21 * sin(time * 1.96);
	float n2 = 1.96 + 0.76 * cos(time * 0.71);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.81;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.02, d);

	vec3 col = palette(v * 2.20 + sr * 1.95 * 0.62 + time * 0.19, vec3(0.47, 0.49, 0.52), vec3(0.42, 0.44, 0.33), vec3(0.72, 0.91, 1.23), vec3(0.98, 0.20, 0.82));
	col *= 1.0 - smoothstep(0.0, 0.03, d) * 0.77;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
