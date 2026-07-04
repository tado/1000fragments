uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.26;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 0.81 + 0.75 * sin(time * 1.73);
	float n2 = 1.59 + 0.81 * cos(time * 0.72);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.81;
	float d = sr - rr;
	float v = sin(d * 26.30 - time * 5.20);
	vec3 col = palette(v * 1.07 + time * 0.30, vec3(0.47, 0.52, 0.41), vec3(0.48, 0.48, 0.48), vec3(0.72, 1.06, 1.07), vec3(0.97, 0.09, 0.53));
	col = fract(col * 2.15);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
