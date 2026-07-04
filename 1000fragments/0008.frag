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
    float zx = abs(fract(p.x * 2.22 + t * 1.41) - 0.5) * 2.0;
    v = sin((p.y * 5.98 + zx * 1.55 + t * 2.33) * 3.1415927 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.19 + t * 3.53 + ph) + sin(p.y * 2.17 - t * 3.64 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 1.99;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.31); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.43, 0.58, rv + 0.06 * sin(t * 2.29 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.11;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 *= 1.81;
	q3 = mix(q3, q3.yx, 0.5 + 0.5 * sin(time * 1.39));
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.11);
	float d3 = fieldC(q3, time, 0.29);
	d2 = min(d2, d3);
	float d = d1 * d2;
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.29, 0.27, 0.26), vec3(0.96, 0.56, 0.65), cc);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
