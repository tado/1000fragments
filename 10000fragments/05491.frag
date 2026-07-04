uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.16;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 1.63 + 0.15 * sin(time * 0.54);
	float n2 = 1.57 + 0.33 * cos(time * 0.94);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.79;
	float d = sr - rr;
	float v = sin(d * 11.84 - time * 3.87);
	vec3 col = palette(v * 1.10 + time * 0.26, vec3(0.46, 0.56, 0.40), vec3(0.33, 0.37, 0.47), vec3(1.09, 1.06, 1.09), vec3(0.17, 0.18, 0.63));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.04;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
