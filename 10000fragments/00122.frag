uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.23, 0.0)) * 21.36 - t * 6.66 + ph);
    float mb = sin(length(p + vec2(0.23, 0.0)) * 9.13 - t * 6.66 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.15;
	p = rot2(2.49) * p;
	p += vec2(0.40, 0.23) * sin(length(p) * 4.08 - time * 1.29) * 0.30;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.34), field(p, time, 0.67));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
