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
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 2.19;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.83); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.45, 0.59, rv + 0.03 * sin(t * 1.54 + ph)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.56;
    v = 0.5 * (sin(5.0 * cp.x + t * 0.80) * sin(6.0 * cp.y + ph)
             + sin(6.0 * cp.x - t * 2.49) * sin(5.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 += vec2(0.68, 0.97) * sin(length(q1) * 3.43 - time * 1.83) * 0.33;
	for(int fo = 0; fo < 2; fo++){ q1 = abs(q1) - 0.31; q1 = rot2(1.69) * q1; }
	q2 = sin(q2 * 2.60 + time * 1.97) * 0.93;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.75);
	float d = d1 * d2;
	vec3 col = palette(d * 0.59 + time * 0.12, vec3(0.48, 0.54, 0.57), vec3(0.43, 0.48, 0.33), vec3(1.30, 0.78, 1.34), vec3(0.17, 0.78, 0.95));
	col *= 0.86 + 0.10 * sin(gl_FragCoord.y * 1.98 + time * 16.92);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
