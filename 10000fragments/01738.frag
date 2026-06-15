uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.92 + t * 3.10 + ph) + sin(p.y * 8.79 - t * 2.35 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.63;
	p = fract(p * 2.00) - 0.5;
	p = rot2(p.y * 2.71 + time * 0.11) * p;
	{ float fr = length(p); p *= 1.0 + 0.65 * fr * fr; }
	p = rot2(1.07) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.63, 1.17, 1.51) + vec3(0.14, 0.06, 0.12);
	col = fract(col * 1.15);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
