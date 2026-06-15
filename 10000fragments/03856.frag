uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.91) - 0.5;
    float rad = 0.22 + 0.12 * sin(t * 3.42 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.89;
	p = rot2(time * -1.20) * p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.32 / wf * sin(wf * 3.40 * p.y + time * 1.65); p.y += 0.48 / wf * cos(wf * 3.20 * p.x + time * 1.33); }
	p = rot2(length(p) * 1.77 + time * 0.73) * p;
	{ float fr = length(p); p *= 1.0 + 0.31 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.66, 0.53, 1.35) + vec3(0.08, 0.21, 0.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
