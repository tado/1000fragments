uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 14; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.41 * sin(mf + 3.0) + ph), cos(t * 1.41 * cos(mf + 3.0) + ph));
        ms += 0.088 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.13 + t * 3.61 + ph) + sin(p.y * 7.34 - t * 3.61 + ph)
        + sin((p.x + p.y) * 2.75 + t * 3.61 + ph) + sin(length(p) * 13.65 - t * 3.61 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.01;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.28, lr * 1.99 + time * 0.19); }
	p = rot2(length(p) * 2.29 + time * 0.62) * p;
	p = rot2(p.y * 3.61 + time * 0.65) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.81);
	float d = d1 * d2;
	vec3 col = palette(d * 0.96 + time * 0.22, vec3(0.49, 0.59, 0.59), vec3(0.42, 0.49, 0.42), vec3(0.70, 0.86, 1.04), vec3(0.42, 0.25, 0.60));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
