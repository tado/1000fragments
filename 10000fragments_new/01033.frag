uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.38 + t * 2.98 + ph) + sin(p.y * 13.24 - t * 2.98 + ph)
        + sin((p.x + p.y) * 5.40 + t * 2.98 + ph) + sin(length(p) * 4.76 - t * 2.98 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * -0.71) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.16 + time * 0.00);
	col = fract(col * 2.47);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
