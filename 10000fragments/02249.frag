uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.39;
	p = rot2(time * -0.74) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 0.89 + 0.67 * sin(time * 1.25);
	float n2 = 1.46 + 0.41 * cos(time * 1.53);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.51;
	float d = sr - rr;
	float v = sin(d * 19.52 - time * 3.54);
	vec3 col = palette(v * 1.40 + time * 0.13, vec3(0.43, 0.45, 0.51), vec3(0.46, 0.45, 0.47), vec3(1.06, 0.89, 1.38), vec3(0.91, 0.10, 0.30));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
