uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.58 + t * 5.09 + ph) + sin(p.y * 14.43 - t * 1.28 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.64;
	p = rot2(length(p) * 1.59 + time * 0.44) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = abs(p) - 0.41;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.49 / wf * sin(wf * 3.99 * p.y + time * 0.74); p.y += 0.29 / wf * cos(wf * 3.41 * p.x + time * 1.18); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.80), field(p, time, 1.60));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
