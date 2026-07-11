uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.46, 0.0)) * 34.21 - t * 4.55 + ph);
    float mb = sin(length(p + vec2(0.46, 0.0)) * 10.92 - t * 4.55 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 1.99 * p.y + time * 1.22); p.y += 0.37 / wf * cos(wf * 3.91 * p.x + time * 0.62); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.67 + time * 0.17);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.75));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
