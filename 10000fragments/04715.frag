uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.44, 0.0)) * 16.96 - t * 4.64 + ph);
    float mb = sin(length(p + vec2(0.44, 0.0)) * 24.62 - t * 4.64 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.38;
	p *= 2.02;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 3.05 * p.y + time * 1.37); p.y += 0.50 / wf * cos(wf * 1.87 * p.x + time * 0.99); }
	{ float fr = length(p); p *= 1.0 + -0.76 * fr * fr; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.94 + time * 0.00);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
