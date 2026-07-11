uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.46, 0.0)) * 17.21 - t * 3.06 + ph);
    float mb = sin(length(p + vec2(0.46, 0.0)) * 11.27 - t * 3.06 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.90;
	p = rot2(length(p) * 1.05 + time * 0.80) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.69), field(p, time, 1.38));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
