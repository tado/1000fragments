uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.74) - 0.5;
    float rad = 0.28 + 0.12 * sin(t * 0.68 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.02;
	p = rot2(length(p) * -1.44 + time * 0.99) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.49 / wf * sin(wf * 3.13 * p.y + time * 1.67); p.y += 0.32 / wf * cos(wf * 2.10 * p.x + time * 1.74); }
	p += vec2(0.69, 0.26) * sin(length(p) * 2.50 - time * 1.80) * 0.25;
	p = rot2(p.y * 3.11 + time * 0.55) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.20), field(p, time, 2.40));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.54, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
