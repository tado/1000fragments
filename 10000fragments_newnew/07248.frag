uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.11;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 0.54 + 0.65 * sin(time * 1.17);
	float n2 = 1.40 + 1.00 * cos(time * 0.94);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.52;
	float d = sr - rr;
	float v = sin(d * 28.68 - time * 4.71);
	vec3 col = palette(v * 0.43 + time * 0.17, vec3(0.55, 0.42, 0.41), vec3(0.36, 0.39, 0.47), vec3(0.91, 0.84, 1.28), vec3(0.81, 0.45, 0.98));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
