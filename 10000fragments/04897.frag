uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.37 + jf * 4.0), cos(t * 0.36 * jf)) * 0.45;
        xs += sin(length(p - im) * 128.36 - t * 10.03 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 20.43 + sin(p.y * 2.16 + t * 3.84) * 2.08 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.58;
    float pk = 6.2831853 / 7.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 19.52 - t * 1.76 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	q2 = sin(q2 * 2.90 + time * 2.17) * 1.22;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q3.x += 0.47 / wf * sin(wf * 1.69 * q3.y + time * 2.08); q3.y += 0.49 / wf * cos(wf * 2.12 * q3.x + time * 1.89); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.35);
	float d3 = fieldC(q3, time, 0.67);
	d2 = min(d2, d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.93 + time * 0.08, vec3(0.59, 0.52, 0.49), vec3(0.40, 0.31, 0.31), vec3(1.00, 0.78, 0.85), vec3(0.25, 0.41, 0.29));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
