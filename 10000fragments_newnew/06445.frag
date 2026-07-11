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
	float m = 7.0;
	float n1 = 0.58 + 0.71 * sin(time * 0.80);
	float n2 = 1.60 + 0.28 * cos(time * 0.81);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.60;
	float d = sr - rr;
	float v = d;
	vec3 col = palette(v * 0.55 + time * 0.30, vec3(0.41, 0.51, 0.46), vec3(0.42, 0.37, 0.36), vec3(0.93, 0.86, 0.85), vec3(0.43, 0.96, 0.71));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
