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
    vec2 wq = vec2(vnoise2(p * 2.05 + ph), vnoise2(p * 2.05 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.05 + 2.79 * wq + vec2(1.7, 9.2) + t * 0.34),
                   vnoise2(p * 2.05 + 2.63 * wq + vec2(8.3, 2.8) - t * 0.97));
    v = vnoise2(p * 2.05 + 2.20 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * 1.87 + time * 0.46) * p;
	p.x += sin(p.y * 3.22 + time * 2.58) * 0.16;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.36 / wf * sin(wf * 2.09 * p.y + time * 0.93); p.y += 0.45 / wf * cos(wf * 3.46 * p.x + time * 1.59); }
	p += vec2(-0.69, -0.27) * sin(length(p) * 3.88 - time * 1.55) * 0.33;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.04, 1.23, 0.95) + vec3(0.05, 0.03, 0.30);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
