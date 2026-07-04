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
    float zx = abs(fract(p.x * 2.79 + t * 1.37) - 0.5) * 2.0;
    v = sin((p.y * 6.79 + zx * 1.03 + t * 1.25) * 3.1415927 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 3.27;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.47); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.40, 0.54, rv + 0.08 * sin(t * 2.08 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.92;
	vec2 q1 = p; vec2 q2 = p;
	q1 = abs(q1) - 0.26;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.31);
	float d = min(d1, d2);
	vec3 col = vec3(0.94, 0.73, 0.39) * (0.23 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.57 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
