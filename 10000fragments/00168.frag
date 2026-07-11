uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.04 + t * 3.85 + ph) + sin(p.y * 15.79 - t * 3.59 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.54;
	p = rot2(0.85) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.19), field(p, time, 2.39));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.84, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
