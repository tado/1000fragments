uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.50, 0.0)) * 19.52 - t * 2.74 + ph);
    float mb = sin(length(p + vec2(0.50, 0.0)) * 36.25 - t * 2.74 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(2.23) * p;
	p = fract(p * 1.22) - 0.5;
	p += vec2(0.93, 0.77) * sin(length(p) * 5.26 - time * 1.82) * 0.37;
	{ float fr = length(p); p *= 1.0 + 0.24 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.81), field(p, time, 1.61));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
