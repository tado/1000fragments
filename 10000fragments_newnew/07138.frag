uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 3.90;
    v = 0.5 * (sin(6.0 * cp.x + t * 2.08) * sin(2.0 * cp.y + ph)
             + sin(2.0 * cp.x - t * 2.12) * sin(6.0 * cp.y + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 2.75;
    v = 0.5 * (sin(4.0 * cp.x + t * 2.65) * sin(3.0 * cp.y + ph)
             + sin(3.0 * cp.x - t * 2.12) * sin(4.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.24;
	p = rot2(p.y * 1.56 + time * 0.71) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 2.31 * p.y + time * 1.18); p.y += 0.48 / wf * cos(wf * 2.88 * p.x + time * 1.68); }
	p = fract(p * 1.18) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.54);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.79 + time * 0.24, vec3(0.54, 0.47, 0.51), vec3(0.33, 0.45, 0.31), vec3(0.72, 0.96, 0.75), vec3(0.70, 0.41, 0.93));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
