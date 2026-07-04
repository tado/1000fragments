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
    vec2 zp = p * 8.26;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.64)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 16.22 - t * 2.73 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.62, lr * 1.73 + time * 0.77); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.57; p = rot2(0.49) * p; }
	p = fract(p * 2.92) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.37 + time * 0.09, vec3(0.60, 0.44, 0.45), vec3(0.36, 0.36, 0.46), vec3(1.07, 1.35, 0.88), vec3(0.67, 0.04, 0.25));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
