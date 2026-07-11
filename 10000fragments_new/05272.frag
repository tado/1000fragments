uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.29 + t * 3.01 + ph) + sin(p.y * 4.13 - t * 3.01 + ph)
        + sin((p.x + p.y) * 4.98 + t * 3.01 + ph) + sin(length(p) * 13.40 - t * 3.01 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.85;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.56; p = rot2(1.99) * p; }
	p.y += sin(p.x * 6.77 + time * 2.46) * 0.23;
	p += vec2(0.73, 0.77) * sin(length(p) * 3.72 - time * 1.76) * 0.17;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.42, 0.63, 0.62) * (0.05 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.67 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
