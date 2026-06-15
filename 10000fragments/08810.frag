uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.33 + 0.29 * cos(sa * 8 + t * 1.54 + ph);
    v = sin((sr - petal) * 10.06);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(p.y * 2.10 + time * 0.52) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.20 / wf * sin(wf * 1.81 * p.y + time * 1.95); p.y += 0.25 / wf * cos(wf * 2.12 * p.x + time * 0.80); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.46; p = rot2(2.45) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.77 + time * 0.07, vec3(0.54, 0.56, 0.52), vec3(0.43, 0.39, 0.39), vec3(0.97, 1.05, 1.15), vec3(0.50, 0.06, 0.45));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
