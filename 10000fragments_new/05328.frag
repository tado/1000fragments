uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.96) - 0.5;
    float rad = 0.32 + 0.12 * sin(t * 3.10 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.02;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 2.69 * p.y + time * 2.04); p.y += 0.28 / wf * cos(wf * 3.35 * p.x + time * 1.16); }
	p = rot2(0.86) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.02 + time * 0.24, vec3(0.43, 0.45, 0.53), vec3(0.46, 0.43, 0.45), vec3(0.72, 1.21, 1.27), vec3(0.19, 0.04, 0.12));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
