uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.95 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.16 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 9.13) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.19 + jf * 4.0), cos(t * 0.19 * jf)) * 0.36;
        xs += sin(length(p - im) * 179.28 - t * 10.71 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.07;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.40; p = rot2(1.83) * p; }
	{ p = vec2(atan(p.y, p.x) * 1.55, length(p) * 5.82 - time * 0.65); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.41);
	float d = d1 + d2;
	vec3 col = palette(d * 0.79 + time * 0.30, vec3(0.52, 0.52, 0.50), vec3(0.34, 0.38, 0.38), vec3(1.16, 1.38, 1.22), vec3(0.93, 0.48, 0.74));
	col = mod(col * 1.65, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
