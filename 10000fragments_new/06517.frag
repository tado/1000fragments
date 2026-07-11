uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.55 + t * 1.78 + ph) + sin(p.y * 5.84 - t * 1.78 + ph)
        + sin((p.x + p.y) * 7.99 + t * 1.78 + ph) + sin(length(p) * 14.26 - t * 1.78 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.26;
	p = rot2(p.y * -2.01 + time * 0.21) * p;
	p.y += sin(p.x * 6.62 + time * 1.23) * 0.32;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.17; p = rot2(2.36) * p; }
	p *= 2.89;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.70, 0.23, 0.39) * (0.12 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col = fract(col * 1.75);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
