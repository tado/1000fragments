uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.93;
	p = rot2(time * -1.56) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 0.97 + 0.13 * sin(time * 0.52);
	float n2 = 1.85 + 0.80 * cos(time * 0.88);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.67;
	float d = sr - rr;
	float v = d;
	vec3 col = palette(v * 0.84 + time * 0.20, vec3(0.53, 0.50, 0.50), vec3(0.40, 0.46, 0.33), vec3(0.72, 1.11, 0.98), vec3(0.83, 0.33, 0.62));
	col *= 0.83 + 0.18 * sin(gl_FragCoord.y * 1.79 + time * 8.65);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
