uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.13) - 0.5;
    float rad = 0.40 + 0.12 * sin(t * 2.98 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.18;
	p += vec2(-0.39, -0.32) * sin(length(p) * 3.97 - time * 1.77) * 0.32;
	p = rot2(p.y * 2.50 + time * 0.53) * p;
	p = rot2(time * -0.78) * p;
	{ p = vec2(atan(p.y, p.x) * 2.67, length(p) * 5.78 - time * 0.20); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.05), field(p, time, 2.10));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.40);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
