uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 29.56 - t * 3.46 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.18;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.28 / wf * sin(wf * 3.33 * p.y + time * 1.67); p.y += 0.24 / wf * cos(wf * 1.54 * p.x + time * 1.78); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.56; p = rot2(1.56) * p; }
	p = rot2(p.y * 1.26 + time * 0.15) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.25), field(p, time, 2.50));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
