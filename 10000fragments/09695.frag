uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.43;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 1.58 + 0.49 * sin(time * 1.14);
	float n2 = 0.68 + 0.39 * cos(time * 1.13);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.83;
	float d = sr - rr;
	float v = d;
	vec3 col = palette(v * 0.73 + time * 0.03, vec3(0.43, 0.56, 0.42), vec3(0.38, 0.34, 0.40), vec3(0.97, 1.27, 1.35), vec3(0.27, 0.60, 0.16));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
