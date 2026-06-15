uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.38 + 0.21 * cos(sa * 8 + t * 2.95 + ph);
    v = sin((sr - petal) * 14.74);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 3.13;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.22 / wf * sin(wf * 3.33 * p.y + time * 1.02); p.y += 0.32 / wf * cos(wf * 2.57 * p.x + time * 1.07); }
	p = fract(p * 2.28) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.64 + time * 0.01);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
