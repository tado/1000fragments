uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 10; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.45 * sin(mf + 3.0) + ph), cos(t * 2.45 * cos(mf + 3.0) + ph));
        ms += 0.070 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -1.31) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float fr = length(p); p *= 1.0 + -0.51 * fr * fr; }
	p = rot2(p.y * -2.66 + time * 0.93) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.75, 0.67, 0.98) + vec3(0.14, 0.16, 0.10);
	col = mod(col * 2.66, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
