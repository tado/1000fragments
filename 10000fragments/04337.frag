uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.48, 0.0)) * 16.39 - t * 1.82 + ph);
    float mb = sin(length(p + vec2(0.48, 0.0)) * 15.54 - t * 1.82 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.73;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.29 / wf * sin(wf * 2.79 * p.y + time * 2.00); p.y += 0.45 / wf * cos(wf * 2.89 * p.x + time * 1.29); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.43; p = rot2(2.05) * p; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ p = vec2(atan(p.y, p.x) * 1.85, length(p) * 5.89 - time * 0.71); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.11), field(p, time, 2.22));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.66));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
