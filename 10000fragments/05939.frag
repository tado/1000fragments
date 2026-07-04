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
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 4.18;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 1.08); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.39, 0.54, rv + 0.06 * sin(t * 1.42 + ph)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 2.95;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.87); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.39, 0.55, rv + 0.04 * sin(t * 2.42 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.34;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * -3.79 + time * 0.91) * q1;
	{ q2 = vec2(atan(q2.y, q2.x) * 2.36, length(q2) * 5.20 - time * 0.34); }
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.84);
	float d = max(d1, d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.87, 1.38, 1.06) + vec3(0.16, 0.05, 0.01);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.10;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
