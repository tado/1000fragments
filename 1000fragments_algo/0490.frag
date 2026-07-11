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
    float grow = floor(p.y * 14.85);
    float gsh = hash21(vec2(grow, floor(t * 2.87))) - 0.5;
    float gx = p.x + gsh * 0.39;
    v = sin(gx * 14.72 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.11));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wr = length(p) + 0.23 * vnoise2(p * 2.58 + t * 1.38);
    v = sin(wr * 15.49 - t * 0.81 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(sin((time * 0.55) * 0.56), cos((time * 0.55) * 0.52)) * 0.13;
	vec2 q1 = p; vec2 q2 = p;
	q2.x += sin(q2.y * 4.74 + (time * 0.55) * 2.21) * 0.24;
	q2 = vec2(q2.x * q2.x - q2.y * q2.y, 2.0 * q2.x * q2.y) * 1.10;
	float d1 = fieldA(q1, (time * 0.55), 0.0);
	float d2 = fieldB(q2, (time * 0.55), 0.53);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.66, 0.82, 0.78) * (0.07 / (abs((d)) + 0.04));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.58 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.38);
	col = clamp(col, 0.0, 1.0) * vec3(0.998, 0.941, 1.016) * 1.00 + 0.029;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
