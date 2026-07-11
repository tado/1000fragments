uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 21.12);
    float gsh = hash21(vec2(grow, floor(t * 2.11))) - 0.5;
    float gx = p.x + gsh * 0.56;
    v = sin(gx * 12.71 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.68));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.26;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.36; p = rot2(2.01) * p; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 2.04 * p.y + time * 0.65); p.y += 0.43 / wf * cos(wf * 1.78 * p.x + time * 0.83); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.69), field(p, time, 1.38));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
