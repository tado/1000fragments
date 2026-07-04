uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 7.29 + ga * 2.0 - t * 1.26 + ph);
    v = arm * exp(-gr * 1.08);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.14;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 3.96 * p.y + time * 1.24); p.y += 0.32 / wf * cos(wf * 2.24 * p.x + time * 1.25); }
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.42; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float fr = length(p); p *= 1.0 + 0.21 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.87 + time * 0.10, vec3(0.49, 0.41, 0.45), vec3(0.41, 0.50, 0.40), vec3(1.12, 1.25, 0.75), vec3(0.94, 0.26, 0.72));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
