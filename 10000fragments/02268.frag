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
    v = sin(p.x * 25.49 + sin(p.y * 3.82 + t * 3.21) * 3.83 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 4.20;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.82); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.40, 0.56, rv + 0.04 * sin(t * 1.21 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1.x += sin(q1.y * 3.60 + time * 3.15) * 0.25;
	q1 = rot2(length(q1) * 2.01 + time * 1.34) * q1;
	q2 = fract(q2 * 1.42) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.57);
	float d = d1 * d2;
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.08 + time * 0.98);
	col *= 0.84 + 0.12 * sin(gl_FragCoord.y * 1.44 + time * 16.78);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
