uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.48;
	p = rot2(time * -1.03) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 1.45 + 0.28 * sin(time * 0.68);
	float n2 = 2.25 + 0.49 * cos(time * 1.75);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.78;
	float d = sr - rr;
	float v = d;
	vec3 col = palette(v * 0.79 + time * 0.40, vec3(0.46, 0.44, 0.58), vec3(0.48, 0.48, 0.32), vec3(0.84, 0.74, 1.17), vec3(0.73, 0.21, 0.83));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.70));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
