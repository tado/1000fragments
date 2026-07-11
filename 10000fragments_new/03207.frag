uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.63 + t * 4.03 + ph) + sin(p.y * 3.41 - t * 4.03 + ph)
        + sin((p.x + p.y) * 11.93 + t * 4.03 + ph) + sin(length(p) * 14.64 - t * 4.03 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.70;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.14; p = rot2(1.86) * p; }
	p = abs(p);
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 2.17 * p.y + time * 1.79); p.y += 0.40 / wf * cos(wf * 3.91 * p.x + time * 0.92); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.42), field(p, time, 0.84));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.78 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
