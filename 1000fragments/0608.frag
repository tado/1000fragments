uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.98 + t * 1.58 + ph) + sin(p.y * 12.10 - t * 0.84 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 15; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.17 * sin(mf + 3.0) + ph), cos(t * 1.17 * cos(mf + 3.0) + ph));
        ms += 0.076 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.03;
	p = rot2(length(p) * 1.89 + time * 1.05) * p;
	p = rot2(2.98) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.08);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.99 + time * 0.09, vec3(0.50, 0.52, 0.49), vec3(0.41, 0.43, 0.46), vec3(0.70, 1.18, 1.30), vec3(0.89, 0.47, 0.31));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.73));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
