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
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 2.74;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.99); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.39, 0.56, rv + 0.09 * sin(t * 1.90 + ph)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 3.0 + qr * 6.75 * sin(t * 0.84) + t * 2.59 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q2); q2 *= 1.0 + 0.38 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.77);
	float d = max(d1, d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.24, 1.44, 1.26) + vec3(0.18, 0.14, 0.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
