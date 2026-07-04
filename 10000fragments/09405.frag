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
	float m = 9.0;
	float n1 = 1.44 + 0.52 * sin(time * 0.97);
	float n2 = 2.25 + 0.53 * cos(time * 1.46);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.50;
	float d = sr - rr;
	float v = d;
	vec3 col = palette(v * 1.22 + time * 0.06, vec3(0.60, 0.42, 0.44), vec3(0.32, 0.38, 0.43), vec3(1.11, 0.92, 1.04), vec3(0.32, 0.89, 0.32));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
