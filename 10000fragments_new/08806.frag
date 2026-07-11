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
    vec2 wq = vec2(vnoise2(p * 3.80 + ph), vnoise2(p * 3.80 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.80 + 1.02 * wq + vec2(1.7, 9.2) + t * 0.34),
                   vnoise2(p * 3.80 + 2.32 * wq + vec2(8.3, 2.8) - t * 0.96));
    v = vnoise2(p * 3.80 + 2.85 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.36;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.29; p = rot2(2.59) * p; }
	p = (floor(p * 16.0) + 0.5) / 16.0;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.38 / wf * sin(wf * 3.33 * p.y + time * 0.84); p.y += 0.28 / wf * cos(wf * 3.90 * p.x + time * 1.86); }
	p *= 1.56;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.03, 1.25, 0.97) + vec3(0.27, 0.04, 0.01);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.79));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
