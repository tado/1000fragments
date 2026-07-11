uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.34) - 0.5;
    float rad = 0.30 + 0.12 * sin(t * 0.89 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.32;
	{ float fr = length(p); p *= 1.0 + 0.65 * fr * fr; }
	p *= 2.79;
	p = abs(p);
	p = rot2(p.y * -2.26 + time * 0.46) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.38), field(p, time, 0.77));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.76);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
