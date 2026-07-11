uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.56 + t * 5.77 + ph) + sin(p.y * 6.66 - t * 5.33 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.73;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.28 / wf * sin(wf * 1.59 * p.y + time * 1.07); p.y += 0.36 / wf * cos(wf * 1.79 * p.x + time * 1.56); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.11 + time * 0.24, vec3(0.60, 0.41, 0.48), vec3(0.32, 0.32, 0.31), vec3(1.26, 0.76, 0.83), vec3(0.52, 0.46, 0.45));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
