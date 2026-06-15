uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.04 + t * 4.90 + ph) + sin(p.y * 7.12 - t * 4.90 + ph)
        + sin((p.x + p.y) * 5.81 + t * 4.90 + ph) + sin(length(p) * 8.11 - t * 4.90 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.42;
	p = rot2(0.82) * p;
	p = abs(p);
	{ float fr = length(p); p *= 1.0 + 0.58 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.27), field(p, time, 0.55));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.95, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
