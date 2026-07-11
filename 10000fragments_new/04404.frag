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
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 4.81 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 1.07); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.36; vec2 jc = vec2(-0.40 + 0.3 * sin(t * 1.66 + ph), 0.19 + 0.3 * cos(t * 0.43 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 16; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 16.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.61;
	p = (floor(p * 19.9) + 0.5) / 19.9;
	p = fract(p * 1.72) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.50);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.65 + time * 0.29, vec3(0.52, 0.56, 0.55), vec3(0.44, 0.48, 0.37), vec3(1.03, 1.17, 1.10), vec3(0.13, 0.42, 0.68));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
