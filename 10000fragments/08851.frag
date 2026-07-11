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
    for(int mi = 0; mi < 16; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.91 * sin(mf + 3.0) + ph), cos(t * 0.91 * cos(mf + 3.0) + ph));
        ms += 0.041 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 9; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.58 * sin(mf + 3.0) + ph), cos(t * 1.58 * cos(mf + 3.0) + ph));
        ms += 0.068 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.55;
	p = rot2(p.y * -3.55 + time * 0.35) * p;
	{ p = vec2(atan(p.y, p.x) * 1.01, length(p) * 3.07 - time * 0.57); }
	{ float fr = length(p); p *= 1.0 + 0.20 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.74);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.73 + time * 0.29, vec3(0.47, 0.44, 0.54), vec3(0.45, 0.34, 0.46), vec3(1.08, 0.89, 0.76), vec3(0.80, 0.15, 0.85));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.94));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
