uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.07) - 0.5;
    float rad = 0.39 + 0.12 * sin(t * 1.60 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.94;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 3.25 * p.y + time * 1.32); p.y += 0.48 / wf * cos(wf * 2.92 * p.x + time * 0.86); }
	p += vec2(0.58, 0.10) * sin(length(p) * 3.11 - time * 1.66) * 0.39;
	p = rot2(0.60) * p;
	p = fract(p * 2.17) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.38), field(p, time, 0.76));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.98));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
