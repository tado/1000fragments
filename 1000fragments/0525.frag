uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 11.65 + sin(p.y * 3.92 + t * 4.27) * 4.20 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(0.97) * p;
	p += vec2(0.64, -0.77) * sin(length(p) * 2.96 - time * 1.02) * 0.27;
	p *= 1.30;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.74), field(p, time, 1.48));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
