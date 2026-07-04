uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.31;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.67 + 0.39 * sin(time * 0.96);
	float n2 = 0.67 + 0.38 * cos(time * 1.76);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.47;
	float d = sr - rr;
	float v = d;
	vec3 col = palette(v * 0.64 + time * 0.05, vec3(0.53, 0.55, 0.44), vec3(0.36, 0.43, 0.38), vec3(1.17, 1.24, 1.28), vec3(0.75, 0.26, 0.20));
	col = mod(col * 1.37, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
