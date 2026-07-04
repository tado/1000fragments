uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.16 + 0.20 * sin(t * 1.55)) + vec2(-0.69, 0.29) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 19; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 19.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.16;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 3.68 * p.y + time * 2.15); p.y += 0.46 / wf * cos(wf * 3.36 * p.x + time * 1.94); }
	p = rot2(length(p) * -3.04 + time * 0.95) * p;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.60;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.67), field(p, time, 1.33));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
