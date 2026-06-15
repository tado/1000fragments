uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.86 + sin(p.y * 5.68 + t * 3.44) * 3.57 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.02;
	p = abs(p) - 0.75;
	p = fract(p * 1.39) - 0.5;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 2.57 * p.y + time * 1.53); p.y += 0.21 / wf * cos(wf * 1.99 * p.x + time * 0.65); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.03 + time * 0.26, vec3(0.47, 0.55, 0.49), vec3(0.44, 0.41, 0.44), vec3(0.85, 0.89, 0.94), vec3(0.61, 0.83, 0.53));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.89));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
