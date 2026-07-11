uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.33 + sr * 5.68 - t * 4.88 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.21 + t * 4.80 + ph) + sin(p.y * 3.95 - t * 4.80 + ph)
        + sin((p.x + p.y) * 10.54 + t * 4.80 + ph) + sin(length(p) * 10.38 - t * 4.80 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.49;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.54, lr * 2.01 + time * 0.50); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.49);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.26 + time * 0.29, vec3(0.58, 0.49, 0.54), vec3(0.41, 0.32, 0.35), vec3(0.85, 0.91, 1.15), vec3(0.82, 0.07, 0.73));
	col = clamp((col - 0.5) * 1.79 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
