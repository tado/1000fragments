uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.62 + 0.24 * cos(sa * 8 + t * 1.96 + ph);
    v = sin((sr - petal) * 14.31);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.28) - 0.5;
    float rad = 0.24 + 0.12 * sin(t * 1.23 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(p.y * 1.92 + time * 0.52) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 2.60 * p.y + time * 0.65); p.y += 0.31 / wf * cos(wf * 1.67 * p.x + time * 1.12); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.01);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.48 + time * 0.01, vec3(0.42, 0.48, 0.41), vec3(0.46, 0.40, 0.37), vec3(1.26, 1.07, 0.91), vec3(0.12, 0.22, 0.08));
	col = clamp((col - 0.5) * 1.85 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
