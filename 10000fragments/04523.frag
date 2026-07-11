uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.40, 0.0)) * 30.07 - t * 7.20 + ph);
    float mb = sin(length(p + vec2(0.40, 0.0)) * 25.02 - t * 7.20 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 1.67 * p.y + time * 0.96); p.y += 0.22 / wf * cos(wf * 1.93 * p.x + time * 1.17); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.52; p = rot2(0.45) * p; }
	p *= 2.06;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.17, 0.21, 0.45), vec3(0.55, 0.75, 0.41), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
