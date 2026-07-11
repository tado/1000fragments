uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.37;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.81 + 0.72 * sin(time * 0.84);
	float n2 = 1.02 + 0.34 * cos(time * 0.77);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.80;
	float d = sr - rr;
	float v = d;
	vec3 col = palette(v * 0.79 + time * 0.15, vec3(0.57, 0.53, 0.60), vec3(0.43, 0.36, 0.39), vec3(0.89, 1.04, 0.86), vec3(0.13, 0.59, 0.19));
	col = mod(col * 2.64, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
