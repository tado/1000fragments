uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 13.45 - t * 6.05 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.71;
	p = rot2(length(p) * -2.88 + time * 0.49) * p;
	p += vec2(0.42, 0.58) * sin(length(p) * 4.36 - time * 1.51) * 0.33;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.29), field(p, time, 0.58));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
