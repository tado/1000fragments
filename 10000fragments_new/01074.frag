uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 1.46 + ph), sin(lt * 2.0 + t * 1.08)) * 0.61;
        md = min(md, length(p - lp)); }
    v = exp(-md * 3.42) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.34 + vec2(t * 1.77, -t * 1.37) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.91 + jf * 4.0), cos(t * 0.59 * jf)) * 0.55;
        xs += sin(length(p - im) * 202.86 - t * 6.44 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.25;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float ka = atan(q3.y, q3.x); float kr = length(q3); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q3 = kr * vec2(cos(ka), sin(ka)); }
	q3 = rot2(time * -1.04) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.25);
	float d3 = fieldC(q3, time, 0.97);
	d2 = min(d2, d3);
	float d = d1 * d2;
	vec3 col = palette(d * 1.41 + time * 0.01, vec3(0.44, 0.54, 0.59), vec3(0.49, 0.32, 0.42), vec3(1.11, 1.27, 0.83), vec3(0.23, 0.53, 0.63));
	col = clamp((col - 0.5) * 1.84 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
