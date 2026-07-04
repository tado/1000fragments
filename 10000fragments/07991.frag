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

float field(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.61 + ph), vnoise2(p * 2.61 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.61 + 1.92 * wq + vec2(1.7, 9.2) + t * 0.95),
                   vnoise2(p * 2.61 + 1.54 * wq + vec2(8.3, 2.8) - t * 0.35));
    v = vnoise2(p * 2.61 + 3.26 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.39 / wf * sin(wf * 1.96 * p.y + time * 0.89); p.y += 0.28 / wf * cos(wf * 2.11 * p.x + time * 1.03); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.29), field(p, time, 0.57));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
