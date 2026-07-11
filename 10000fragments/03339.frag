uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.97) - 0.5;
    float rad = 0.37 + 0.12 * sin(t * 2.87 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(1.84) * p;
	p += vec2(0.34, -0.94) * sin(length(p) * 5.28 - time * 1.93) * 0.35;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.33 / wf * sin(wf * 2.14 * p.y + time * 1.52); p.y += 0.27 / wf * cos(wf * 1.73 * p.x + time * 1.05); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.31), field(p, time, 2.63));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.09, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
