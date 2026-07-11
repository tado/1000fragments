uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.44;
	p = rot2(time * 0.42) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 0.94 + 0.54 * sin(time * 1.64);
	float n2 = 0.79 + 0.61 * cos(time * 1.19);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.51;
	float d = sr - rr;
	float v = sin(d * 18.08 - time * 2.77);
	vec3 col = palette(v * 0.41 + time * 0.06, vec3(0.46, 0.58, 0.51), vec3(0.41, 0.46, 0.43), vec3(1.35, 0.89, 1.36), vec3(0.53, 0.69, 0.02));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
