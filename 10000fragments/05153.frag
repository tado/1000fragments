uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.15;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 1.09 + 0.58 * sin(time * 1.15);
	float n2 = 1.15 + 0.88 * cos(time * 0.65);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.87;
	float d = sr - rr;
	float v = d;
	vec3 col = palette(v * 1.13 + time * 0.38, vec3(0.48, 0.44, 0.50), vec3(0.34, 0.33, 0.37), vec3(1.15, 0.92, 1.40), vec3(0.40, 0.70, 0.88));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
