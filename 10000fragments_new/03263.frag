uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 8.98 + t * 2.10 + ph) + sin(p.y * 3.90 - t * 2.10 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.71;
	p = rot2(p.y * -3.67 + time * 0.91) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 2.10 * p.y + time * 1.24); p.y += 0.30 / wf * cos(wf * 2.82 * p.x + time * 1.02); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.07 + time * 0.24, vec3(0.50, 0.50, 0.58), vec3(0.35, 0.44, 0.48), vec3(0.81, 0.99, 0.86), vec3(0.95, 0.30, 0.46));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
