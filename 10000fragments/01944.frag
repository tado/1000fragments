uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.75 + t * 1.27 + ph) + sin(p.y * 3.33 - t * 1.47 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 3.73 * p.y + time * 0.80); p.y += 0.30 / wf * cos(wf * 3.33 * p.x + time * 0.93); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p *= 3.29;
	p = rot2(time * 0.84) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.85 + time * 0.16, vec3(0.49, 0.57, 0.51), vec3(0.33, 0.34, 0.50), vec3(0.75, 1.19, 0.77), vec3(0.03, 0.68, 0.51));
	col = clamp((col - 0.5) * 1.81 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
