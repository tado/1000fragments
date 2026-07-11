uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.35 + t * 4.64 + ph) + sin(p.y * 5.82 - t * 4.64 + ph)
        + sin((p.x + p.y) * 11.30 + t * 4.64 + ph) + sin(length(p) * 11.49 - t * 4.64 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.85;
	p = fract(p * 2.09) - 0.5;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.16; p = rot2(2.17) * p; }
	{ float fr = length(p); p *= 1.0 + -0.59 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.37, lr * 2.23 + time * 0.13); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.97 + time * 0.16, vec3(0.53, 0.59, 0.57), vec3(0.36, 0.38, 0.42), vec3(1.05, 1.32, 1.28), vec3(0.13, 0.66, 0.70));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
