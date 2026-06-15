uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.88) - 0.5;
    float rad = 0.27 + 0.12 * sin(t * 2.25 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.23;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.59; p = rot2(0.37) * p; }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 1.53 * p.y + time * 1.50); p.y += 0.38 / wf * cos(wf * 3.53 * p.x + time * 1.32); }
	p = rot2(time * -0.71) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.50 + time * 0.13);
	col = fract(col * 2.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
