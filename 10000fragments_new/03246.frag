uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 7.35 + sin(p.y * 2.65 + t * 1.87) * 3.94 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.97;
	p = rot2(time * -0.59) * p;
	p = (floor(p * 11.0) + 0.5) / 11.0;
	{ float fr = length(p); p *= 1.0 + 0.63 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.95), field(p, time, 1.89));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
