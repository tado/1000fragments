uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.25;
	p = rot2(time * 1.02) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 1.73 + 0.64 * sin(time * 0.57);
	float n2 = 1.30 + 0.64 * cos(time * 1.44);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.78;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.06, d);

	vec3 col = palette(v * 2.15 + sr * 1.47 * 1.10 + time * 0.23, vec3(0.59, 0.58, 0.60), vec3(0.38, 0.48, 0.43), vec3(1.07, 1.34, 0.93), vec3(0.99, 0.85, 0.16));
	col *= 1.0 - smoothstep(0.0, 0.13, d) * 0.60;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
