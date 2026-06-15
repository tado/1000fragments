uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.74 + t * 2.14 + ph) + sin(p.y * 10.47 - t * 2.14 + ph)
        + sin((p.x + p.y) * 5.64 + t * 2.14 + ph) + sin(length(p) * 17.72 - t * 2.14 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.16;
	{ float fr = length(p); p *= 1.0 + 0.46 * fr * fr; }
	p = rot2(p.y * -3.47 + time * 0.21) * p;
	p = rot2(2.92) * p;
	p += vec2(0.32, 1.00) * sin(length(p) * 3.68 - time * 0.93) * 0.36;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.29), field(p, time, 2.58));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
