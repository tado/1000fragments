uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 14.77 - t * 4.28 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.36 + t * 0.61 + ph) + sin(p.y * 11.44 - t * 2.79 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = abs(p);
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.27 / wf * sin(wf * 3.61 * p.y + time * 1.89); p.y += 0.35 / wf * cos(wf * 1.77 * p.x + time * 1.87); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.56);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.77 + time * 0.02, vec3(0.49, 0.54, 0.52), vec3(0.35, 0.35, 0.38), vec3(0.81, 1.33, 0.88), vec3(0.85, 0.32, 0.02));
	col = clamp((col - 0.5) * 1.38 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
