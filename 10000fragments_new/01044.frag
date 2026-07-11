uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 12.30 + t * 1.07 + ph) * 0.7;
    float wb = sin(p.y * 6.99 - t * 3.78 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.76;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.22;
	{ p = vec2(atan(p.y, p.x) * 1.87, length(p) * 4.99 - time * 0.67); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.49 / wf * sin(wf * 3.03 * p.y + time * 1.27); p.y += 0.24 / wf * cos(wf * 2.45 * p.x + time * 1.38); }
	p = rot2(length(p) * 2.77 + time * 1.08) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.95, 0.56, 0.48) * (0.06 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.74 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
