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
        vec2 lp = vec2(sin(lt * 4.0 + t * 1.24 + ph), sin(lt * 5.0 + t * 0.64)) * 0.71;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.09) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.02 + vec2(t * 0.69, -t * 1.21) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.70 + jf * 4.0), cos(t * 0.20 * jf)) * 0.37;
        xs += sin(length(p - im) * 199.75 - t * 12.57 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.23;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = rot2(q2.y * -2.16 + time * 0.43) * q2;
	q2 = sin(q2 * 1.40 + time * 1.67) * 0.83;
	q3 = fract(q3 * 2.27) - 0.5;
	{ float lr = log(length(q3) + 0.001); float la = atan(q3.y, q3.x); q3 = vec2(la * 1.86, lr * 2.41 + time * -0.78); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.12);
	float d3 = fieldC(q3, time, 1.07);
	d2 = min(d2, d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.72 + time * 0.13, vec3(0.52, 0.45, 0.42), vec3(0.38, 0.43, 0.41), vec3(1.23, 0.94, 1.14), vec3(0.97, 0.76, 0.94));
	col = fract(col * 1.39);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
