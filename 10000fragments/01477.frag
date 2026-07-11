uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 37.43 - t * 7.51 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.63;
	{ float fr = length(p); p *= 1.0 + 0.62 * fr * fr; }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.29 / wf * sin(wf * 2.17 * p.y + time * 1.33); p.y += 0.32 / wf * cos(wf * 2.25 * p.x + time * 0.98); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.23; p = rot2(1.01) * p; }
	p = rot2(time * -1.01) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.91 + time * 0.20, vec3(0.43, 0.42, 0.46), vec3(0.32, 0.36, 0.41), vec3(0.81, 0.73, 1.19), vec3(0.93, 0.58, 0.35));
	col = mod(col * 2.99, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
