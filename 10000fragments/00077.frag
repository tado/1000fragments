uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.64 + t * 4.85 + ph) + sin(p.y * 6.23 - t * 5.52 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.35; p = rot2(2.32) * p; }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.38 / wf * sin(wf * 2.94 * p.y + time * 1.21); p.y += 0.36 / wf * cos(wf * 3.60 * p.x + time * 1.20); }
	p = rot2(time * 1.17) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.53 + time * 0.06);
	col = clamp((col - 0.5) * 1.39 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
