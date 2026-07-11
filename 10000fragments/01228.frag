uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.71 + t * 3.33 + ph) + sin(p.y * 2.14 - t * 3.33 + ph)
        + sin((p.x + p.y) * 6.06 + t * 3.33 + ph) + sin(length(p) * 6.29 - t * 3.33 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.71;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.25; p = rot2(2.02) * p; }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.47 / wf * sin(wf * 2.01 * p.y + time * 1.15); p.y += 0.23 / wf * cos(wf * 2.82 * p.x + time * 1.49); }
	p = rot2(1.83) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.85 + time * 0.06, vec3(0.58, 0.49, 0.51), vec3(0.36, 0.49, 0.42), vec3(0.72, 1.01, 0.88), vec3(0.33, 0.80, 0.80));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
