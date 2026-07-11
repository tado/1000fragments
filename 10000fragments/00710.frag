uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 23.73 + sin(p.y * 1.05 + t * 0.69) * 3.76 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.98;
	p = rot2(length(p) * -1.50 + time * 0.46) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.86), field(p, time, 1.72));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.31);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
