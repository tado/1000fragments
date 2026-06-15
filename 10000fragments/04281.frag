uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise2(vec2 p){
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
    float fs = 0.0, famp = 0.5; vec2 fq = p * 3.21 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 1.21); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.24;
	{ p = vec2(atan(p.y, p.x) * 1.27, length(p) * 4.44 - time * 0.62); }
	p = fract(p * 2.15) - 0.5;
	p *= 3.12;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.77 + time * 0.04, vec3(0.46, 0.48, 0.57), vec3(0.50, 0.48, 0.31), vec3(1.01, 1.03, 1.12), vec3(0.82, 0.75, 0.48));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
