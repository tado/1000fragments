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
    float lv = length(p) * 3.66 - t * 1.53;
    v = sin(floor(lv * 2.1) / 2.1 * 6.2831853 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.39 + ph), vnoise2(p * 3.39 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.39 + 2.09 * wq + vec2(1.7, 9.2) + t * 1.09),
                   vnoise2(p * 3.39 + 3.16 * wq + vec2(8.3, 2.8) - t * 1.15));
    v = vnoise2(p * 3.39 + 2.58 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.80;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q1.x += 0.31 / wf * sin(wf * 1.68 * q1.y + time * 0.68); q1.y += 0.35 / wf * cos(wf * 2.39 * q1.x + time * 1.60); }
	q2 = vec2(q2.x * q2.x - q2.y * q2.y, 2.0 * q2.x * q2.y) * 0.79;
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin(time * 1.79));
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.95);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.04));
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.51 + time * 0.16);
	col = clamp((col - 0.5) * 1.71 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
