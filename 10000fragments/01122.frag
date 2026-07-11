uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.34 + t * 2.76 + ph) + sin(p.y * 5.99 - t * 2.76 + ph)
        + sin((p.x + p.y) * 5.42 + t * 2.76 + ph) + sin(length(p) * 4.90 - t * 2.76 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.43;
	p = rot2(p.y * -2.85 + time * 0.93) * p;
	p *= 3.45;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.71 + time * 0.29);
	col = fract(col * 1.75);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
