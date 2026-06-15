uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.64) - 0.5;
    float rad = 0.36 + 0.12 * sin(t * 0.75 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.86;
	{ float fr = length(p); p *= 1.0 + 0.36 * fr * fr; }
	p = rot2(1.20) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.19), field(p, time, 2.39));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.91 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
