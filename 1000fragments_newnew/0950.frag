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
    v = 0.5 * (sin(p.x * 11.11 + t * 5.20 + ph) + sin(p.y * 16.00 - t * 3.57 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 4.40;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.64); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.41, 0.58, rv + 0.06 * sin(t * 2.46 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.79;
	vec2 q1 = p; vec2 q2 = p;
	q1 = sin(q1 * 1.70 + (time * 0.63) * 2.01) * 1.00;
	{ q2 = vec2(atan(q2.y, q2.x) * 2.41, length(q2) * 4.42 - (time * 0.63) * 0.49); }
	float d1 = fieldA(q1, (time * 0.63), 0.0);
	float d2 = fieldB(q2, (time * 0.63), 0.32);
	float d = max(d1, d2);
	vec3 col = vec3(0.52, 0.40, 0.39) * (0.07 / (abs((d)) + 0.09));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.01 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.60);
	col = clamp(col, 0.0, 1.0) * vec3(1.048, 0.977, 0.912) * 1.00 + 0.018;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
