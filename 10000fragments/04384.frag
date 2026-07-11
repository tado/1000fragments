uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.51, 0.0)) * 8.89 - t * 6.45 + ph);
    float mb = sin(length(p + vec2(0.51, 0.0)) * 33.80 - t * 6.45 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.61;
	p += vec2(0.01, 0.74) * sin(length(p) * 5.53 - time * 1.27) * 0.14;
	p = rot2(1.61) * p;
	{ float fr = length(p); p *= 1.0 + -0.71 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.33), field(p, time, 0.65));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.85));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
