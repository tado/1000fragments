uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.24;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 0.95 + 0.22 * sin(time * 0.53);
	float n2 = 1.02 + 0.96 * cos(time * 1.25);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.69;
	float d = sr - rr;
	float v = sin(d * 21.69 - time * 2.47);
	vec3 col = palette(v * 0.76 + time * 0.17, vec3(0.54, 0.51, 0.47), vec3(0.46, 0.45, 0.32), vec3(0.72, 1.33, 1.26), vec3(0.90, 0.73, 0.21));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
