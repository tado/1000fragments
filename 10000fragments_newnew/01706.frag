uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.22;
	p = rot2(time * 1.38) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 1.44 + 0.64 * sin(time * 0.75);
	float n2 = 1.46 + 0.41 * cos(time * 1.10);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.85;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.14, d);

	vec3 col = palette(v * 2.11 + sr * 1.51 * 0.56 + time * 0.40, vec3(0.59, 0.44, 0.58), vec3(0.36, 0.42, 0.32), vec3(1.31, 1.12, 0.76), vec3(0.83, 0.03, 0.36));
	col *= 1.0 - smoothstep(0.0, 0.04, d) * 0.93;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
