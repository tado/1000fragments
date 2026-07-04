uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.03;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 1.00 + 0.75 * sin(time * 1.17);
	float n2 = 2.18 + 0.95 * cos(time * 0.44);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.87;
	float d = sr - rr;
	float v = sin(d * 10.36 - time * 4.03);
	vec3 col = palette(v * 1.16 + time * 0.03, vec3(0.59, 0.46, 0.58), vec3(0.43, 0.37, 0.32), vec3(1.15, 0.86, 1.26), vec3(0.89, 0.71, 0.94));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
