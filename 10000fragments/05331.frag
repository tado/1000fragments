uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.14;
	p = rot2(time * 0.37) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 1.33 + 0.65 * sin(time * 1.38);
	float n2 = 2.16 + 0.66 * cos(time * 1.57);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.56;
	float d = sr - rr;
	float v = d;
	vec3 col = palette(v * 1.33 + time * 0.29, vec3(0.44, 0.42, 0.53), vec3(0.49, 0.47, 0.43), vec3(0.80, 1.00, 1.22), vec3(0.22, 0.99, 0.56));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
