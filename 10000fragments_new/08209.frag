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
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.52 * sin(mf + 3.0) + ph), cos(t * 0.31 * cos(mf + 3.0) + ph));
        ms += 0.050 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.77;
	p = (floor(p * 23.9) + 0.5) / 23.9;
	p = rot2(2.09) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p += vec2(-1.00, 0.10) * sin(length(p) * 4.17 - time * 1.12) * 0.15;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.43 + time * 0.26, vec3(0.51, 0.57, 0.46), vec3(0.31, 0.35, 0.50), vec3(0.85, 1.01, 1.17), vec3(0.79, 0.54, 0.58));
	col = clamp((col - 0.5) * 1.77 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
