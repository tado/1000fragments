uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.12;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.02 + 0.70 * sin(time * 1.20);
	float n2 = 0.83 + 0.49 * cos(time * 1.69);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.48;
	float d = sr - rr;
	float v = d;
	vec3 col = palette(v * 0.88 + time * 0.14, vec3(0.56, 0.54, 0.58), vec3(0.46, 0.46, 0.32), vec3(1.17, 1.37, 0.91), vec3(0.55, 0.12, 0.46));
	col = fract(col * 1.85);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
