uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.82 + t * 3.15 + ph) + sin(p.y * 15.19 - t * 0.89 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.22;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.20 / wf * sin(wf * 3.72 * p.y + time * 1.29); p.y += 0.39 / wf * cos(wf * 3.53 * p.x + time * 1.45); }
	p = rot2(length(p) * 1.58 + time * 0.86) * p;
	p += vec2(-0.25, -0.39) * sin(length(p) * 3.74 - time * 1.71) * 0.20;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.26, 0.30, 0.48), vec3(0.71, 0.54, 0.91), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
