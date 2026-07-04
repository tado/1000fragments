uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 2.27 - t * 0.84;
    v = sin(floor(lv * 5.8) / 5.8 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(3.05) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.88), field(p, time, 1.77));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.31));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
