uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.96) - 0.5;
    float rad = 0.35 + 0.12 * sin(t * 3.29 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 1.53 * p.y + time * 1.13); p.y += 0.30 / wf * cos(wf * 3.65 * p.x + time * 1.39); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.22), field(p, time, 0.45));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
