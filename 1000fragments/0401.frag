uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.09 + t * 1.01 + ph) + sin(p.y * 3.51 - t * 1.92 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.42;
	p = rot2(time * -0.43) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.22 / wf * sin(wf * 3.08 * p.y + time * 1.23); p.y += 0.37 / wf * cos(wf * 2.77 * p.x + time * 0.97); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.59 + time * 0.26, vec3(0.58, 0.43, 0.45), vec3(0.43, 0.41, 0.46), vec3(0.80, 0.82, 1.36), vec3(0.23, 0.56, 0.49));
	col = fract(col * 1.41);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
