uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.04;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 1.48 + 0.21 * sin(time * 1.01);
	float n2 = 2.48 + 0.42 * cos(time * 0.45);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.69;
	float d = sr - rr;
	float v = d;
	vec3 col = palette(v * 1.26 + time * 0.20, vec3(0.41, 0.42, 0.57), vec3(0.43, 0.33, 0.49), vec3(0.85, 1.20, 1.06), vec3(0.68, 0.53, 0.83));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
