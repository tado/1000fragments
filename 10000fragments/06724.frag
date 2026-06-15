uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.30, 0.0)) * 25.76 - t * 2.53 + ph);
    float mb = sin(length(p + vec2(0.30, 0.0)) * 20.60 - t * 2.53 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 3.22;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 2.91 * p.y + time * 1.20); p.y += 0.40 / wf * cos(wf * 2.47 * p.x + time * 1.73); }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.49; p = rot2(1.45) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.29), field(p, time, 0.59));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.59 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
