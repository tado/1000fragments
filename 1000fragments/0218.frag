uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 8.75 + t * 2.61 + ph) + sin(p.y * 6.17 - t * 1.65 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.35;
	p *= 3.48;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 3.41 * p.y + time * 1.75); p.y += 0.36 / wf * cos(wf * 3.83 * p.x + time * 1.59); }
	p = rot2(1.53) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.70 + time * 0.01, vec3(0.60, 0.58, 0.54), vec3(0.48, 0.32, 0.35), vec3(1.09, 0.79, 0.87), vec3(0.98, 0.76, 0.20));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
