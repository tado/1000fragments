uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.79) - 0.5;
    float rad = 0.44 + 0.12 * sin(t * 1.04 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.45 / wf * sin(wf * 2.66 * p.y + time * 1.50); p.y += 0.28 / wf * cos(wf * 2.29 * p.x + time * 0.86); }
	p = rot2(p.y * -1.11 + time * 0.66) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.72), field(p, time, 1.44));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.56, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
