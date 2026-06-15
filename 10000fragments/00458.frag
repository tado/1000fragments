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
    v = sin(sa * 10.27 + sr * 20.43 - t * 4.52 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 2.52) - 0.5;
	{ float fr = length(p); p *= 1.0 + -0.66 * fr * fr; }
	p = rot2(1.13) * p;
	p = rot2(time * 0.60) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.80 + time * 0.13, vec3(0.51, 0.57, 0.58), vec3(0.33, 0.37, 0.42), vec3(0.88, 1.25, 1.11), vec3(0.56, 0.34, 0.10));
	col = mod(col * 2.15, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
