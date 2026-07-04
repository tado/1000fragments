uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.94;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 1.48 + 0.11 * sin(time * 0.60);
	float n2 = 1.86 + 0.25 * cos(time * 0.90);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.47;
	float d = sr - rr;
	float v = sin(d * 10.21 - time * 4.17);
	vec3 col = palette(v * 1.27 + time * 0.16, vec3(0.46, 0.44, 0.47), vec3(0.48, 0.49, 0.33), vec3(1.35, 1.28, 1.00), vec3(0.34, 0.45, 0.81));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
