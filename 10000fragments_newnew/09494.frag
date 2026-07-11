uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.21;
	p = rot2(time * 1.15) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 1.06 + 0.67 * sin(time * 0.98);
	float n2 = 1.85 + 0.77 * cos(time * 0.53);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.87;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.14, d);

	vec3 col = palette(v * 1.48 + sr * 1.74 * 1.33 + time * 0.06, vec3(0.55, 0.43, 0.49), vec3(0.48, 0.42, 0.33), vec3(0.76, 1.01, 1.12), vec3(0.32, 0.65, 0.81));
	col *= 1.0 - smoothstep(0.0, 0.03, d) * 0.74;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
