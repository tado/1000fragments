uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.22;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 1.52 + 0.61 * sin(time * 0.70);
	float n2 = 1.65 + 0.70 * cos(time * 0.79);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.80;
	float d = sr - rr;
	float v = sin(d * 13.86 - time * 2.75);
	vec3 col = palette(v * 0.73 + time * 0.20, vec3(0.45, 0.40, 0.58), vec3(0.39, 0.41, 0.44), vec3(1.10, 1.28, 1.09), vec3(0.72, 0.90, 0.50));
	col = mod(col * 1.87, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
