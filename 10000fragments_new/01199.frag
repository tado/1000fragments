uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.46 + ph), vnoise2(p * 3.46 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.46 + 1.17 * wq + vec2(1.7, 9.2) + t * 0.71),
                   vnoise2(p * 3.46 + 2.31 * wq + vec2(8.3, 2.8) - t * 1.19));
    v = vnoise2(p * 3.46 + 2.56 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.99 + jf * 4.0), cos(t * 0.50 * jf)) * 0.61;
        xs += sin(length(p - im) * 162.10 - t * 6.99 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.42;
	vec2 q1 = p; vec2 q2 = p;
	q1 += vec2(-0.04, 0.51) * sin(length(q1) * 4.17 - time * 1.68) * 0.11;
	for(int fo = 0; fo < 2; fo++){ q1 = abs(q1) - 0.40; q1 = rot2(1.98) * q1; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.01);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.91, 0.89, 0.18) * (0.12 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
