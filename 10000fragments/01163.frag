uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.55 + t * 3.56 + ph) + sin(p.y * 10.43 - t * 3.56 + ph)
        + sin((p.x + p.y) * 11.23 + t * 3.56 + ph) + sin(length(p) * 11.47 - t * 3.56 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.35;
	p = rot2(0.65) * p;
	p += vec2(-0.11, 0.92) * sin(length(p) * 2.86 - time * 1.92) * 0.13;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.20), field(p, time, 2.40));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.33 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
