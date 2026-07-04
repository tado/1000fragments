uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.38;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 1.69 + 0.42 * sin(time * 1.50);
	float n2 = 2.50 + 0.76 * cos(time * 0.69);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.81;
	float d = sr - rr;
	float v = sin(d * 22.84 - time * 2.41);
	vec3 col = palette(v * 1.48 + time * 0.06, vec3(0.57, 0.54, 0.44), vec3(0.48, 0.42, 0.50), vec3(0.84, 1.25, 1.04), vec3(0.45, 0.61, 0.25));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
