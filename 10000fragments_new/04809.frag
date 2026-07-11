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
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.40 + 0.19 * pow(abs(cos(ra * 5.0 + t * 0.64)), 0.77);
    v = sin((rr - pet) * 20.26 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.63 + ph), vnoise2(p * 4.63 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.63 + 2.79 * wq + vec2(1.7, 9.2) + t * 0.79),
                   vnoise2(p * 4.63 + 3.46 * wq + vec2(8.3, 2.8) - t * 1.12));
    v = vnoise2(p * 4.63 + 2.82 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.44;
	vec2 q1 = p; vec2 q2 = p;
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	q2.x += sin(q2.y * 6.06 + time * 2.42) * 0.28;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.66);
	float d = 0.5 * (d1 + d2);
	vec3 col = hue(d * 0.49 + time * 0.06);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.48));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
