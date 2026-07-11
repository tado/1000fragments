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
    vec2 wq = vec2(vnoise2(p * 3.01 + ph), vnoise2(p * 3.01 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.01 + 3.20 * wq + vec2(1.7, 9.2) + t * 0.59),
                   vnoise2(p * 3.01 + 2.30 * wq + vec2(8.3, 2.8) - t * 0.61));
    v = vnoise2(p * 3.01 + 1.61 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.94;
	{ p = vec2(atan(p.y, p.x) * 1.05, length(p) * 4.91 - time * 0.85); }
	p = fract(p * 1.47) - 0.5;
	p.y += sin(p.x * 7.31 + time * 1.16) * 0.32;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.43 / wf * sin(wf * 3.37 * p.y + time * 1.36); p.y += 0.40 / wf * cos(wf * 3.86 * p.x + time * 1.16); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.57), field(p, time, 1.14));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
