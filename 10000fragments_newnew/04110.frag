uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.05;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 0.87 + 0.52 * sin(time * 1.42);
	float n2 = 2.40 + 0.47 * cos(time * 1.28);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.44;
	float d = sr - rr;
	float v = d;
	vec3 col = palette(v * 0.53 + time * 0.38, vec3(0.43, 0.47, 0.42), vec3(0.35, 0.38, 0.49), vec3(0.94, 1.23, 1.32), vec3(0.16, 0.41, 0.11));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
