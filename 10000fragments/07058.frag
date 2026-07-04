uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.22;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 0.81 + 0.77 * sin(time * 1.35);
	float n2 = 2.44 + 0.80 * cos(time * 1.51);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.79;
	float d = sr - rr;
	float v = d;
	vec3 col = palette(v * 1.17 + time * 0.19, vec3(0.49, 0.46, 0.54), vec3(0.46, 0.43, 0.38), vec3(1.02, 1.36, 1.38), vec3(0.40, 0.79, 0.71));
	col = fract(col * 1.29);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
