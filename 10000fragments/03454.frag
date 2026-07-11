uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.37) - 0.5;
    float rad = 0.37 + 0.12 * sin(t * 3.50 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.56;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.36 / wf * sin(wf * 3.81 * p.y + time * 1.20); p.y += 0.47 / wf * cos(wf * 1.73 * p.x + time * 1.82); }
	p = abs(p) - 0.28;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.30; p = rot2(1.16) * p; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.36, 1.26, 1.47) + vec3(0.21, 0.15, 0.02);
	col = fract(col * 1.85);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
