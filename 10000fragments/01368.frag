uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.36 + t * 3.35 + ph) + sin(p.y * 10.81 - t * 3.35 + ph)
        + sin((p.x + p.y) * 8.49 + t * 3.35 + ph) + sin(length(p) * 3.53 - t * 3.35 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.30;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.39 / wf * sin(wf * 1.55 * p.y + time * 1.26); p.y += 0.25 / wf * cos(wf * 3.66 * p.x + time * 1.09); }
	p = fract(p * 1.48) - 0.5;
	p = rot2(length(p) * -1.45 + time * 0.54) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.76 + time * 0.22, vec3(0.53, 0.44, 0.60), vec3(0.38, 0.31, 0.39), vec3(0.71, 1.15, 0.81), vec3(0.58, 0.71, 0.73));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
