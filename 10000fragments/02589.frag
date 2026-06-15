uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.29, 0.0)) * 13.39 - t * 5.69 + ph);
    float mb = sin(length(p + vec2(0.29, 0.0)) * 34.95 - t * 5.69 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.38;
	p = rot2(length(p) * 1.47 + time * 1.09) * p;
	p = rot2(2.80) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.25; p = rot2(2.44) * p; }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 1.96 * p.y + time * 1.97); p.y += 0.32 / wf * cos(wf * 1.76 * p.x + time * 0.90); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.07), field(p, time, 2.14));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
