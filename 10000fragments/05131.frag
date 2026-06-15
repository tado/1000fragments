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
    for(int mi = 0; mi < 7; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.83 * sin(mf + 3.0) + ph), cos(t * 0.83 * cos(mf + 3.0) + ph));
        ms += 0.032 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.59 + t * 4.81 + ph) + sin(p.y * 5.45 - t * 4.81 + ph)
        + sin((p.x + p.y) * 5.76 + t * 4.81 + ph) + sin(length(p) * 16.61 - t * 4.81 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.16;
	p = rot2(length(p) * 2.65 + time * 0.66) * p;
	{ float fr = length(p); p *= 1.0 + 0.68 * fr * fr; }
	p += vec2(-0.52, 0.60) * sin(length(p) * 4.74 - time * 1.32) * 0.13;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.42);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.95 + time * 0.19, vec3(0.48, 0.47, 0.50), vec3(0.40, 0.36, 0.38), vec3(1.16, 1.24, 1.19), vec3(0.47, 0.01, 0.89));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.07));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
