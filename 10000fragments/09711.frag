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
    v = sin(sa * 6.45 + sr * 9.23 - t * 0.86 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.74;
	{ float fr = length(p); p *= 1.0 + -0.78 * fr * fr; }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.29 / wf * sin(wf * 2.56 * p.y + time * 1.52); p.y += 0.25 / wf * cos(wf * 2.14 * p.x + time * 1.87); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.53; p = rot2(1.11) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.38 + time * 0.01, vec3(0.48, 0.47, 0.46), vec3(0.33, 0.44, 0.32), vec3(0.93, 1.09, 1.12), vec3(0.69, 0.69, 0.08));
	col = mod(col * 2.18, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
