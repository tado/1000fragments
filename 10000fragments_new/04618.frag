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
    vec2 wq = vec2(vnoise2(p * 2.78 + ph), vnoise2(p * 2.78 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.78 + 2.36 * wq + vec2(1.7, 9.2) + t * 1.02),
                   vnoise2(p * 2.78 + 2.15 * wq + vec2(8.3, 2.8) - t * 0.69));
    v = vnoise2(p * 2.78 + 3.45 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.36 + 0.27 * pow(abs(cos(ra * 3.0 + t * 2.53)), 0.99);
    v = sin((rr - pet) * 9.11 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.50;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.81);
	float d = 0.5 * (d1 + d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.32, 0.23, 0.20), vec3(0.70, 0.99, 0.57), cc);
	col *= 0.89 + 0.10 * sin(gl_FragCoord.y * 1.53 + time * 7.80);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
