uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.90) - 0.5;
    float rad = 0.38 + 0.12 * sin(t * 3.39 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.16;
	p = rot2(length(p) * -2.50 + time * 0.53) * p;
	p *= 1.26;
	p = abs(p) - 0.45;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.20), field(p, time, 0.41));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
