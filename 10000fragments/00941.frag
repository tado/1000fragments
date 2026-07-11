uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.31 + t * 2.60 + ph) + sin(p.y * 3.52 - t * 2.60 + ph)
        + sin((p.x + p.y) * 4.44 + t * 2.60 + ph) + sin(length(p) * 5.32 - t * 2.60 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.43; p = rot2(2.36) * p; }
	p = rot2(time * 1.01) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.61, lr * 1.16 + time * -0.40); }
	{ float fr = length(p); p *= 1.0 + 0.45 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.79 + time * 0.25, vec3(0.53, 0.54, 0.48), vec3(0.32, 0.32, 0.33), vec3(1.13, 0.98, 0.72), vec3(0.37, 0.53, 0.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
