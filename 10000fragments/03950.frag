uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.46;
	p = rot2(time * 0.62) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 0.91 + 0.78 * sin(time * 0.91);
	float n2 = 0.90 + 0.21 * cos(time * 0.75);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.52;
	float d = sr - rr;
	float v = d;
	vec3 col = palette(v * 1.43 + time * 0.16, vec3(0.57, 0.58, 0.44), vec3(0.34, 0.31, 0.42), vec3(1.00, 1.32, 1.32), vec3(0.57, 0.79, 0.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
