uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.33, 0.0)) * 29.09 - t * 7.10 + ph);
    float mb = sin(length(p + vec2(0.33, 0.0)) * 30.70 - t * 7.10 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.20;
	p = rot2(time * 0.36) * p;
	{ p = vec2(atan(p.y, p.x) * 2.95, length(p) * 5.56 - time * 0.12); }
	p = rot2(2.46) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.96), field(p, time, 1.93));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
