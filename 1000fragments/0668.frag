uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.34;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 1.15 + 0.58 * sin(time * 0.88);
	float n2 = 2.01 + 0.83 * cos(time * 0.58);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.40;
	float d = sr - rr;
	float v = sin(d * 23.94 - time * 4.60);
	vec3 col = palette(v * 1.00 + time * 0.27, vec3(0.45, 0.55, 0.45), vec3(0.37, 0.49, 0.40), vec3(0.80, 0.89, 1.01), vec3(0.19, 0.90, 0.59));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.76));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
