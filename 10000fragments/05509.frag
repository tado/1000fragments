uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.93) - 0.5;
    float rad = 0.21 + 0.12 * sin(t * 2.00 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float fr = length(p); p *= 1.0 + -0.60 * fr * fr; }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.39; p = rot2(0.34) * p; }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.39 / wf * sin(wf * 3.97 * p.y + time * 2.00); p.y += 0.31 / wf * cos(wf * 3.22 * p.x + time * 1.61); }
	p *= 3.00;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.64 + time * 0.19, vec3(0.57, 0.48, 0.57), vec3(0.41, 0.39, 0.37), vec3(0.92, 1.32, 0.88), vec3(0.80, 0.56, 0.60));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
