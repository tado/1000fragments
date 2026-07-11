uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 16.75 + sin(p.y * 3.38 + t * 4.69) * 3.78 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.36 + 0.11 * cos(sa * 5 + t * 0.47 + ph);
    v = sin((sr - petal) * 13.90);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.36; p = rot2(2.14) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.14, lr * 1.04 + time * 0.64); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.37);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.47 + time * 0.01, vec3(0.57, 0.51, 0.50), vec3(0.42, 0.34, 0.32), vec3(0.95, 1.01, 1.14), vec3(0.66, 0.36, 0.65));
	col = fract(col * 2.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
