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
    float wr = length(p) + 0.35 * vnoise2(p * 5.07 + t * 1.20);
    v = sin(wr * 14.70 - t * 3.04 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 2.95;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.68); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.44, 0.51, rv + 0.03 * sin(t * 1.77 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.66; }
	p *= 1.47;
	p *= 1.0 + 0.37 * sin(time * 4.00);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.27);
	float d = d1 + d2;
	vec3 col = palette(d * 1.58 + time * 0.26, vec3(0.45, 0.40, 0.59), vec3(0.35, 0.48, 0.46), vec3(1.01, 0.82, 1.25), vec3(0.02, 0.32, 0.79));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.72));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
