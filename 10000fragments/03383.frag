uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.01) - 0.5;
    float rad = 0.44 + 0.12 * sin(t * 1.06 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.96;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = abs(p);
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.49 / wf * sin(wf * 1.84 * p.y + time * 1.75); p.y += 0.27 / wf * cos(wf * 1.95 * p.x + time * 0.86); }
	p = rot2(time * 1.21) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.81 + time * 0.07, vec3(0.47, 0.50, 0.58), vec3(0.39, 0.32, 0.32), vec3(1.08, 1.21, 0.89), vec3(0.27, 0.10, 0.36));
	col = fract(col * 1.73);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
