uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 25.66 + sin(p.y * 3.44 + t * 0.94) * 4.57 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(-0.27, -0.71) * sin(length(p) * 5.08 - time * 1.93) * 0.30;
	p = rot2(length(p) * -1.77 + time * 0.73) * p;
	p = abs(p);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.65), field(p, time, 1.31));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.27, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
