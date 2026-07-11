uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.18 + t * 0.87 + ph) + sin(p.y * 8.02 - t * 0.87 + ph)
        + sin((p.x + p.y) * 7.55 + t * 0.87 + ph) + sin(length(p) * 3.26 - t * 0.87 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 1.75) - 0.5;
	p = rot2(time * 1.00) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.91 + time * 0.02);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
