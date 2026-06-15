uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.89, t * 2.07 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(2.03) * p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.41 / wf * sin(wf * 2.60 * p.y + time * 1.03); p.y += 0.47 / wf * cos(wf * 1.86 * p.x + time * 1.52); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.28; p = rot2(2.02) * p; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.48, 0.14, 0.42), vec3(0.95, 0.65, 0.46), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
