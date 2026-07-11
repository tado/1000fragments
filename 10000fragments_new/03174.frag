uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.93 + t * 4.92 + ph) + sin(p.y * 4.06 - t * 4.92 + ph)
        + sin((p.x + p.y) * 3.68 + t * 4.92 + ph) + sin(length(p) * 3.88 - t * 4.92 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.69;
	p = rot2(p.y * -2.08 + time * 1.13) * p;
	{ float fr = length(p); p *= 1.0 + 0.53 * fr * fr; }
	p = rot2(time * 0.79) * p;
	p *= 3.01;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.30, 0.52, 0.26) * (0.11 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
