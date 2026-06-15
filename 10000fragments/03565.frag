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
    v = 0.25 * (sin(p.x * 8.73 + t * 4.56 + ph) + sin(p.y * 4.46 - t * 4.56 + ph)
        + sin((p.x + p.y) * 9.96 + t * 4.56 + ph) + sin(length(p) * 7.95 - t * 4.56 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float fs = 0.0, famp = 0.5; vec2 fq = p * 2.53 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 0.29); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(0.74, 0.89) * sin(length(p) * 2.65 - time * 1.52) * 0.34;
	p *= 1.98;
	{ p = vec2(atan(p.y, p.x) * 2.62, length(p) * 5.06 - time * 0.55); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.31);
	float d = d1 + d2;
	vec3 col = palette(d * 0.95 + time * 0.12, vec3(0.44, 0.44, 0.43), vec3(0.45, 0.39, 0.32), vec3(1.29, 1.02, 1.37), vec3(0.99, 0.40, 0.64));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
