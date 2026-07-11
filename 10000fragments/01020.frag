uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.25 + t * 1.25 + ph) + sin(p.y * 3.55 - t * 1.25 + ph)
        + sin((p.x + p.y) * 2.00 + t * 1.25 + ph) + sin(length(p) * 15.31 - t * 1.25 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.61;
	p = abs(p);
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.20; p = rot2(1.23) * p; }
	{ float fr = length(p); p *= 1.0 + 0.28 * fr * fr; }
	p = fract(p * 1.70) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.29), field(p, time, 2.59));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.74 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
