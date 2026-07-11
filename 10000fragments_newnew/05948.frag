uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.96;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 1.59 + 0.16 * sin(time * 0.96);
	float n2 = 0.92 + 0.94 * cos(time * 1.45);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.68;
	float d = sr - rr;
	float v = d;
	vec3 col = palette(v * 1.08 + time * 0.36, vec3(0.52, 0.49, 0.43), vec3(0.35, 0.41, 0.43), vec3(0.86, 1.23, 1.06), vec3(0.99, 0.73, 0.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
