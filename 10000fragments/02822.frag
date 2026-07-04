uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.30;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.87 + 0.69 * sin(time * 0.66);
	float n2 = 1.21 + 0.47 * cos(time * 1.67);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.58;
	float d = sr - rr;
	float v = sin(d * 17.32 - time * 2.07);
	vec3 col = palette(v * 1.05 + time * 0.03, vec3(0.56, 0.53, 0.41), vec3(0.46, 0.33, 0.39), vec3(0.83, 1.28, 1.27), vec3(0.48, 0.88, 0.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
