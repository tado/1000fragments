uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.77 + sin(p.y * 5.98 + t * 3.19) * 2.45 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.48;
	p += vec2(0.29, -0.44) * sin(length(p) * 4.06 - time * 1.76) * 0.28;
	p = rot2(1.78) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.53), field(p, time, 1.07));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.73);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
