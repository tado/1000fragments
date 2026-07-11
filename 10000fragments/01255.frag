uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.12 + t * 1.85 + ph) + sin(p.y * 7.36 - t * 1.85 + ph)
        + sin((p.x + p.y) * 8.16 + t * 1.85 + ph) + sin(length(p) * 14.34 - t * 1.85 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.35;
	p = rot2(1.04) * p;
	p += vec2(0.79, -0.29) * sin(length(p) * 5.51 - time * 1.04) * 0.39;
	p = rot2(length(p) * -3.55 + time * 0.53) * p;
	p = fract(p * 2.80) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.69 + time * 0.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
