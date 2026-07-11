uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.34, 0.0)) * 15.77 - t * 4.81 + ph);
    float mb = sin(length(p + vec2(0.34, 0.0)) * 28.04 - t * 4.81 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.48;
	p += vec2(0.24, 0.90) * sin(length(p) * 2.83 - time * 1.36) * 0.15;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 2.44 * p.y + time * 1.16); p.y += 0.31 / wf * cos(wf * 2.96 * p.x + time * 0.61); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.75 + time * 0.26);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.06));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
