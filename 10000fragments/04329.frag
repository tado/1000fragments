uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.43, 0.0)) * 10.73 - t * 5.25 + ph);
    float mb = sin(length(p + vec2(0.43, 0.0)) * 26.21 - t * 5.25 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.28;
	p = rot2(p.y * -1.80 + time * 0.22) * p;
	p = rot2(2.53) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.71), field(p, time, 1.43));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.55));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
