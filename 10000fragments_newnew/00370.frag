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
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 1.72;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.82); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.44, 0.56, rv + 0.09 * sin(t * 1.91 + ph)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.35 + 0.34 * pow(abs(cos(ra * 6.0 + t * 2.29)), 2.63);
    v = sin((rr - pet) * 16.54 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.25;
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 1.83) - 0.5;
	q1 = abs(q1) - 0.76;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.97);
	float d = 0.5 * (d1 + d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.07, 0.09, 0.42), vec3(0.76, 0.91, 0.74), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
