uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 12.67 - t * 5.89 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.52;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 2.84 * p.y + time * 1.13); p.y += 0.32 / wf * cos(wf * 3.87 * p.x + time * 1.53); }
	p = fract(p * 1.19) - 0.5;
	p = rot2(p.y * 1.61 + time * 0.40) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.28), field(p, time, 0.56));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
