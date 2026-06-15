uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.39 + t * 3.44 + ph) + sin(p.y * 11.59 - t * 3.44 + ph)
        + sin((p.x + p.y) * 9.11 + t * 3.44 + ph) + sin(length(p) * 9.00 - t * 3.44 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = abs(p);
	p = rot2(p.y * 2.48 + time * 0.97) * p;
	p += vec2(0.64, -0.63) * sin(length(p) * 2.89 - time * 1.70) * 0.16;
	p = fract(p * 1.76) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.98 + time * 0.04);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.72));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
