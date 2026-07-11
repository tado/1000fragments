uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.28, 0.0)) * 10.16 - t * 4.87 + ph);
    float mb = sin(length(p + vec2(0.28, 0.0)) * 25.85 - t * 1.21 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.25;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.36 / wf * sin(wf * 2.65 * p.y + time * 2.20); p.y += 0.37 / wf * cos(wf * 3.80 * p.x + time * 2.08); }
	p = abs(p) - 0.34;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.44; p = rot2(1.63) * p; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.46, 0.55, 0.25) * (0.08 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.06;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
