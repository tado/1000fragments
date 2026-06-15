uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.64) - 0.5;
    float rad = 0.31 + 0.12 * sin(t * 2.59 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.32;
	p = rot2(length(p) * 2.95 + time * 0.53) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 3.82 * p.y + time * 1.48); p.y += 0.43 / wf * cos(wf * 3.06 * p.x + time * 0.61); }
	p = fract(p * 2.72) - 0.5;
	p = rot2(p.y * 1.64 + time * 0.20) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.21, 0.86, 1.47) + vec3(0.29, 0.17, 0.05);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.92));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
