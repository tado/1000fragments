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
    float ma = sin(length(p - vec2(0.28, 0.0)) * 19.30 - t * 7.45 + ph);
    float mb = sin(length(p + vec2(0.28, 0.0)) * 31.52 - t * 2.32 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.55 + ph), vnoise2(p * 2.55 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.55 + 3.80 * wq + vec2(1.7, 9.2) + t * 0.49),
                   vnoise2(p * 2.55 + 2.59 * wq + vec2(8.3, 2.8) - t * 0.67));
    v = vnoise2(p * 2.55 + 1.16 * wr) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.76 + jf * 4.0), cos(t * 0.26 * jf)) * 0.41;
        xs += sin(length(p - im) * 117.52 - t * 13.75 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.48;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = fract(q2 * 1.62) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.66);
	float d3 = fieldC(q3, time, 1.81);
	d2 = d2 * d3;
	float d = min(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.25, 0.19, 0.19), vec3(0.84, 0.68, 0.99), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
