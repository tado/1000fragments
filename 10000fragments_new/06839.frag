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
    vec2 wq = vec2(vnoise2(p * 4.89 + ph), vnoise2(p * 4.89 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.89 + 3.03 * wq + vec2(1.7, 9.2) + t * 0.63),
                   vnoise2(p * 4.89 + 1.80 * wq + vec2(8.3, 2.8) - t * 0.30));
    v = vnoise2(p * 4.89 + 2.84 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.41) - 0.5;
    float rad = 0.26 + 0.12 * sin(t * 0.80 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 += vec2(-0.74, 0.22) * sin(length(q1) * 5.09 - time * 0.83) * 0.18;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.20);
	float d = abs(d1 - d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.09, 0.26, 0.19), vec3(0.60, 0.87, 0.41), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
