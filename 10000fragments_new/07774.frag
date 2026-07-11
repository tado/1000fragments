uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.17 + t * 5.98 + ph) + sin(p.y * 4.28 - t * 4.13 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 1.21) - 0.5;
	p = rot2(p.y * -2.13 + time * 0.67) * p;
	p += vec2(0.88, -0.70) * sin(length(p) * 3.19 - time * 1.53) * 0.20;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.00 + time * 0.01);
	col *= 0.83 + 0.11 * sin(gl_FragCoord.y * 2.30 + time * 10.70);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
