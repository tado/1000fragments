uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.30 + jf * 4.0), cos(t * 0.22 * jf)) * 0.39;
        xs += sin(length(p - im) * 127.79 - t * 11.85 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.45 + ph), sin(lt * 5.0 + t * 0.94)) * 0.63;
        md = min(md, length(p - lp)); }
    v = exp(-md * 3.30) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 1.57, length(p) * 3.12 - time * 0.60); }
	p = rot2(time * 0.59) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.64);
	float d = d1 + d2;
	vec3 col = palette(d * 1.04 + time * 0.16, vec3(0.47, 0.59, 0.50), vec3(0.31, 0.35, 0.32), vec3(0.82, 1.03, 1.05), vec3(0.15, 0.14, 0.38));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
