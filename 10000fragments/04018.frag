uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.88;
	p = rot2(time * -0.73) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.44 + 0.40 * sin(time * 1.18);
	float n2 = 0.54 + 0.32 * cos(time * 1.71);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.57;
	float d = sr - rr;
	float v = d;
	vec3 col = palette(v * 1.47 + time * 0.39, vec3(0.57, 0.58, 0.50), vec3(0.30, 0.45, 0.42), vec3(0.86, 0.94, 1.11), vec3(0.93, 0.38, 0.13));
	col = fract(col * 2.26);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
