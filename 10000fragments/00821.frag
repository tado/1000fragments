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
    float wr = length(p) + 0.14 * vnoise2(p * 2.97 + t * 0.72);
    v = sin(wr * 21.70 - t * 0.67 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.94 + ph), vnoise2(p * 2.94 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.94 + 1.27 * wq + vec2(1.7, 9.2) + t * 0.81),
                   vnoise2(p * 2.94 + 2.12 * wq + vec2(8.3, 2.8) - t * 0.88));
    v = vnoise2(p * 2.94 + 1.56 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.66;
	vec2 q1 = p; vec2 q2 = p;
	q2 = fract(q2 * 2.59) - 0.5;
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.19);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.32, 0.88, 0.72) * (0.19 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
