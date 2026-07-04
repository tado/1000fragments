uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.53, 0.0)) * 14.37 - t * 7.78 + ph);
    float mb = sin(length(p + vec2(0.53, 0.0)) * 19.24 - t * 5.76 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = abs(p);
	p = (floor(p * 7.1) + 0.5) / 7.1;
	p = rot2(2.42) * p;
	p = fract(p * 1.25) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.28), field(p, time, 2.55));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
