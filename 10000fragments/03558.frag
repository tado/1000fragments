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
    float petal = 0.62 + 0.16 * cos(sa * 4 + t * 2.44 + ph);
    v = sin((sr - petal) * 8.50);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.20; p = rot2(0.37) * p; }
	{ float fr = length(p); p *= 1.0 + 0.28 * fr * fr; }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 2.84 * p.y + time * 1.25); p.y += 0.39 / wf * cos(wf * 2.71 * p.x + time * 0.99); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.16 + time * 0.02, vec3(0.47, 0.45, 0.51), vec3(0.50, 0.40, 0.49), vec3(0.79, 1.32, 0.81), vec3(0.60, 0.34, 0.54));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
