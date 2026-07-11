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
    v = sin(sa * 2.58 + sr * 18.00 - t * 1.59 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.68;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 2.62 * p.y + time * 1.62); p.y += 0.26 / wf * cos(wf * 2.38 * p.x + time * 1.42); }
	p = rot2(2.43) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.74 + time * 0.07, vec3(0.56, 0.51, 0.49), vec3(0.37, 0.40, 0.45), vec3(1.06, 0.92, 1.24), vec3(0.14, 0.85, 0.45));
	col = mod(col * 2.63, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
