uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.46) - 0.5;
    float rad = 0.41 + 0.12 * sin(t * 3.14 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * -0.93) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 1.58 * p.y + time * 0.98); p.y += 0.48 / wf * cos(wf * 3.64 * p.x + time * 0.97); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.13; p = rot2(2.27) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.83 + time * 0.14, vec3(0.52, 0.55, 0.45), vec3(0.47, 0.33, 0.39), vec3(1.36, 1.09, 0.85), vec3(0.34, 0.94, 0.96));
	col = mod(col * 2.96, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
