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
    for(int mi = 0; mi < 6; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.32 * sin(mf + 3.0) + ph), cos(t * 1.32 * cos(mf + 3.0) + ph));
        ms += 0.028 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.08 + t * 2.94 + ph) + sin(p.y * 8.00 - t * 2.94 + ph)
        + sin((p.x + p.y) * 3.69 + t * 2.94 + ph) + sin(length(p) * 6.45 - t * 2.94 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(-0.06, 0.98) * sin(length(p) * 5.49 - time * 1.54) * 0.22;
	{ float fr = length(p); p *= 1.0 + 0.65 * fr * fr; }
	p = rot2(p.y * -3.67 + time * 0.22) * p;
	p = rot2(length(p) * 2.32 + time * 0.64) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.76);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.38 + time * 0.15, vec3(0.45, 0.58, 0.41), vec3(0.42, 0.38, 0.33), vec3(0.84, 1.04, 1.14), vec3(0.40, 0.80, 0.06));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.88));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
