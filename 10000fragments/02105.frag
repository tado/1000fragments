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
    vec2 cq = p * 12.88 + vec2(t * 2.49, -t * 2.49) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float fs = 0.0, famp = 0.5; vec2 fq = p * 1.70 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 0.76); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.52;
	p *= 3.49;
	p += vec2(-0.23, -0.39) * sin(length(p) * 4.30 - time * 0.62) * 0.11;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.56);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.86 + time * 0.09, vec3(0.53, 0.44, 0.57), vec3(0.31, 0.37, 0.39), vec3(1.38, 1.26, 1.33), vec3(0.03, 0.10, 0.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
