uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.28;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 0.93 + 0.74 * sin(time * 1.36);
	float n2 = 2.41 + 1.00 * cos(time * 0.60);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.46;
	float d = sr - rr;
	float v = d;
	vec3 col = palette(v * 1.15 + time * 0.04, vec3(0.58, 0.41, 0.46), vec3(0.42, 0.50, 0.38), vec3(1.23, 1.10, 0.98), vec3(0.27, 0.77, 0.59));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
