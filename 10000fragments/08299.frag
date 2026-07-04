uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.14;
	p = rot2(time * 1.56) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.52 + 0.10 * sin(time * 1.55);
	float n2 = 1.94 + 0.55 * cos(time * 0.73);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.79;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.08, d);

	vec3 col = palette(v * 1.22 + sr * 0.57 * 0.90 + time * 0.35, vec3(0.58, 0.54, 0.43), vec3(0.47, 0.37, 0.48), vec3(1.17, 1.17, 1.01), vec3(0.92, 0.54, 0.99));
	col *= 1.0 - smoothstep(0.0, 0.12, d) * 0.83;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
