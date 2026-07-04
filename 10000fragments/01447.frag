uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.98;
	p = rot2(time * -1.35) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 1.62 + 0.79 * sin(time * 0.79);
	float n2 = 2.05 + 0.56 * cos(time * 1.27);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.85;
	float d = sr - rr;
	float v = d;
	vec3 col = palette(v * 1.04 + time * 0.35, vec3(0.52, 0.48, 0.56), vec3(0.44, 0.47, 0.43), vec3(0.98, 0.89, 0.89), vec3(0.09, 0.52, 0.49));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
