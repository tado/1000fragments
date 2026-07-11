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
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 4.58;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.47); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.45, 0.59, rv + 0.07 * sin(t * 1.91 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.34; p = rot2(0.90) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.85 + time * 0.28, vec3(0.41, 0.51, 0.59), vec3(0.33, 0.43, 0.46), vec3(1.36, 0.75, 1.15), vec3(0.60, 0.65, 0.77));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
