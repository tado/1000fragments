uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 17.00 - t * 2.44 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(1.72) * p;
	p = rot2(time * -0.71) * p;
	p *= 2.11;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.95), field(p, time, 1.89));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.58);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
