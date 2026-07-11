uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 9; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.80 * sin(mf + 3.0) + ph), cos(t * 1.02 * cos(mf + 3.0) + ph));
        ms += 0.069 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p.y += sin(p.x * 6.45 + time * 1.07) * 0.15;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ p = vec2(atan(p.y, p.x) * 2.65, length(p) * 3.19 - time * 0.61); }
	p = (floor(p * 17.9) + 0.5) / 17.9;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.91 + time * 0.29, vec3(0.46, 0.58, 0.42), vec3(0.48, 0.35, 0.48), vec3(1.32, 0.86, 1.08), vec3(0.61, 0.29, 0.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
