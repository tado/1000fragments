uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.42;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 0.85 + 0.37 * sin(time * 0.62);
	float n2 = 1.86 + 0.30 * cos(time * 0.76);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.60;
	float d = sr - rr;
	float v = sin(d * 11.59 - time * 5.57);
	vec3 col = palette(v * 1.44 + time * 0.21, vec3(0.41, 0.50, 0.46), vec3(0.48, 0.41, 0.34), vec3(1.33, 0.76, 1.29), vec3(0.87, 0.32, 0.96));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.50 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
