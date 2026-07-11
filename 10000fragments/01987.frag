uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.70 + sr * 15.54 - t * 4.23 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.52;
	p += vec2(0.85, -0.22) * sin(length(p) * 3.65 - time * 0.82) * 0.12;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 3.08 * p.y + time * 0.81); p.y += 0.25 / wf * cos(wf * 2.11 * p.x + time * 1.87); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.85 + time * 0.06, vec3(0.59, 0.44, 0.49), vec3(0.44, 0.38, 0.36), vec3(1.29, 0.84, 0.93), vec3(0.55, 0.41, 0.31));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
