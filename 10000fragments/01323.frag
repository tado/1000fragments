uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.20 + t * 0.60 + ph) + sin(p.y * 12.93 - t * 0.60 + ph)
        + sin((p.x + p.y) * 6.49 + t * 0.60 + ph) + sin(length(p) * 5.83 - t * 0.60 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(0.05, 0.99) * sin(length(p) * 2.07 - time * 1.54) * 0.31;
	p = rot2(p.y * -3.95 + time * 0.48) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.39 / wf * sin(wf * 1.62 * p.y + time * 1.44); p.y += 0.37 / wf * cos(wf * 2.52 * p.x + time * 0.88); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.20, 0.23, 0.04), vec3(0.97, 0.81, 0.58), d);
	col = clamp((col - 0.5) * 1.66 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
