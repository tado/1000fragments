uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.42;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 1.21 + 0.74 * sin(time * 1.87);
	float n2 = 1.57 + 0.52 * cos(time * 1.42);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.64;
	float d = sr - rr;
	float v = sin(d * 24.02 - time * 5.87);
	vec3 col = palette(v * 0.55 + time * 0.11, vec3(0.42, 0.41, 0.42), vec3(0.32, 0.46, 0.46), vec3(0.91, 0.95, 1.12), vec3(0.99, 0.83, 0.04));
	col = mod(col * 2.88, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
