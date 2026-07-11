uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 13.21 - t * 7.17 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.05;
	p *= 2.96;
	p = fract(p * 1.65) - 0.5;
	p = rot2(p.y * 3.27 + time * 0.96) * p;
	p += vec2(-0.22, 0.95) * sin(length(p) * 4.54 - time * 1.93) * 0.29;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.70), field(p, time, 1.41));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.23 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
