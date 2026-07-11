uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.55 + jf * 4.0), cos(t * 0.30 * jf)) * 0.65;
        xs += sin(length(p - im) * 182.39 - t * 13.74 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 15.76 + sin(p.y * 3.80 + t * 2.41) * 2.37 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.64 + 0.18 * cos(sa * 4.0 + t * 1.18 + ph);
    v = sin((sr - petal) * 18.66);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.98;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	q2 += vec2(0.66, -0.27) * sin(length(q2) * 4.80 - time * 1.43) * 0.25;
	{ float fr = length(q2); q2 *= 1.0 + -0.23 * fr * fr; }
	{ q3 = vec2(atan(q3.y, q3.x) * 1.07, length(q3) * 5.78 - time * 0.78); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.26);
	float d3 = fieldC(q3, time, 1.50);
	d2 = min(d2, d3);
	float d = d1 * d2;
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.21, 0.11, 0.09), vec3(0.64, 0.57, 0.87), cc);
	col *= 0.81 + 0.17 * sin(gl_FragCoord.y * 1.51 + time * 17.33);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
