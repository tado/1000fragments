uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.47 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.52 + t * 3.12 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 17.22);
    float gsh = hash21(vec2(grow, floor(t * 5.28))) - 0.5;
    float gx = p.x + gsh * 0.45;
    v = sin(gx * 12.79 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.44));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.12; p = rot2(2.58) * p; }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 2.29 * p.y + time * 0.96); p.y += 0.21 / wf * cos(wf * 2.86 * p.x + time * 1.06); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.86);
	float d = d1 * d2;
	vec3 col = palette(d * 1.08 + time * 0.24, vec3(0.50, 0.55, 0.47), vec3(0.40, 0.48, 0.42), vec3(0.93, 0.96, 1.04), vec3(0.97, 0.30, 0.99));
	col = clamp((col - 0.5) * 1.92 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
