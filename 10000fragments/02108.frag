uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.72 + sr * 21.61 - t * 4.42 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.41 / wf * sin(wf * 2.17 * p.y + time * 1.59); p.y += 0.40 / wf * cos(wf * 2.20 * p.x + time * 1.48); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.29, 0.05, 0.15), vec3(0.76, 0.56, 0.77), d);
	col = mod(col * 1.98, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
