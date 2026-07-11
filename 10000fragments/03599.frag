uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.84) - 0.5;
    float rad = 0.26 + 0.12 * sin(t * 3.14 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.45;
	p += vec2(0.26, -0.60) * sin(length(p) * 4.13 - time * 1.32) * 0.11;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.29 / wf * sin(wf * 2.78 * p.y + time * 0.85); p.y += 0.22 / wf * cos(wf * 2.09 * p.x + time * 0.70); }
	p = rot2(p.y * -1.75 + time * 0.90) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.19), field(p, time, 2.37));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
