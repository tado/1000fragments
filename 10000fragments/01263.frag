uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.13 + t * 1.21 + ph) + sin(p.y * 5.78 - t * 1.21 + ph)
        + sin((p.x + p.y) * 6.88 + t * 1.21 + ph) + sin(length(p) * 11.77 - t * 1.21 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.79;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.43; p = rot2(2.35) * p; }
	p = abs(p);
	p += vec2(0.86, 0.85) * sin(length(p) * 5.12 - time * 1.06) * 0.25;
	p = rot2(time * 0.47) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.54 + time * 0.20);
	col = fract(col * 1.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
