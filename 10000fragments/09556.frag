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
    vec2 wq = vec2(vnoise2(p * 3.11 + ph), vnoise2(p * 3.11 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.11 + 1.20 * wq + vec2(1.7, 9.2) + t * 1.13),
                   vnoise2(p * 3.11 + 2.36 * wq + vec2(8.3, 2.8) - t * 0.59));
    v = vnoise2(p * 3.11 + 3.01 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.75;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.10; p = rot2(1.84) * p; }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.41 / wf * sin(wf * 3.48 * p.y + time * 1.44); p.y += 0.26 / wf * cos(wf * 1.77 * p.x + time * 0.66); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.77 + time * 0.20, vec3(0.49, 0.44, 0.41), vec3(0.46, 0.34, 0.31), vec3(0.92, 1.30, 0.88), vec3(0.93, 0.44, 0.89));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
