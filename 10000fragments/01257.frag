uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.44 + t * 2.20 + ph) + sin(p.y * 12.58 - t * 2.20 + ph)
        + sin((p.x + p.y) * 9.91 + t * 2.20 + ph) + sin(length(p) * 17.65 - t * 2.20 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.32;
	p = abs(p);
	{ float fr = length(p); p *= 1.0 + -0.21 * fr * fr; }
	p = rot2(time * 0.88) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.09, 0.45, 0.31), vec3(0.94, 0.75, 0.97), d);
	col = clamp((col - 0.5) * 1.49 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
