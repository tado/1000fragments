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
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.21 + jf * 4.0), cos(t * 0.10 * jf)) * 0.43;
        xs += sin(length(p - im) * 99.42 - t * 11.82 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 1.22 + ph), sin(lt * 3.0 + t * 0.95)) * 0.92;
        md = min(md, length(p - lp)); }
    v = exp(-md * 7.42) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * 2.84 + time * 0.30) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.34, lr * 1.91 + time * -0.22); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.92);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.66 + time * 0.10, vec3(0.43, 0.45, 0.42), vec3(0.43, 0.38, 0.44), vec3(0.83, 1.12, 1.36), vec3(0.23, 0.14, 0.88));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.79));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
