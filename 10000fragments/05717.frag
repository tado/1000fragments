uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
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
    vec2 z = p * 0.66; vec2 jc = vec2(-0.71 + 0.3 * sin(t * 1.23 + ph), -0.50 + 0.3 * cos(t * 1.23 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 25; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(25) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float fs = 0.0, famp = 0.5; vec2 fq = p * 2.95 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 1.27); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -0.84) * p;
	p = rot2(length(p) * 3.38 + time * 0.79) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.38; p = rot2(1.70) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.01);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.95 + time * 0.12, vec3(0.52, 0.51, 0.54), vec3(0.32, 0.35, 0.35), vec3(1.22, 0.76, 1.15), vec3(0.50, 0.09, 0.38));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
