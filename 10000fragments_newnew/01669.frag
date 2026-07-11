uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.24;
	p = rot2(time * -1.20) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.04 + 0.24 * sin(time * 0.90);
	float n2 = 1.61 + 0.47 * cos(time * 0.50);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.86;
	float d = sr - rr;
	float v = sin(d * 17.21 - time * 3.77);
	vec3 col = palette(v * 0.95 + time * 0.02, vec3(0.57, 0.42, 0.59), vec3(0.44, 0.39, 0.32), vec3(0.77, 0.93, 1.39), vec3(0.96, 0.84, 0.88));
	col *= 0.81 + 0.12 * sin(gl_FragCoord.y * 1.83 + time * 7.86);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
