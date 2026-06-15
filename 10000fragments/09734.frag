uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.24, 0.0)) * 28.63 - t * 5.74 + ph);
    float mb = sin(length(p + vec2(0.24, 0.0)) * 12.77 - t * 5.74 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.64;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.27; p = rot2(1.62) * p; }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.43 / wf * sin(wf * 2.93 * p.y + time * 1.78); p.y += 0.50 / wf * cos(wf * 2.28 * p.x + time * 0.79); }
	p = rot2(1.87) * p;
	p = rot2(length(p) * 2.11 + time * 0.69) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.96), field(p, time, 1.91));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.92));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
