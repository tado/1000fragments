uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 18.75 + sin(p.y * 2.65 + t * 5.99) * 4.78 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.80) - 0.5;
    float rad = 0.37 + 0.12 * sin(t * 3.07 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.73;
	{ p = vec2(atan(p.y, p.x) * 2.39, length(p) * 2.03 - time * 0.15); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 3.56 * p.y + time * 0.99); p.y += 0.44 / wf * cos(wf * 1.68 * p.x + time * 0.75); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.36);
	float d = d1 * d2;
	vec3 col = palette(d * 1.60 + time * 0.05, vec3(0.41, 0.45, 0.60), vec3(0.47, 0.43, 0.41), vec3(1.32, 0.84, 0.71), vec3(0.09, 0.82, 0.52));
	col = fract(col * 2.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
