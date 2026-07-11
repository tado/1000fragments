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
        vec2 mm = vec2(sin(t * 1.44 * sin(mf + 3.0) + ph), cos(t * 1.44 * cos(mf + 3.0) + ph));
        ms += 0.042 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.23 + sr * 9.29 - t * 2.11 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p) - 0.72;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(length(p) * -2.77 + time * 0.70) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.90);
	float d = d1 + d2;
	vec3 col = palette(d * 0.89 + time * 0.15, vec3(0.40, 0.55, 0.43), vec3(0.37, 0.35, 0.48), vec3(1.16, 0.95, 0.71), vec3(0.08, 0.25, 0.91));
	col = mod(col * 2.49, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
