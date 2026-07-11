uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.47;
	p = rot2(time * -1.50) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 0.97 + 0.36 * sin(time * 0.89);
	float n2 = 1.20 + 0.99 * cos(time * 0.46);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.52;
	float d = sr - rr;
	float v = sin(d * 25.01 - time * 1.35);
	vec3 col = palette(v * 0.67 + time * 0.10, vec3(0.41, 0.46, 0.41), vec3(0.36, 0.35, 0.40), vec3(1.30, 1.25, 0.93), vec3(0.99, 0.36, 0.34));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
