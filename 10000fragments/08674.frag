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
        vec2 mm = vec2(sin(t * 1.11 * sin(mf + 3.0) + ph), cos(t * 1.11 * cos(mf + 3.0) + ph));
        ms += 0.030 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ p = vec2(atan(p.y, p.x) * 2.05, length(p) * 2.38 - time * 0.58); }
	p = rot2(length(p) * -1.29 + time * 0.69) * p;
	p = abs(p) - 0.64;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.36 + time * 0.18, vec3(0.51, 0.50, 0.50), vec3(0.36, 0.42, 0.30), vec3(0.96, 1.09, 0.86), vec3(0.72, 0.94, 0.82));
	col = mod(col * 2.47, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
