uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.24 + t * 4.97 + ph) + sin(p.y * 9.74 - t * 4.97 + ph)
        + sin((p.x + p.y) * 11.66 + t * 4.97 + ph) + sin(length(p) * 17.83 - t * 4.97 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 1.42, length(p) * 2.82 - time * 0.38); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.54; p = rot2(1.31) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.99), field(p, time, 1.97));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 2.20 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
