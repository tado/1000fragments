uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.28 + t * 1.77 + ph) + sin(p.y * 10.09 - t * 1.77 + ph)
        + sin((p.x + p.y) * 10.17 + t * 1.77 + ph) + sin(length(p) * 4.11 - t * 1.77 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.32;
	p = rot2(p.y * 3.76 + time * 0.37) * p;
	p = fract(p * 1.36) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.61), field(p, time, 1.23));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.97));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
