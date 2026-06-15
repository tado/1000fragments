uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.92 + t * 2.21 + ph) + sin(p.y * 9.97 - t * 2.21 + ph)
        + sin((p.x + p.y) * 10.10 + t * 2.21 + ph) + sin(length(p) * 3.94 - t * 2.21 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.68;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.17, lr * 1.68 + time * 0.70); }
	p = abs(p) - 0.46;
	{ float fr = length(p); p *= 1.0 + 0.24 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.82 + time * 0.30, vec3(0.60, 0.44, 0.45), vec3(0.48, 0.34, 0.40), vec3(1.07, 0.91, 0.80), vec3(0.14, 0.38, 0.22));
	col = clamp((col - 0.5) * 1.47 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
