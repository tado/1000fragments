uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 21.71 + sin(p.y * 1.44 + t * 2.33) * 4.82 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(p.y * -3.05 + time * 0.53) * p;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 3.55 * p.y + time * 1.03); p.y += 0.24 / wf * cos(wf * 2.66 * p.x + time * 0.79); }
	{ float fr = length(p); p *= 1.0 + -0.47 * fr * fr; }
	p = fract(p * 1.00) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.08 + time * 0.03, vec3(0.55, 0.55, 0.58), vec3(0.41, 0.35, 0.30), vec3(1.27, 0.87, 1.28), vec3(0.97, 0.47, 0.61));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
