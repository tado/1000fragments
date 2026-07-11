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
        vec2 mm = vec2(sin(t * 0.81 * sin(mf + 3.0) + ph), cos(t * 0.81 * cos(mf + 3.0) + ph));
        ms += 0.076 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p *= 2.14;
	p = rot2(length(p) * -3.43 + time * 0.64) * p;
	p += vec2(0.86, 0.92) * sin(length(p) * 3.92 - time * 0.65) * 0.24;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.89 + time * 0.27, vec3(0.44, 0.60, 0.59), vec3(0.44, 0.45, 0.49), vec3(0.97, 1.21, 0.97), vec3(0.43, 0.98, 0.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
