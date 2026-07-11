uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 17.29 - t * 8.58 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 1.97) - 0.5;
	p = rot2(1.23) * p;
	p = rot2(p.y * 1.32 + time * 0.29) * p;
	p = rot2(length(p) * 1.90 + time * 1.06) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.38), field(p, time, 2.76));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.26, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
