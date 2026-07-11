uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.24;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 0.95 + 0.61 * sin(time * 0.57);
	float n2 = 1.79 + 0.76 * cos(time * 0.80);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.42;
	float d = sr - rr;
	float v = sin(d * 14.75 - time * 3.38);
	vec3 col = palette(v * 1.20 + time * 0.33, vec3(0.45, 0.59, 0.53), vec3(0.38, 0.44, 0.48), vec3(0.72, 0.91, 1.29), vec3(0.63, 0.99, 0.42));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.52 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
