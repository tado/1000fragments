uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.43;
	p = rot2(time * -0.39) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.44 + 0.57 * sin(time * 1.86);
	float n2 = 0.98 + 0.85 * cos(time * 0.95);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.68;
	float d = sr - rr;
	float v = d;
	vec3 col = palette(v * 1.48 + time * 0.36, vec3(0.58, 0.46, 0.57), vec3(0.42, 0.40, 0.39), vec3(0.73, 1.15, 0.83), vec3(0.87, 0.20, 0.18));
	col *= 0.81 + 0.11 * sin(gl_FragCoord.y * 2.78 + time * 7.42);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
