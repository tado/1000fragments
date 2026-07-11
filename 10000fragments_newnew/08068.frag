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
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.39 + 0.21 * pow(abs(cos(ra * 4.0 + t * 1.97)), 2.52);
    v = sin((rr - pet) * 17.18 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 3.89;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.84); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.44, 0.55, rv + 0.05 * sin(t * 0.81 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.60;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.46);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.72 + time * 0.09, vec3(0.45, 0.59, 0.49), vec3(0.35, 0.32, 0.43), vec3(0.89, 1.14, 0.73), vec3(0.36, 0.79, 0.59));
	col *= 0.88 + 0.15 * sin(gl_FragCoord.y * 1.85 + time * 10.95);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
