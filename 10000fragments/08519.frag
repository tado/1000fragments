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
    for(int mi = 0; mi < 13; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.31 * sin(mf + 3.0) + ph), cos(t * 0.31 * cos(mf + 3.0) + ph));
        ms += 0.043 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.47 + sr * 7.87 - t * 0.66 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.81;
	p = rot2(p.y * -1.93 + time * 0.86) * p;
	p = rot2(length(p) * -3.43 + time * 1.15) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.45);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.50 + time * 0.05, vec3(0.49, 0.43, 0.54), vec3(0.34, 0.43, 0.33), vec3(1.08, 0.91, 0.86), vec3(0.93, 0.92, 0.08));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
