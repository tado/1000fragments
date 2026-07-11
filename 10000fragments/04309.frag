uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.35, 0.0)) * 27.01 - t * 2.75 + ph);
    float mb = sin(length(p + vec2(0.35, 0.0)) * 9.84 - t * 2.75 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.35;
	p = fract(p * 2.77) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 1.62, length(p) * 5.94 - time * 0.51); }
	p = rot2(time * -0.44) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.23), field(p, time, 2.46));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
