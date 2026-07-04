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

float field(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 1.69 + ph), vnoise2(p * 1.69 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 1.69 + 3.19 * wq + vec2(1.7, 9.2) + t * 0.99),
                   vnoise2(p * 1.69 + 3.08 * wq + vec2(8.3, 2.8) - t * 1.16));
    v = vnoise2(p * 1.69 + 2.80 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(-0.25, 0.95) * sin(length(p) * 5.25 - time * 1.03) * 0.18;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.38 / wf * sin(wf * 2.87 * p.y + time * 1.34); p.y += 0.42 / wf * cos(wf * 2.95 * p.x + time * 1.05); }
	p = (floor(p * 6.2) + 0.5) / 6.2;
	p = rot2(0.31) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.17, 0.07, 0.21), vec3(0.78, 0.79, 0.87), d);
	col *= 0.90 + 0.12 * sin(gl_FragCoord.y * 1.71 + time * 7.69);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
