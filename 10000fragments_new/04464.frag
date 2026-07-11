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
    vec2 wq = vec2(vnoise2(p * 3.93 + ph), vnoise2(p * 3.93 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.93 + 1.03 * wq + vec2(1.7, 9.2) + t * 0.81),
                   vnoise2(p * 3.93 + 3.58 * wq + vec2(8.3, 2.8) - t * 0.53));
    v = vnoise2(p * 3.93 + 2.64 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.31, 0.0)) * 27.73 - t * 6.96 + ph);
    float mb = sin(length(p + vec2(0.31, 0.0)) * 17.24 - t * 7.42 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1 = (floor(q1 * 29.4) + 0.5) / 29.4;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.52);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.37));
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.28, 0.08, 0.01), vec3(0.91, 0.63, 0.97), cc);
	col = fract(col * 1.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
