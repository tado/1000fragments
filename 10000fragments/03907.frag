uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.64) - 0.5;
    float rad = 0.24 + 0.12 * sin(t * 2.54 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.83 + t * 1.94 + ph) + sin(p.y * 15.67 - t * 5.48 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.09;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.16; p = rot2(1.25) * p; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 1.61 * p.y + time * 1.27); p.y += 0.35 / wf * cos(wf * 3.42 * p.x + time * 1.60); }
	p = abs(p);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.51);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.52 + time * 0.16, vec3(0.50, 0.56, 0.59), vec3(0.44, 0.37, 0.41), vec3(0.83, 1.02, 1.02), vec3(0.93, 0.24, 0.54));
	col = fract(col * 2.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
