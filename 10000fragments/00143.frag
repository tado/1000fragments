uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.02) - 0.5;
    float rad = 0.31 + 0.12 * sin(t * 2.96 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.86;
	p = abs(p);
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.32 / wf * sin(wf * 2.55 * p.y + time * 0.80); p.y += 0.41 / wf * cos(wf * 3.18 * p.x + time * 0.94); }
	p = rot2(time * -1.39) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.33; p = rot2(2.14) * p; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.95, 1.37, 0.50) + vec3(0.16, 0.06, 0.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
