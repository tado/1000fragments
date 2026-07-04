uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.88;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 0.61 + 0.20 * sin(time * 0.89);
	float n2 = 2.22 + 0.71 * cos(time * 1.04);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.72;
	float d = sr - rr;
	float v = d;
	vec3 col = palette(v * 0.95 + time * 0.31, vec3(0.56, 0.54, 0.52), vec3(0.36, 0.33, 0.31), vec3(1.29, 1.10, 0.88), vec3(0.16, 0.91, 0.69));
	col = mod(col * 2.00, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
