uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.40 + t * 4.75 + ph) + sin(p.y * 6.89 - t * 4.75 + ph)
        + sin((p.x + p.y) * 7.66 + t * 4.75 + ph) + sin(length(p) * 16.68 - t * 4.75 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.23;
	p = rot2(length(p) * -2.35 + time * 0.27) * p;
	p = rot2(0.86) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.23), field(p, time, 0.47));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.57, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
