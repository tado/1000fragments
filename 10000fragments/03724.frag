uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.47) - 0.5;
    float rad = 0.45 + 0.12 * sin(t * 2.87 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 16.53 + sin(p.y * 3.73 + t * 0.73) * 1.50 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.72;
	p = rot2(time * 0.91) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 2.17 * p.y + time * 0.89); p.y += 0.32 / wf * cos(wf * 2.52 * p.x + time * 1.99); }
	p = rot2(0.49) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.68);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.76 + time * 0.04, vec3(0.48, 0.59, 0.44), vec3(0.31, 0.32, 0.47), vec3(1.16, 1.24, 0.85), vec3(0.20, 0.13, 0.35));
	col = fract(col * 1.61);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
