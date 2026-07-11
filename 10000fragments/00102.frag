uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.15 + t * 0.93 + ph) + sin(p.y * 9.56 - t * 2.34 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.70;
	p += vec2(0.28, 0.82) * sin(length(p) * 4.69 - time * 2.00) * 0.16;
	p = fract(p * 2.82) - 0.5;
	p = rot2(p.y * -2.70 + time * 0.79) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.14), field(p, time, 2.27));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
