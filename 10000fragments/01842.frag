uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.37 + sr * 17.48 - t * 0.61 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * -2.68 + time * 0.35) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.01, lr * 2.11 + time * 0.40); }
	p = rot2(0.32) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.70 + time * 0.09, vec3(0.58, 0.54, 0.41), vec3(0.45, 0.31, 0.32), vec3(0.82, 1.33, 1.18), vec3(0.44, 0.83, 0.99));
	col = fract(col * 2.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
