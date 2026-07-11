uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.78;
    v = 0.5 * (sin(4.0 * cp.x + t * 2.35) * sin(2.0 * cp.y + ph)
             + sin(2.0 * cp.x - t * 1.53) * sin(4.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = sin(p * 1.75 + time * 1.53) * 1.12;
	p = rot2(time * 0.98) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.42), field(p, time, 0.84));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.43);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
