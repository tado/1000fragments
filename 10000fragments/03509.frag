uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.33, 0.0)) * 10.23 - t * 3.22 + ph);
    float mb = sin(length(p + vec2(0.33, 0.0)) * 18.06 - t * 3.22 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.63;
	p = rot2(length(p) * -3.48 + time * 1.08) * p;
	p *= 2.31;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.09), field(p, time, 2.19));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.63);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
