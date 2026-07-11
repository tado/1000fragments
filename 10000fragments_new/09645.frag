uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.67) - 0.5;
    float rad = 0.45 + 0.12 * sin(t * 1.87 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.55;
	p = fract(p * 2.81) - 0.5;
	p *= 1.87;
	p = rot2(length(p) * -1.84 + time * 0.59) * p;
	p = abs(p) - 0.58;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.58), field(p, time, 1.17));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
