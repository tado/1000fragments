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
    float bx = p.x + (vnoise2(vec2(p.y * 1.20, t * 1.21)) - 0.5) * 0.71;
    v = exp(-abs(bx) * 9.00) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 5.61 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 0.25); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(0.21, 0.59) * sin(length(p) * 5.52 - time * 2.00) * 0.36;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.03);
	float d = d1 * d2;
	vec3 col = palette(d * 1.45 + time * 0.24, vec3(0.47, 0.44, 0.52), vec3(0.41, 0.44, 0.47), vec3(1.37, 0.70, 1.07), vec3(0.25, 0.87, 0.20));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
