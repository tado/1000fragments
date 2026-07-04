uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.81;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 1.24 + 0.44 * sin(time * 1.52);
	float n2 = 2.46 + 0.29 * cos(time * 0.71);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.63;
	float d = sr - rr;
	float v = d;
	vec3 col = palette(v * 1.31 + time * 0.28, vec3(0.57, 0.47, 0.59), vec3(0.41, 0.31, 0.34), vec3(0.97, 1.07, 1.01), vec3(0.33, 0.78, 0.62));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
