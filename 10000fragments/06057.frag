uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.00;
	p = rot2(time * -1.15) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 1.09 + 0.44 * sin(time * 1.53);
	float n2 = 1.98 + 0.92 * cos(time * 0.95);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.59;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.06, d);

	vec3 col = palette(v * 1.00 + sr * 1.49 * 0.44 + time * 0.14, vec3(0.47, 0.48, 0.53), vec3(0.35, 0.41, 0.49), vec3(1.36, 1.06, 1.29), vec3(0.46, 0.87, 0.05));
	col *= 1.0 - smoothstep(0.0, 0.04, d) * 0.62;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
