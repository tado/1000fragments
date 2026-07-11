uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.33) - 0.5;
    float rad = 0.42 + 0.12 * sin(t * 0.94 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.18; p = rot2(2.60) * p; }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.29 / wf * sin(wf * 1.65 * p.y + time * 1.72); p.y += 0.24 / wf * cos(wf * 2.33 * p.x + time * 1.66); }
	p = rot2(time * -0.51) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.95 + time * 0.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
