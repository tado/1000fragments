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
    v = sin(sa * 9.90 + sr * 11.50 - t * 2.87 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.78;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.18, lr * 1.89 + time * -0.19); }
	p = rot2(time * 0.26) * p;
	p = rot2(2.52) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.16; p = rot2(2.39) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.54 + time * 0.25, vec3(0.46, 0.44, 0.58), vec3(0.46, 0.35, 0.39), vec3(1.04, 1.31, 0.83), vec3(0.48, 0.41, 0.74));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
