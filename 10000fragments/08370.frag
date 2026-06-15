uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.83 + t * 0.65 + ph) + sin(p.y * 6.34 - t * 5.86 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.54;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.18, lr * 2.72 + time * 0.53); }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.36; p = rot2(0.35) * p; }
	p = rot2(p.y * 2.75 + time * 0.44) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.43 + time * 0.12, vec3(0.57, 0.53, 0.43), vec3(0.42, 0.48, 0.44), vec3(0.91, 1.38, 0.87), vec3(0.25, 0.45, 0.99));
	col = clamp((col - 0.5) * 1.29 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
