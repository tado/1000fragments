uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 1.50 + vec2(t * 0.30, -t * 1.45);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 23.43 - t * 5.68 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.82;
	p = (floor(p * 6.1) + 0.5) / 6.1;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.49; p = rot2(1.74) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.67, lr * 1.52 + time * 0.59); }
	p.x += sin(p.y * 3.64 + time * 1.24) * 0.29;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.77);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.72 + time * 0.18, vec3(0.56, 0.60, 0.46), vec3(0.35, 0.33, 0.48), vec3(0.73, 0.93, 1.14), vec3(0.40, 0.59, 0.72));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.11;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
