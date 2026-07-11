uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.34;
	p = rot2(time * 1.33) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 0.83 + 0.53 * sin(time * 1.34);
	float n2 = 1.04 + 0.75 * cos(time * 1.45);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.50;
	float d = sr - rr;
	float v = sin(d * 25.79 - time * 1.00);
	vec3 col = palette(v * 1.27 + time * 0.28, vec3(0.56, 0.52, 0.52), vec3(0.38, 0.39, 0.41), vec3(1.28, 0.90, 0.85), vec3(0.69, 0.45, 0.76));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
