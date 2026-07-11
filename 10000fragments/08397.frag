uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 7; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.34 * sin(mf + 3.0) + ph), cos(t * 0.34 * cos(mf + 3.0) + ph));
        ms += 0.039 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.30 + t * 4.10 + ph) + sin(p.y * 6.25 - t * 4.92 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.67;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = abs(p);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.66);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.05 + time * 0.19, vec3(0.57, 0.56, 0.52), vec3(0.33, 0.44, 0.47), vec3(0.83, 1.26, 1.26), vec3(0.99, 0.61, 0.26));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
