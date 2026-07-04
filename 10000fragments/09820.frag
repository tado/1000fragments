uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.84;
	p = rot2(time * -1.46) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 0.62 + 0.34 * sin(time * 1.36);
	float n2 = 1.15 + 0.95 * cos(time * 1.55);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.43;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.12, d);

	vec3 col = palette(v * 2.22 + sr * 1.65 * 1.33 + time * 0.28, vec3(0.50, 0.46, 0.46), vec3(0.46, 0.48, 0.33), vec3(1.03, 0.87, 1.02), vec3(0.25, 0.46, 0.52));
	col *= 1.0 - smoothstep(0.0, 0.02, d) * 0.80;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
