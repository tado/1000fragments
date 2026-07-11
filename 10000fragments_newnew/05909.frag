uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 8.0 + qr * 4.99 * sin(t * 1.12) + t * 4.12 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.36 + 0.31 * pow(abs(cos(ra * 2.0 + t * 1.91)), 1.41);
    v = sin((rr - pet) * 23.27 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 0.57 + ph), sin(lt * 1.0 + t * 0.65)) * 0.61;
        md = min(md, length(p - lp)); }
    v = exp(-md * 4.26) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.49;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1.x += sin(q1.y * 2.74 + time * 3.74) * 0.20;
	{ float iv = dot(q1, q1) + 0.05; q1 = q1 / iv * 0.37; }
	q3 = vec2(q3.x * q3.x - q3.y * q3.y, 2.0 * q3.x * q3.y) * 0.70;
	{ float ka = atan(q3.y, q3.x); float kr = length(q3); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q3 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.10);
	float d3 = fieldC(q3, time, 1.36);
	d2 = 0.5 * (d2 + d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.59, 0.41, 0.68) * (0.10 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col = fract(col * 1.26);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
