uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.53 + t * 0.86 + ph) + sin(p.y * 10.25 - t * 0.86 + ph)
        + sin((p.x + p.y) * 6.74 + t * 0.86 + ph) + sin(length(p) * 3.04 - t * 0.86 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.15;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.14, lr * 1.42 + time * -0.50); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.19; p = rot2(0.42) * p; }
	p = rot2(length(p) * 1.42 + time * 0.65) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.34, 1.50, 1.39) + vec3(0.07, 0.12, 0.24);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.73));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
