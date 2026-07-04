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
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 3.11;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 1.09); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.38, 0.58, rv + 0.10 * sin(t * 0.89 + ph)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float bx = p.x + (vnoise2(vec2(p.y * 2.64, t * 2.74)) - 0.5) * 0.85;
    v = exp(-abs(bx) * 11.51) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.34;
	vec2 q1 = p; vec2 q2 = p;
	q1 = (floor(q1 * 25.8) + 0.5) / 25.8;
	{ float fr = length(q2); q2 *= 1.0 + -0.69 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.00);
	float d = min(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.98 + time * 0.26);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
