uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.97) - 0.5;
    float rad = 0.33 + 0.12 * sin(t * 0.60 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.65;
	p = rot2(p.y * 3.61 + time * 0.95) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.45 / wf * sin(wf * 3.02 * p.y + time * 1.56); p.y += 0.27 / wf * cos(wf * 2.46 * p.x + time * 1.66); }
	{ float fr = length(p); p *= 1.0 + -0.70 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.80 + time * 0.28, vec3(0.42, 0.58, 0.51), vec3(0.50, 0.46, 0.32), vec3(0.84, 1.37, 1.35), vec3(0.56, 0.67, 0.65));
	col = fract(col * 2.47);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
