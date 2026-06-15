uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.54) - 0.5;
    float rad = 0.37 + 0.12 * sin(t * 1.17 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.99;
	p *= 1.60;
	p += vec2(-0.28, 0.73) * sin(length(p) * 2.87 - time * 1.77) * 0.25;
	p = rot2(0.49) * p;
	p = abs(p) - 0.38;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.62), field(p, time, 1.25));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
