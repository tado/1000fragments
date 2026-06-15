uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.25, 0.0)) * 18.39 - t * 3.28 + ph);
    float mb = sin(length(p + vec2(0.25, 0.0)) * 38.23 - t * 3.28 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 2.76, length(p) * 3.64 - time * 0.42); }
	p = rot2(length(p) * -1.29 + time * 0.83) * p;
	p += vec2(0.70, 0.27) * sin(length(p) * 5.85 - time * 0.90) * 0.39;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.20), field(p, time, 2.41));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.85);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
