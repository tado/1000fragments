uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 8.88 - t * 5.34 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 4.09;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.38); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.38, 0.50, rv + 0.08 * sin(t * 1.49 + ph)) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.92 + jf * 4.0), cos(t * 0.54 * jf)) * 0.45;
        xs += sin(length(p - im) * 75.49 - t * 12.55 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 *= 1.0 + 0.30 * sin((time * 0.72) * 3.77);
	{ float fr = length(q2); q2 *= 1.0 + 0.52 * fr * fr; }
	{ q3 = vec2(atan(q3.y, q3.x) * 2.90, length(q3) * 5.52 - (time * 0.72) * 0.30); }
	float d1 = fieldA(q1, (time * 0.72), 0.0);
	float d2 = fieldB(q2, (time * 0.72), 1.46);
	float d3 = fieldC(q3, (time * 0.72), 1.32);
	d2 = max(d2, d3);
	float d = d1 * d2;
	vec3 col = vec3(0.69, 0.75, 0.77) * (0.06 / (abs((d)) + 0.04));
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.37);
	col = clamp(col, 0.0, 1.0) * vec3(1.024, 0.949, 0.995) * 1.00 + 0.029;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
