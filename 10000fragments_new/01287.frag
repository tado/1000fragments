uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 12.47 - t * 1.78 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(1.77) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.90), field(p, time, 1.80));
	col = 0.5 + 0.5 * col;
	col *= 0.86 + 0.18 * sin(gl_FragCoord.y * 1.05 + time * 15.37);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
