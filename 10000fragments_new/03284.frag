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
    vec2 wq = vec2(vnoise2(p * 2.30 + ph), vnoise2(p * 2.30 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.30 + 2.59 * wq + vec2(1.7, 9.2) + t * 0.41),
                   vnoise2(p * 2.30 + 2.26 * wq + vec2(8.3, 2.8) - t * 0.77));
    v = vnoise2(p * 2.30 + 2.11 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.58, t * 2.45 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.60;
	vec2 q1 = p; vec2 q2 = p;
	q1 += vec2(-0.49, 0.99) * sin(length(q1) * 3.47 - time * 1.04) * 0.26;
	{ q1 = vec2(atan(q1.y, q1.x) * 2.38, length(q1) * 3.82 - time * 0.29); }
	q2 = rot2(length(q2) * 3.10 + time * 1.45) * q2;
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.14);
	float d = min(d1, d2);
	vec3 col = vec3(0.45, 0.70, 0.49) * (0.10 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.11;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
