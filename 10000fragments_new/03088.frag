uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.98 + t * 2.70 + ph) + sin(p.y * 10.43 - t * 3.67 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(1.35) * p;
	p *= 2.63;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.36), field(p, time, 2.73));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.63, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
