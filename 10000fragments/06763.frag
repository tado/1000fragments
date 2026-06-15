uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.25 + t * 2.07 + ph) + sin(p.y * 5.45 - t * 5.91 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.85;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.78, lr * 2.67 + time * 0.21); }
	{ float fr = length(p); p *= 1.0 + 0.28 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 2.18, length(p) * 3.62 - time * 0.46); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.21; p = rot2(1.21) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.49 + time * 0.14, vec3(0.60, 0.41, 0.50), vec3(0.38, 0.34, 0.49), vec3(0.92, 0.81, 0.97), vec3(0.98, 0.74, 0.79));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
