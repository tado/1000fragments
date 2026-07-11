uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.59) - 0.5;
    float rad = 0.29 + 0.12 * sin(t * 1.39 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.14;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 1.94 * p.y + time * 0.95); p.y += 0.33 / wf * cos(wf * 1.83 * p.x + time * 0.79); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.52; p = rot2(1.31) * p; }
	{ p = vec2(atan(p.y, p.x) * 2.32, length(p) * 5.65 - time * 0.76); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.71 + time * 0.23, vec3(0.45, 0.44, 0.43), vec3(0.38, 0.49, 0.31), vec3(0.84, 0.80, 0.78), vec3(0.91, 0.58, 0.41));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
