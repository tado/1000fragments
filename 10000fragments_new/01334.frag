uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.42 + t * 1.50 + ph) + sin(p.y * 7.57 - t * 1.50 + ph)
        + sin((p.x + p.y) * 3.93 + t * 1.50 + ph) + sin(length(p) * 14.77 - t * 1.50 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.56;
	p = rot2(p.y * -3.92 + time * 0.31) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.03), field(p, time, 2.06));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
